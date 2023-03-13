import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from './models/user';
import { Receipt } from './models/receipt';

/** CONFIGURATION */
dotenv.config();
const mongoDBConnectionString = process.env.MONGO_DB_KEY;

/** MONGO DB CONNECTION */
const connectToDB = () => {
	return new Promise((resolve, reject) => {
		const db = mongoose.createConnection(mongoDBConnectionString, {
			useNeeUrlParser: true,
		});

		db.on('error', (err) => {
			reject(err);
		});

		db.once('open', () => {
			User = db.model('User', User);
			Receipt = db.model('Receipt', Receipt);
			resolve();
		});
	});
};

export default connectToDB;