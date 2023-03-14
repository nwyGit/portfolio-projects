import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const receiptSchema = new Schema({
	merchant: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
		default: Date.now,
	},
	description: {
		type: String,
		required: true,
	},
	paymentMethod: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	items: {
		type: [String],
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});
