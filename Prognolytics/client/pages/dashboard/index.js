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
import ProgressCircle from '@/components/ProgressCircle';
import BarChart from '@/components/charts/BarChart';

const Dashboard = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<>
			<DashboardLayout>
				<Box m='20px'>
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
					<Box m='40px 0 0 0' height='75vh'>
						{/* GRID & CHARTS */}
						<Box
							display='grid'
							gridTemplateColumns='repeat(12, 1fr)'
							gridAutoRows='8rem'
							gap='1.25rem'
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
												color: colors.greenAccent[600],
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
												color: colors.greenAccent[600],
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
												color: colors.greenAccent[600],
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
												color: colors.greenAccent[600],
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
									mt='25px'
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
											color={colors.greenAccent[500]}
										>
											$59,342.32
										</Typography>
									</Box>
									<Box>
										<IconButton>
											<DownloadOutlined
												sx={{
													fontSize: '26px',
													color: colors.greenAccent[500],
												}}
											/>
										</IconButton>
									</Box>
								</Box>
								<Box height='250px' m='-20px 0 0 0'>
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
												color={colors.greenAccent[500]}
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
											backgroundColor={colors.greenAccent[500]}
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
								p='30px'
							>
								<Typography variant='h5' fontWeight='600'>
									Campaign
								</Typography>
								<Box
									display='flex'
									flexDirection='column'
									alignItems='center'
									mt='25px'
								>
									<ProgressCircle size='125' />
									<Typography
										variant='h5'
										color={colors.greenAccent[500]}
										sx={{ mt: '15px' }}
									>
										$48,352 revenue generated
									</Typography>
									<Typography>
										Includes extra misc expenditures and costs
									</Typography>
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
									sx={{ padding: '30px 30px 0 30px' }}
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
								padding='30px'
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
