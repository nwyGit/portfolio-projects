import PieChart from '@/components/charts/PieChart';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Header from '@/components/layout/Header';
import { getRecords } from '@/lib/service';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import categories from '@/public/categories';
import colors from '@/public/colors';

const Reports = () => {
	const [records, setRecords] = useState([]);

	useEffect(() => {
		readRecord();
	}, []);

	const readRecord = () => {
		getRecords()
			.then((data) => {
				const records = categories.map((category, index) => {
					return {
						id: category,
						label: category,
						value: 0,
						color: colors[index % 5],
					};
				});

				data.forEach((record) => {
					records.forEach((cat) => {
						if (cat.id === record.category) cat.value += record.amount;
					});
				});

				setRecords(records.filter((cat) => cat.value > 0));
			})
			.catch((err) => {
				console.log(err);
				throw new Error('Failed to find records.');
			});
	};

	return (
		<>
			<DashboardLayout>
				<Box m='20px'>
					<Box
						display='flex'
						justifyContent='space-between'
						alignItems='center'
					>
						<Header title='Reports' subtitle='Welcome to your Reports' />
					</Box>
					<Box height='75vh'>
						<PieChart data={records} />
					</Box>
				</Box>
			</DashboardLayout>
		</>
	);
};

export default Reports;
