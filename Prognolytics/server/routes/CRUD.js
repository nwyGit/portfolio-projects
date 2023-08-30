import express from 'express';
import { User, Receipt } from '../utils/db.js';

const router = express.Router();

const createReceipt = async (data, user) => {
	return new Promise((resolve, reject) => {
		data.user = user._id;
		Receipt.populate(data, { path: 'user', model: User }).then(
			(populatedData) => {
				const newReceipt = new Receipt(populatedData);
				newReceipt
					.save()
					.then((receipt) => {
						resolve('Save successful: Receipt has been added to your records.');
					})
					.catch((err) => {
						console.log(err);
						reject('There was an error saving a receipt: ' + err);
					});
			}
		);
	}).catch((err) => {
		console.log(err);
		reject('There was an error populating the receipt with user data: ' + err);
	});
};

// Get all records
router.get('/', (req, res) => {
	Receipt.find({ user: req.user._id })
		.select('-user -__v')
		.then((receipts) => {
			const formattedReceipts = receipts.map((receipt) => {
				const formattedDate = new Date(receipt.date).toLocaleDateString(
					'en-US',
					{
						year: 'numeric',
						month: 'short',
						day: '2-digit',
					}
				);
				const sanitizedReceipt = { ...receipt.toObject(), date: formattedDate };
				return sanitizedReceipt;
			});
			res.status(200).json(formattedReceipts);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Internal server error:' + err });
		});
});

// Create a record
router.post('/', (req, res) => {
	createReceipt(req.body, req.user)
		.then((msg) => {
			res.status(201).json({ message: msg });
		})
		.catch((err) => {
			res.status(400).json({ message: err });
		});
});

// Update a record
router.put('/:id', (req, res) => {
	const id = req.params.id;
	const update = req.body;

	Receipt.findByIdAndUpdate(id, update, { new: true })
		.then((receipt) => {
			if (receipt) {
				res.status(200).json({
					data: receipt,
					message: 'The changes to your receipt records have been saved.',
				});
			} else {
				res
					.status(404)
					.json({ message: 'Sorry, we cannot find your receipt records.' });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Internal server error' + err });
		});
});

// Delete a record
router.delete('/', (req, res) => {
	const { IDs } = req.body;

	Receipt.deleteMany({ _id: { $in: IDs } })
		.then((result) => {
			if (result.deletedCount > 0) {
				res
					.status(200)
					.json({ message: 'Your receipt records have been removed.' });
			} else {
				res
					.status(404)
					.json({ message: 'Sorry, we cannot find your receipt records.' });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Internal server error' + err });
		});
});

export default router;
