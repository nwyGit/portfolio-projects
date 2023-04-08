import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import BackgroundImage from './image-components/BackgroundImage';
import { tokens } from '@/styles/theme';

const Hero = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<>
			<Box
				sx={{
					display: { xs: 'flex', sm: 'block' },
					flexDirection: { xs: 'column', sm: 'row' },
					textAlign: { xs: 'center', sm: 'left' },
					position: 'relative',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					gap: '1rem',
					p: { xs: '8%', sm: '30% 10%', md: '15% 10%' },
					zIndex: 5,
				}}
			>
				<Typography
					variant='h2'
					fontWeight='bold'
					sx={{ fontSize: { sm: 46 } }}
				>
					Achieve Your Financial Goals
				</Typography>
				<Typography variant='h4' sx={{ fontSize: { sm: 30 }, zIndex: 5 }}>
					Effortlessly visualize your finances and receive expert advice powered
					by AI
				</Typography>
				<Button
					variant='contained'
					href='/register'
					sx={{
						p: '1rem 2rem',
						m: '2rem 0',
						borderRadius: '1.5rem',
						backgroundColor: colors.primary[800],
					}}
				>
					<Typography variant='h4' component='h4'>
						Start now
					</Typography>
				</Button>
			</Box>
			<BackgroundImage ImageUrl='/hero.png' alt='hero background' />
		</>
	);
};

export default Hero;
