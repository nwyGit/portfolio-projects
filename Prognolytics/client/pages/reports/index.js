import PieChart from "@/components/charts/PieChart";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/layout/Header";
import { Box } from "@mui/material";
import { useAtom } from "jotai";
import { recordsAtom } from "@/state";
import categories from "@/data/categories";

const Reports = () => {
	const [records] = useAtom(recordsAtom);
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
				<Box m="10px 20px">
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
					>
						<Header title="Reports" subtitle="Welcome to your Reports" />
					</Box>
					<Box height="80vh">
						<PieChart data={pieChartData.filter((cat) => cat.value > 0)} />
					</Box>
				</Box>
			</DashboardLayout>
		</>
	);
};

export default Reports;
