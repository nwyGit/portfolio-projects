import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { userSchema } from '../models/user.js';
import { receiptSchema } from '../models/receipt.js';

/** CONFIGURATION */
dotenv.config();
const mongoDBConnectionString = process.env.MONGO_DB_STRING;

/** MONGO DB CONFIGURATION */
let User, Receipt;
const connectToDB = () => {
	return new Promise((resolve, reject) => {
		let db = mongoose.createConnection(mongoDBConnectionString, {
			useNewUrlParser: true,
		});

		db.on('error', (err) => {
			reject(err);
		});

		db.once('open', () => {
			User = db.model('User', userSchema);
			Receipt = db.model('Receipt', receiptSchema);
			resolve();
		});
	});
};

export { User, Receipt, connectToDB };
