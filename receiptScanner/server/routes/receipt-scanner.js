import dotenv from 'dotenv';
import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import vision from '@google-cloud/vision';
import { Storage } from '@google-cloud/storage';
import { Configuration, OpenAIApi } from 'openai';
import { header, format, inform } from '../models/prompt.js';

/** CONFIGURATION */
dotenv.config();
const router = express.Router();

/** OPEN AI CONFIGURATION */
const configuration = new Configuration({
	apiKey: process.env.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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
			const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
			const [result] = await client.textDetection(
				`gs://${bucket.name}/${blob.name}`
			);
			req.publicUrl = publicUrl;
			req.body.text = result.fullTextAnnotation.text.split('\n');
			next();
		});
		stream.end(receiptFile.buffer);
	} catch (err) {
		console.error(err);
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
		result.imageURL = req.publicUrl;
		req.body = result;
		next();
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'An error occurred from GPT processing' });
	}
};

/** ROUTE */
router.post(
	'/',
	upload.single('receipt'),
	performOCR,
	performGPT,
	(req, res) => {
		res.status(200).json(result);
	}
);

export default router;
