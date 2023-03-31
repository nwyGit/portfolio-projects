import DashboardLayout from '@/components/layout/DashboardLayout';
import Header from '@/components/layout/Header';
import { Box } from '@mui/material';
import React from 'react';

const Analytics = () => {
	return (
		<>
			<DashboardLayout>
				<Box m='20px'>
					<Box
						display='flex'
						justifyContent='space-between'
						alignItems='center'
					>
						<Header title='Analytics' subtitle='Welcome to your Analytics' />
					</Box>
				</Box>
			</DashboardLayout>
		</>
	);
};

export default Analytics;
