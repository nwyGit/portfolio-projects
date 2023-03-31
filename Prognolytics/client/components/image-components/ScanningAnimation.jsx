import styles from '@/styles';
import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';

import React from 'react';

const ScanningAnimation = () => {
	const theme = useTheme();
	return (
		<>
			<Box className={`${styles.elementCenter} ${styles.flexCenter} flex-col`}>
				<Box
					className='receiptScan'
					sx={{
						'&::before': {
							backgroundImage: `url(${
								theme.palette.mode === 'light'
									? '/scanningLightMode.png'
									: '/scanningDarkMode.png'
							})`,
						},
						'&::after': {
							background: `${
								theme.palette.mode === 'light' ? '#649B92' : '#C3FCF2'
							}`,
							filter: `drop-shadow(0 0 20px ${
								theme.palette.mode === 'light' ? '#649B92' : '#C3FCF2'
							}) drop-shadow(0 0 60px ${
								theme.palette.mode === 'light' ? '#649B92' : '#C3FCF2'
							})`,
						},
					}}
				/>
				<Typography
					variant='h3'
					className='receiptScanText'
					sx={{
						marginTop: '2rem',
						color: `${theme.palette.mode === 'light' ? '#649B92' : '#C3FCF2'}`,
						filter: `drop-shadow(0 0 20px ${
							theme.palette.mode === 'light' ? '#649B92' : '#C3FCF2'
						}) drop-shadow(0 0 60px ${
							theme.palette.mode === 'light' ? '#649B92' : '#C3FCF2'
						})`,
					}}
				>
					scanning...
				</Typography>
			</Box>
		</>
	);
};

export default ScanningAnimation;
