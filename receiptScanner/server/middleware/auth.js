import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../utils/db.js';

dotenv.config();

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
	secretOrKey: process.env.JWT_SECRET,
};

const strategy = new Strategy(jwtOptions, async (jwt_payload, next) => {
	try {
		const user = await User.findById(jwt_payload._id);
		if (user) {
			const sanitizedUser = {
				_id: user._id,
				userName: user.username,
				email: user.email,
			};
			return next(null, sanitizedUser);
		} else {
			return next(null, false);
		}
	} catch (err) {
		return next(err, false);
	}
});

passport.use(strategy);

const authenticate = (req, res, next) => {
	passport.authenticate('jwt', { session: false }, (err, user) => {
		if (err || !user) {
			res.status(401).json({ message: 'Unauthorized' });
		} else {
			req.user = user;
			next();
		}
	})(req, res, next);
};

const generateToken = (user) => {
	const payload = { _id: user._id, username: user.username, email: user.email };
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export { passport, authenticate, generateToken };
