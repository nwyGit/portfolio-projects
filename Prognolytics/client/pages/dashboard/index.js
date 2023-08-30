import LineChart from '@/components/charts/LineChart';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Header from '@/components/layout/Header';
import StatBox from '@/components/StatBox';
import { tokens } from '@/styles/theme';
import { useTheme } from '@emotion/react';
import {
	Download,
	DownloadOutlined,
	Email,
	PersonAdd,
	PointOfSale,
	Traffic,
} from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { mockTransactions } from '@/data/mockData';
import ProgressCircle from '@/components/charts/ProgressCircle';
import BarChart from '@/components/charts/BarChart';
import { getRecords } from '@/lib/recordService';
import categories from '@/public/categories';
import { useAtom } from 'jotai';
import { recordsAtom } from '@/state';
import { useEffect } from 'react';

const Dashboard = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [records, setRecords] = useAtom(recordsAtom);

	useEffect(() => {
		readRecord();
	}, []);

	const readRecord = () => {
		getRecords()
			.then((data) => {
				setRecords(data);
			})
			.catch((err) => {
				console.log(err);
				throw new Error('Failed to find records.');
			});
	};

	const pieChartData = categories.map((category) => {
		return {
			id: category,
			label: category,
			value: 0,
		};
	});

	records.forEach((record) => {
		pieChartData.forEach((cat) => {
			if (cat.id === record.category) cat.value += record.amount;
		});
	});

	return (
		<>
			<DashboardLayout>
				<Box m='10px 20px'>
					<Box
						display='flex'
						justifyContent='space-between'
						alignItems='center'
					>
						<Header title='DASHBOARD' subtitle='Welcome to your dashboard' />
						<Box>
							<Button
								variant='contained'
								endIcon={<Download />}
								onClick={() => {
									setIsStartToScan(!isStartToScan);
								}}
								sx={{
									backgroundColor: colors.orangeAccent[500],
									'&:hover': {
										backgroundColor: colors.orangeAccent[500],
									},
								}}
							>
								Download reports
							</Button>
						</Box>
					</Box>
					<Box m='20px 0 0 0' height='80vh' sx={{ overflow: 'auto' }}>
						{/* GRID & CHARTS */}
						<Box
							display='grid'
							gridTemplateColumns='repeat(12, 1fr)'
							gridAutoRows='7rem'
							gap='1.5rem'
						>
							{/* ROW 1 */}
							<Box
								gridColumn='span 3'
								backgroundColor={colors.primary[200]}
								display='flex'
								alignItems='center'
								justifyContent='center'
							>
								<StatBox
									title='12,361'
									subtitle='Emails Sent'
									progress='0.75'
									increase='+14%'
									icon={
										<Email
											sx={{
												color: colors.greenAccent[400],
												fontSize: '26px',
											}}
										/>
									}
								/>
							</Box>
							<Box
								gridColumn='span 3'
								backgroundColor={colors.primary[200]}
								display='flex'
								alignItems='center'
								justifyContent='center'
							>
								<StatBox
									title='431,225'
									subtitle='Sales Obtained'
									progress='0.50'
									increase='+21%'
									icon={
										<PointOfSale
											sx={{
												color: colors.greenAccent[400],
												fontSize: '26px',
											}}
										/>
									}
								/>
							</Box>
							<Box
								gridColumn='span 3'
								backgroundColor={colors.primary[200]}
								display='flex'
								alignItems='center'
								justifyContent='center'
							>
								<StatBox
									title='32,441'
									subtitle='New Clients'
									progress='0.30'
									increase='+5%'
									icon={
										<PersonAdd
											sx={{
												color: colors.greenAccent[400],
												fontSize: '26px',
											}}
										/>
									}
								/>
							</Box>
							<Box
								gridColumn='span 3'
								backgroundColor={colors.primary[200]}
								display='flex'
								alignItems='center'
								justifyContent='center'
							>
								<StatBox
									title='1,325,134'
									subtitle='Traffic Received'
									progress='0.80'
									increase='+43%'
									icon={
										<Traffic
											sx={{
												color: colors.greenAccent[400],
												fontSize: '26px',
											}}
										/>
									}
								/>
							</Box>

							{/* ROW 2 */}
							<Box
								gridColumn='span 8'
								gridRow='span 2'
								backgroundColor={colors.primary[200]}
							>
								<Box
									mt='15px'
									p='0 30px'
									display='flex'
									justifyContent='space-between'
									alignItems='center'
								>
									<Box>
										<Typography
											variant='h5'
											fontWeight='600'
											color={colors.grey[100]}
										>
											Revenue Generated
										</Typography>
										<Typography
											variant='h3'
											fontWeight='bold'
											color={colors.greenAccent[400]}
										>
											$59,342.32
										</Typography>
									</Box>
									<Box>
										<IconButton>
											<DownloadOutlined
												sx={{
													fontSize: '26px',
													color: colors.greenAccent[400],
												}}
											/>
										</IconButton>
									</Box>
								</Box>
								<Box height='240px' m='-2rem 0 0 0'>
									<LineChart isDashboard={true} />
								</Box>
							</Box>
							<Box
								gridColumn='span 4'
								gridRow='span 2'
								backgroundColor={colors.primary[200]}
								overflow='auto'
							>
								<Box
									display='flex'
									justifyContent='space-between'
									alignItems='center'
									borderBottom={`4px solid ${colors.primary[500]}`}
									colors={colors.grey[100]}
									p='15px'
								>
									<Typography
										color={colors.grey[100]}
										variant='h5'
										fontWeight='600'
									>
										Recent Transactions
									</Typography>
								</Box>
								{mockTransactions.map((transaction, i) => (
									<Box
										key={`${transaction.txId}-${i}`}
										display='flex'
										justifyContent='space-between'
										alignItems='center'
										borderBottom={`4px solid ${colors.primary[500]}`}
										p='15px'
									>
										<Box>
											<Typography
												color={colors.greenAccent[400]}
												variant='h5'
												fontWeight='600'
											>
												{transaction.txId}
											</Typography>
											<Typography color={colors.grey[100]}>
												{transaction.user}
											</Typography>
										</Box>
										<Box color={colors.grey[100]}>{transaction.date}</Box>
										<Box
											backgroundColor={colors.greenAccent[400]}
											p='5px 10px'
											borderRadius='4px'
										>
											${transaction.cost}
										</Box>
									</Box>
								))}
							</Box>

							{/* ROW 3 */}
							<Box
								gridColumn='span 4'
								gridRow='span 2'
								backgroundColor={colors.primary[200]}
								p='15px'
							>
								<Typography variant='h5' fontWeight='600'>
									Health Score
								</Typography>
								<Box
									display='flex'
									flexDirection='row'
									justifyContent='center'
									alignItems='center'
									sx={{ m: '1rem' }}
								>
									<Box sx={{ position: 'relative' }}>
										<ProgressCircle size='125' />
										<Typography
											variant='h1'
											fontWeight='bold'
											sx={{
												position: 'absolute',
												top: '50%',
												left: '50%',
												transform: 'translate(-50%, -50%)',
											}}
										>
											98
										</Typography>
									</Box>
									<Box sx={{ width: 250, ml: '2rem' }}>
										<Typography
											variant='h4'
											fontWeight='bold'
											color={colors.greenAccent[400]}
											sx={{ mb: '.5rem' }}
										>
											Excellent
										</Typography>
										<Typography variant='h5'>
											Congratulations! Your remarkable income and minimal
											expenses have led to financial success. Let's maintain and
											expand your financial freedom.
										</Typography>
									</Box>
								</Box>
							</Box>
							<Box
								gridColumn='span 4'
								gridRow='span 2'
								backgroundColor={colors.primary[200]}
							>
								<Typography
									variant='h5'
									fontWeight='600'
									sx={{ padding: '15px 15px 0 15px' }}
								>
									Sales Quantity
								</Typography>
								<Box height='250px' mt='-20px'>
									<BarChart isDashboard={true} />
								</Box>
							</Box>
							<Box
								gridColumn='span 4'
								gridRow='span 2'
								backgroundColor={colors.primary[200]}
								p='15px'
							>
								<Typography
									variant='h5'
									fontWeight='600'
									sx={{ marginBottom: '15px' }}
								>
									Geography Based Traffic
								</Typography>
								<Box height='200px'>
									{/* <GeographyChart isDashboard={true} /> */}
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			</DashboardLayout>
		</>
	);
};

export default Dashboard;
