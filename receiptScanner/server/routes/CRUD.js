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
						reject('There was an error saving a receipt: ' + err);
					});
			}
		);
	}).catch((err) => {
		reject('There was an error populating the receipt with user data: ' + err);
	});
};

router.get('/', (req, res) => {
	Receipt.find()
		.populate('user', '_id')
		.then((receipts) => {
			res.status(200).json(receipts);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Internal server error:' + err });
		});
});

router.post('/', (req, res) => {
	createReceipt(req.body, req.user)
		.then((msg) => {
			res.status(201).json({ message: msg });
		})
		.catch((err) => res.status(400).json({ message: err }));
});

router.put('/:id', (req, res) => {
	const id = req.params.id;
	const update = req.body;

	Receipt.findByIdAndUpdate(id, update, { new: true })
		.then((receipt) => {
			if (receipt) {
				res.status(200).json(receipt);
			} else {
				res.status(404).json({ message: 'Receipt not found!' });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Internal server error' + err });
		});
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;

	Receipt.findByIdAndDelete(id)
		.then((receipt) => {
			if (receipt) {
				res.status(200).json({ message: 'Receipt deleted!' });
			} else {
				res.status(404).json({ message: 'Receipt not found!' });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Internal server error' + err });
		});
});

export default router;
