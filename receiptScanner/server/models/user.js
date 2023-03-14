import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const userSchema = new Schema({
	userName: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	firstName: String,
	lastName: String,
	receipts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Receipt',
		},
	],
});
