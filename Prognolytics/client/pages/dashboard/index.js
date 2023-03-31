import DashboardLayout from '@/components/layout/DashboardLayout';
import Header from '@/components/layout/Header';
import { Box } from '@mui/material';
import React from 'react';

const Dashboard = () => {
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
					</Box>
				</Box>
			</DashboardLayout>
		</>
	);
};

export default Dashboard;
