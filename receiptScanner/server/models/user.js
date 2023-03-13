import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
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

export const User = mongoose.model('User', userSchema);
