import styles from '@/styles';
import { Box, Card, CardContent, Typography } from '@mui/material';
import Image from 'next/image';

const features = [
	{
		title: 'Automated Budgeting & Categorization',
		body: 'Expenses are categorized using OCR and NLP, enabling effortless budget creation, insights into spending patterns, and personalized budget recommendations.',
		image: 'feature1',
	},
	{
		title: 'Goal Setting & Progress Tracking',
		body: 'Users set financial goals, and the app tracks progress, providing customized recommendations based on spending habits and financial data analysis.',
		image: 'feature2',
	},
	{
		title: 'Financial Education & Community',
		body: 'The app offers financial education resources and a community forum for users to learn, share experiences, and support each other towards better financial health.',
		image: 'feature3',
	},
];

const Features = () => {
	return (
		<>
			<Box id='features' sx={{ p: '2rem 0' }}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						textAlign: 'center',
						m: '2rem 20%',
					}}
				>
					<Typography variant='h2' component='h2' sx={{ fontWeight: 'bold' }}>
						How we work
					</Typography>
					<Typography variant='h4' component='h4' sx={{ m: '2rem 0 0 0' }}>
						Empowering Users Through Intelligent Tools: Our application combines
						advanced technologies and personalized insights to help users
						achieve their financial objectives efficiently and effectively.
					</Typography>
				</Box>
				<Box
					sx={{
						display: { xs: 'block', sm: 'flex' },
						justifyContent: 'space-around',
						alignItems: 'center',
						m: { xs: '10%', sm: '0 5%', xl: '1%' },
					}}
				>
					{features.map((feature, index) => {
						return (
							<Card
								key={index}
								sx={{
									borderRadius: '2rem',
									marginTop: { xs: '3rem' },
								}}
								className={`${styles.cardSize}`}
							>
								<Image
									src={`/${feature.image}.png`}
									alt={feature.image}
									width={1024}
									height={1024}
								/>
								<CardContent
									sx={{
										minHeight: 210,
										p: '1.5rem',
									}}
								>
									<Typography
										variant='h3'
										component='h3'
										sx={{ fontWeight: 'bold', paddingBottom: '1.5rem' }}
									>
										{feature.title}
									</Typography>
									<Typography component='p'>{feature.body}</Typography>
								</CardContent>
							</Card>
						);
					})}
				</Box>
			</Box>
		</>
	);
};

export default Features;
