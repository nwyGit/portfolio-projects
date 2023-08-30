import { MongoClient } from 'mongodb';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export default NextAuth({
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/login',
	},
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	callbacks: {
		async signIn({ user, account, profile }) {
			if (account.provider === 'github') {
				const client = await MongoClient.connect(process.env.MONGODB_URI, {
					useUnifiedTopology: true,
				});

				const db = client.db();
				const usersOAuthCollection = db.collection('usersOAuth');

				// Check if user exists
				const existingUser = await usersOAuthCollection.findOne({
					githubId: profile.id,
				});

				if (!existingUser) {
					// Create new user if not exists
					const newUser = {
						githubId: profile.id,
						username: profile.login + profile.id.toString(),
						email: user.email,
						profileUrl: profile.avatar_url,
					};

					await usersOAuthCollection.insertOne(newUser);
				}

				await client.close();
			}

			return true;
		},
		async session({ session, token, user }) {
			session.user.id = token.id;
			session.access_token = token.accessToken;
			return session;
		},
		async jwt({ token, user, account, profile, isNewUser }) {
			if (user) {
				token.id = user.id;
			}
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
	},
});
