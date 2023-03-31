import DashboardLayout from '@/components/layout/DashboardLayout';
import Header from '@/components/layout/Header';
import { Box } from '@mui/material';
import React from 'react';

const Reports = () => {
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
				</Box>
			</DashboardLayout>
		</>
	);
};

export default Reports;
