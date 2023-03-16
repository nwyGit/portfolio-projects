import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const receiptSchema = new Schema({
	merchant: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		enum: [
			'Food and Dining',
			'Transportation',
			'Housing and Utilities',
			'Entertainment and Leisure',
			'Shopping',
			'Health and Wellness',
			'Personal Care and Beauty',
			'Travel and Vacation',
			'Education and Learning',
			'Technology and Electronics',
			'Gifts and Donations',
			'Home and Garden',
			'Finances and Fees',
			'Other',
		],
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
		enum: ['Cash', 'Credit Card', 'Debit Card', 'Check', 'Other'],
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
	imageURL: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});
