import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import vision from '@google-cloud/vision';
import { Storage } from '@google-cloud/storage';
import { Configuration, OpenAIApi } from 'openai';
import { header, format, inform } from './prompt.js';

/** CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30md', extended: true }));
app.use(cors());

/** OPEN AI CONFIGURATION */
const configuration = new Configuration({
	apiKey: process.env.OPEN_AI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

/** GOOGLE VISION API & STORAGE CONFIGURATION */
const visionKEY = JSON.parse(process.env.GOOGLE_VISION_AI_KEY);
const client = new vision.ImageAnnotatorClient({
	credentials: visionKEY,
});
const storage = new Storage({
	credentials: visionKEY,
});
const bucket = storage.bucket(process.env.GOOGLE_BUCKET_NAME);

/** MULTER MIDDLEWARE */
const upload = multer({
	storage: multer.memoryStorage({
		filename: (req, file, cb) => {
			const fileName = Date.now() + '-' + file.originalname;
			cb(null, fileName);
		},
	}),
	fileFilter: (req, file, cb) => {
		if (file.mimetype.startsWith('image/')) {
			cb(null, true);
		} else {
			cb(new Error('Only image files are allowed.'));
		}
	},
	limits: { fileSize: 4 * 1024 * 1024 },
});

/** OCR MIDDLEWARE */
const performOCR = async (req, res, next) => {
	try {
		const receiptFile = req.file;
		// Upload the file to the Google Cloud Storage bucket
		const blob = bucket.file(`${uuidv4()}-${receiptFile.originalname}`);
		const stream = blob.createWriteStream();
		stream.on('error', (err) => {
			throw err;
		});
		stream.on('finish', async () => {
			// Perform OCR on the uploaded file using Google Cloud Vision
			const [result] = await client.textDetection(
				`gs://${bucket.name}/${blob.name}`
			);
			req.body.text = result.fullTextAnnotation.text.split('\n');
			next();
		});
		stream.end(receiptFile.buffer);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'An error occurred from OCR scanning' });
	}
};

/** OPEN AI MIDDLEWARE */
const performGPT = async (req, res, next) => {
	try {
		const { text } = req.body;
		const data = text.map((note) => '  ' + note + ',\n').toString();
		const response = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt: header + '[\n' + data + ']' + format + inform,
			temperature: 0,
			max_tokens: 512,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
		});
		const result = response.data.choices[0].text.slice(
			response.data.choices[0].text.indexOf('{') - 1
		);
		res.status(200).json(result);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'An error occurred from GPT processing' });
	}
};

/** ROUTES */
app.post(
	'/api/receipt',
	upload.single('receipt'),
	performOCR,
	performGPT,
	(req, res) => {
		res.json(req.body.text);
	}
);

/** SERVER SETUP */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
