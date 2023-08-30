import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { passport, authenticate } from './middleware/auth.js';
import { connectToDB } from './utils/db.js';
import receiptScannerRoute from './routes/receipt-scanner.js';
import userServiceRoute from './routes/user-service.js';
import receiptCRUDRoute from './routes/CRUD.js';

/** CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(passport.initialize());

/** ROUTES */
app.use('/api/users', userServiceRoute);
app.use('/api/receipt-scanner', authenticate, receiptScannerRoute);
app.use('/api/receipts', authenticate, receiptCRUDRoute);

/** SERVER SETUP */
const PORT = process.env.PORT || 3000;
connectToDB()
	.then(() => {
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	})
	.catch((err) => {
		console.log('unable to start the server: ' + err);
		process.exit();
	});
