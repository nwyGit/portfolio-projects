import styles from '@/styles';
import { tokens } from '@/styles/theme';
import { useTheme } from '@emotion/react';
import { Check } from '@mui/icons-material';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';

const tiers = [
	{
		name: 'Basic Plan',
		features: [
			'Financial goal setting and tracking',
			'Automated budgeting and expense categorization',
			'Access to community forum',
			'Scan up to 10 receipts per month',
		],
		price: 0,
	},
	{
		name: 'Premium Plan',
		features: [
			'All Basic Plan features',
			'Personalized budget recommendations',
			'Financial education resources',
			'Priority access to community forum',
			'Customizable expense categories',
			'Scan up to 50 receipts per month',
		],
		price: 9.99,
	},
	{
		name: 'Pro Plan',
		features: [
			'All Premium Plan features',
			'Advanced financial analytics',
			'Personalized financial coaching',
			'Exclusive access to webinars and expert advice',
			'Multi-device sync and priority support',
			'Custom goal planning and progress reports',
			'Scan up to 100 receipts per month',
		],
		price: 19.99,
	},
];

const Pricing = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<>
			<Box
				id='pricing'
				sx={{
					backgroundColor: colors.primary[300],
					p: '2rem 0',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						textAlign: 'center',
						m: '2rem 20% 4rem 20%',
					}}
				>
					<Typography variant='h2' component='h2' sx={{ fontWeight: 'bold' }}>
						Discover the perfect plan tailored your needs
					</Typography>
				</Box>
				<Box
					sx={{
						display: { xs: 'block', sm: 'flex' },
						position: 'relative',
						justifyContent: 'space-around',
						m: { xs: '10%', sm: '0 10%', xl: '0 15%' },
					}}
				>
					{tiers.map((tier, index) => {
						return (
							<>
								<Card
									key={index}
									variant={index === 1 ? 'outlined' : 'elevation'}
									sx={{
										borderColor: index === 1 ? colors.greenAccent[400] : 'none',
										borderWidth: index === 1 ? 4 : 0,
										borderRadius: '1rem',
									}}
									className={`${styles.cardSize}`}
								>
									{index === 1 && (
										<Box
											sx={{
												display: 'flex',
												position: 'absolute',
												justifyContent: 'center',
												alignItems: 'center',
												backgroundColor: colors.greenAccent[400],
												color: 'white',
												borderRadius: '1rem 1rem 0 0',
												top: '50%',
												left: '50%',
												transform: 'translate(-50%, -50%)',
												padding: '.25rem 2rem',
											}}
										>
											<Typography>MOST POPULAR</Typography>
										</Box>
									)}
									<CardContent
										sx={{
											p: '1.5rem',
											zIndex: 5,
										}}
									>
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'space-around',
												alignItems: 'center',
												height: '13rem',
												gap: '.5rem',
											}}
										>
											<Typography
												variant='h4'
												component='h4'
												sx={{ fontWeight: 'bold' }}
											>
												{tier.name}
											</Typography>
											<Box>
												<Typography
													variant='h1'
													component='span'
													sx={{ fontWeight: 'bold' }}
												>
													{tier.price > 0 ? `$${tier.price}` : 'Free'}
												</Typography>
												<Typography
													component='span'
													sx={{ fontWeight: 'bold' }}
												>
													{tier.price > 0 ? '/mo' : ''}
												</Typography>
											</Box>
											<Box>
												<Button
													variant='contained'
													sx={{
														backgroundColor: colors.greenAccent[400],
														'&:hover': {
															backgroundColor: colors.greenAccent[300],
														},
														width: { xs: '10rem', lg: '15rem' },
														height: '3rem',
													}}
												>
													<Typography
														textAlign='center'
														component='a'
														href='/register'
														sx={{ letterSpacing: '.05rem' }}
													>
														Select {tier.name.split(' ')[0]}
													</Typography>
												</Button>
											</Box>
										</Box>
										<Box sx={{ marginTop: '2rem' }}>
											<Typography sx={{ fontWeight: 'bold' }}>
												Key Features
											</Typography>
											<Box
												sx={{
													display: 'flex',
													flexDirection: 'column',
													justifyContent: 'space-between',
												}}
											>
												<List sx={{ minHeight: 520 }}>
													{tier.features.map((feature, index) => {
														return (
															<>
																<ListItem key={`${tier}-${index}`}>
																	<ListItemIcon>
																		<Check
																			sx={{ color: colors.greenAccent[500] }}
																		/>
																	</ListItemIcon>
																	<ListItemText primary={feature} />
																</ListItem>
															</>
														);
													})}
												</List>
											</Box>
										</Box>
									</CardContent>
								</Card>
							</>
						);
					})}
				</Box>
			</Box>
		</>
	);
};

export default Pricing;
