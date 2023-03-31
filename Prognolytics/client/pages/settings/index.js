import DashboardLayout from '@/components/layout/DashboardLayout';
import Header from '@/components/layout/Header';
import { Box } from '@mui/material';
import React from 'react';

const Settings = () => {
	return (
		<>
			<DashboardLayout>
				<Box m='20px'>
					<Box
						display='flex'
						justifyContent='space-between'
						alignItems='center'
					>
						<Header title='Settings' subtitle='Welcome to your Settings' />
					</Box>
				</Box>
			</DashboardLayout>
		</>
	);
};

export default Settings;
