import LineChart from "@/components/charts/LineChart";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/layout/Header";
import StatBox from "@/components/StatBox";
import { tokens } from "@/styles/theme";
import { useTheme } from "@emotion/react";
import {
	Download,
	Paid,
	Category,
	Traffic,
	Receipt,
} from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import ProgressCircle from "@/components/charts/ProgressCircle";
import BarChart from "@/components/charts/BarChart";
import { getRecords } from "@/lib/recordService";
import { useAtom } from "jotai";
import { recordsAtom } from "@/state";
import { useEffect, useState } from "react";
import { tips } from "@/data/tips";
import {
	generateExpenditureDetails,
	generateHighestExpense,
	generatePast6MonthsDetails,
	generateTopSpendingCategory,
	generateTotalExpense,
} from "@/lib/dashboardService";

const Dashboard = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [records, setRecords] = useAtom(recordsAtom);
	const [transactions, setTransactions] = useState(null);
	const [totalSpent, setTotalSpent] = useState(0);
	const [highestSingleExpense, setHighestSingleExpense] = useState(0);
	const [topSpendingCategory, setTopSpendingCategory] = useState(null);
	const [expenditureDetails, setExpenditureDetails] = useState(null);
	const [past6MonthsDetails, setPast6MonthsDetails] = useState(null);
	const [past6MonthsCat, setPast6MonthsCat] = useState(null);
	const [randomTip, setRandomTip] = useState(null);

	useEffect(() => {
		//get records
		readRecord();
		//random tip
		setRandomTip(tips[Math.floor(Math.random() * tips.length)]);
	}, []);

	useEffect(() => {
		// total money spent
		const totalSpent = generateTotalExpense(records);
		setTotalSpent(totalSpent);

		//highest single expense
		const highestSingleExpense = generateHighestExpense(records);
		setHighestSingleExpense(highestSingleExpense);

		//Top spending category
		const topSpendingCategory = generateTopSpendingCategory(records);
		setTopSpendingCategory(topSpendingCategory);

		//expenditure details
		const details = generateExpenditureDetails(records);
		setExpenditureDetails(details);

		//past 6 months
		const past6months = generatePast6MonthsDetails(records);
		const past6monthsCat = [
			...new Set(
				past6months.flatMap((entry) =>
					Object.keys(entry).filter((key) => key !== "month")
				)
			),
		];
		setPast6MonthsCat(past6monthsCat);
		setPast6MonthsDetails(past6months);
	}, [records]);

	const readRecord = () => {
		getRecords()
			.then((data) => {
				setRecords(data);
				setTransactions(
					data.sort((a, b) => new Date(b.date) - new Date(a.date))
				);
			})
			.catch((err) => {
				console.log(err);
				throw new Error("Failed to find records.");
			});
	};

	return (
		<>
			<DashboardLayout>
				<Box m="10px 20px">
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
					>
						<Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
						<Box>
							<Button
								variant="contained"
								endIcon={<Download />}
								onClick={() => {
									setIsStartToScan(!isStartToScan);
								}}
								sx={{
									backgroundColor: colors.orangeAccent[500],
									"&:hover": {
										backgroundColor: colors.orangeAccent[500],
									},
								}}
							>
								Download reports
							</Button>
						</Box>
					</Box>
					<Box m="20px 0 0 0" height="80vh" sx={{ overflow: "auto" }}>
						{/* GRID & CHARTS */}
						<Box
							display="grid"
							gridTemplateColumns="repeat(12, 1fr)"
							gridAutoRows="7rem"
							gap="1.5rem"
						>
							{/* ROW 1 */}
							<Box
								gridColumn="span 3"
								backgroundColor={colors.primary[200]}
								display="flex"
								alignItems="center"
								justifyContent="center"
							>
								<StatBox
									title={`$${totalSpent}`}
									subtitle="Total Spent"
									progress="0.75"
									increase="+14%"
									icon={
										<Paid
											sx={{
												color: colors.greenAccent[400],
												fontSize: "26px",
											}}
										/>
									}
								/>
							</Box>
							<Box
								gridColumn="span 3"
								backgroundColor={colors.primary[200]}
								display="flex"
								alignItems="center"
								justifyContent="center"
							>
								<StatBox
									title={`$${highestSingleExpense}`}
									subtitle="Highest Single Expense"
									progress="0.50"
									increase="+21%"
									icon={
										<Receipt
											sx={{
												color: colors.greenAccent[400],
												fontSize: "26px",
											}}
										/>
									}
								/>
							</Box>
							<Box
								gridColumn="span 3"
								backgroundColor={colors.primary[200]}
								display="flex"
								alignItems="center"
								justifyContent="center"
							>
								<StatBox
									title={topSpendingCategory}
									subtitle="Top Spending Category"
									progress="0.30"
									increase="+5%"
									icon={
										<Category
											sx={{
												color: colors.greenAccent[400],
												fontSize: "26px",
											}}
										/>
									}
								/>
							</Box>
							<Box
								gridColumn="span 3"
								backgroundColor={colors.primary[200]}
								display="flex"
								alignItems="center"
								justifyContent="center"
							>
								<StatBox
									title="$3,500"
									subtitle="Monthly Budget"
									progress="0.80"
									increase="+43%"
									icon={
										<Traffic
											sx={{
												color: colors.greenAccent[400],
												fontSize: "26px",
											}}
										/>
									}
								/>
							</Box>

							{/* ROW 2 */}
							<Box
								gridColumn="span 8"
								gridRow="span 2"
								backgroundColor={colors.primary[200]}
							>
								<Box
									mt="15px"
									p="0 30px"
									display="flex"
									justifyContent="space-between"
									alignItems="center"
								>
									<Box>
										<Typography
											variant="h5"
											fontWeight="600"
											color={colors.grey[100]}
										>
											Last 3 Years with Expenditure Record Details
										</Typography>
										{/* <Typography
											variant="h3"
											fontWeight="bold"
											color={colors.greenAccent[400]}
										>
											${totalSpent}
										</Typography> */}
									</Box>
								</Box>
								<Box height="240px" m="-2rem 0 0 0">
									<LineChart isDashboard={true} data={expenditureDetails} />
								</Box>
							</Box>
							<Box
								gridColumn="span 4"
								gridRow="span 2"
								backgroundColor={colors.primary[200]}
								overflow="auto"
							>
								<Box
									display="flex"
									justifyContent="space-between"
									alignItems="center"
									borderBottom={`4px solid ${colors.primary[500]}`}
									colors={colors.grey[100]}
									p="15px"
								>
									<Typography
										color={colors.grey[100]}
										variant="h5"
										fontWeight="600"
									>
										Recent Transactions
									</Typography>
								</Box>
								{transactions?.map((transaction, i) => (
									<Box
										key={`${transaction._id}`}
										display="flex"
										justifyContent="space-between"
										alignItems="center"
										borderBottom={`4px solid ${colors.primary[500]}`}
										p="15px"
									>
										<Box>
											<Typography
												color={colors.greenAccent[400]}
												variant="h5"
												fontWeight="600"
											>
												{transaction.category}
											</Typography>
											<Typography color={colors.grey[100]}>
												{transaction.merchant}
											</Typography>
										</Box>
										<Box color={colors.grey[100]}>{transaction.date}</Box>
										<Box
											backgroundColor={colors.greenAccent[400]}
											p="5px 10px"
											borderRadius="4px"
										>
											${transaction.amount}
										</Box>
									</Box>
								))}
							</Box>

							{/* ROW 3 */}
							<Box
								gridColumn="span 4"
								gridRow="span 2"
								backgroundColor={colors.primary[200]}
								p="15px"
							>
								<Typography variant="h5" fontWeight="600">
									Health Score
								</Typography>
								<Box
									display="flex"
									flexDirection="row"
									justifyContent="center"
									alignItems="center"
									sx={{ m: "1rem" }}
								>
									<Box sx={{ position: "relative" }}>
										<ProgressCircle progress="0.87" size="125" />
										<Typography
											variant="h1"
											fontWeight="bold"
											sx={{
												position: "absolute",
												top: "50%",
												left: "50%",
												transform: "translate(-50%, -50%)",
											}}
										>
											87
										</Typography>
									</Box>
									<Box sx={{ width: 250, ml: "2rem" }}>
										<Typography
											variant="h4"
											fontWeight="bold"
											color={colors.greenAccent[400]}
											sx={{ mb: ".5rem" }}
										>
											Excellent
										</Typography>
										<Typography variant="h5">
											Congratulations! Your remarkable income and minimal
											expenses have led to financial success. Let&apos;s
											maintain and expand your financial freedom.
										</Typography>
									</Box>
								</Box>
							</Box>
							<Box
								gridColumn="span 4"
								gridRow="span 2"
								backgroundColor={colors.primary[200]}
							>
								<Typography
									variant="h5"
									fontWeight="600"
									sx={{ padding: "15px 15px 0 15px" }}
								>
									Past 6 Months
								</Typography>
								<Box height="250px" mt="-20px">
									<BarChart
										isDashboard={true}
										data={past6MonthsDetails}
										keys={past6MonthsCat}
									/>
								</Box>
							</Box>
							<Box
								gridColumn="span 4"
								gridRow="span 2"
								backgroundColor={colors.primary[200]}
								p="15px"
							>
								<Typography
									variant="h5"
									fontWeight="600"
									sx={{ marginBottom: "15px" }}
								>
									Financial Advice and Tips
								</Typography>
								<Box height="200px">
									<Typography
										variant="h4"
										fontWeight="bold"
										color={colors.greenAccent[400]}
										sx={{ mb: ".5rem" }}
									>
										Today&apos;s tips - {randomTip?.title}
									</Typography>
									<Typography variant="h5">{randomTip?.content}</Typography>
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
