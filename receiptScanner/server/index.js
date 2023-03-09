require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { Storage } = require('@google-cloud/storage');
const vision = require('@google-cloud/vision');
const maxSize = 4 * 1024 * 1024;

const app = express();

app.use(express.json());
app.use(cors());

// Create a Google Cloud Storage instance
const visionKEY = JSON.parse(process.env.GOOGLE_VISION_AI_KEY);

const client = new vision.ImageAnnotatorClient({
	credentials: visionKEY,
});

const storage = new Storage({
	credentials: visionKEY,
});

// Define the storage destination and filename for uploaded files
const bucket = storage.bucket(process.env.GOOGLE_BUCKET_NAME);

// Define the file filter to accept only JPEG and PNG
const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image/')) {
		cb(null, true);
	} else {
		cb(new Error('Only image files are allowed.'));
	}
};

// Create the multer middleware for handling file uploads
const upload = multer({
	storage: multer.memoryStorage({
		filename: (req, file, cb) => {
			const fileName = Date.now() + '-' + file.originalname;
			cb(null, fileName);
		},
	}),
	fileFilter,
	limits: { fileSize: maxSize },
});

// Use the multer middleware to handle file uploads
app.post('/api/receipt', upload.single('receipt'), async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: 'No receipt file uploaded' });
		}

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
			res.json(result.fullTextAnnotation.text);
		});
		stream.end(receiptFile.buffer);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'An error occurred' });
	}
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
