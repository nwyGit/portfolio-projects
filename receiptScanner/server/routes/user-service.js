import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../utils/db.js';
import { generateToken } from '../middleware/auth.js';

const router = express.Router();

const registerUser = (userData) => {
	return new Promise((resolve, reject) => {
		if (userData.password != userData.password2) {
			reject('Passwords do not match!');
		} else {
			bcrypt
				.hash(userData.password, 10)
				.then((hash) => {
					userData.password = hash;
					let newUser = new User(userData);
					newUser
						.save()
						.then(() => {
							resolve('User ' + userData.userName + ' successfully registered!');
						})
						.catch((err) => {
							if (err.code == 11000) {
								reject('User Name already taken!');
							} else {
								reject('There was an error creating the user: ' + err);
							}
						});
				})
				.catch((err) => reject(err));
		}
	});
};

const checkUser = (userData) => {
	return new Promise((resolve, reject) => {
		User.find({ email: userData.email })
			.limit(1)
			.exec()
			.then((users) => {
				if (users.length == 0) {
					reject('Unable to find the user with email ' + userData.email);
				} else {
					bcrypt.compare(userData.password, users[0].password).then((res) => {
						if (res == true) {
							resolve(users[0]);
						} else {
							reject('Incorrect password with email ' + userData.email);
						}
					});
				}
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
};

router.post('/register', (req, res) => {
	registerUser(req.body)
		.then((msg) => {
			res.json({ message: msg });
		})
		.catch((err) => {
			res.status(422).json({ message: err });
		});
});

router.post('/login', (req, res) => {
	checkUser(req.body)
		.then((user) => {
			const token = generateToken(user);
			res.json({
				message: 'Welcome back! You have been logged in.',
				token: token,
			});
		})
		.catch((err) => {
			res.status(422).json({ message: err });
		});
});

export default router;
