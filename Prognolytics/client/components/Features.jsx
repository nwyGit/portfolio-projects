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
			<Box
				id='features'
				sx={{
					display: { xs: 'block', sm: 'flex' },
					justifyContent: 'space-around',
					alignItems: 'center',
					m: { xs: '10%', sm: '3%', xl: '1%' },
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
		</>
	);
};

export default Features;
