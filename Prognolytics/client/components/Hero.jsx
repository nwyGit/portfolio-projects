import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import BackgroundImage from './image-components/BackgroundImage';
import { tokens } from '@/styles/theme';

const Hero = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<Box sx={{ position: 'relative', m: '15% 10%' }}>
			<BackgroundImage ImageUrl='/hero.png' alt='hero background' />
			<Box sx={{ zIndex: 5, position: 'relative' }}>
				<Typography variant='h2' fontWeight='bold'>
					Achieve Your Financial Goals
				</Typography>
				<Typography variant='h4' sx={{ zIndex: 5, m: '1% 0' }}>
					Effortlessly visualize your finances and receive expert advice powered
					by AI
				</Typography>
				<Box>
					<Button
						variant='outlined'
						href='/register'
						sx={{
							borderColor: colors.grey[100],
							borderRadius: '1.5rem',
							color: colors.grey[100],
							p: '1rem 2rem',
							m: '2.5% 0',
						}}
					>
						<Typography variant='h4' component='h4'>
							Start now
						</Typography>
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default Hero;
