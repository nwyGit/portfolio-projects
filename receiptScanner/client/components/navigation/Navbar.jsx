import React, { useState } from 'react';
import {
	AppBar,
	Box,
	Button,
	IconButton,
	Toolbar,
	Typography,
	useTheme,
} from '@mui/material';
import { Stack } from '@mui/system';
import { tokens } from '@/styles/theme';

const Navbar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<Box>
			<AppBar position='static' sx={{ display: { xs: 'none', sm: 'block' } }}>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='logo'
					></IconButton>
					<Typography
						variant='h3'
						component='h3'
						fontWeight='bold'
						sx={{ flexGrow: 1 }}
					>
						FinScope
					</Typography>
					<Stack direction='row' spacing={2}>
						<Button color='inherit'>Features</Button>
						<Button color='inherit'>Pricing</Button>
						<Button color='inherit'>About</Button>
						<Button
							variant='contained'
							color='inherit'
							href='/login'
							style={{ backgroundColor: colors.primary[900] }}
							sx={{
								color: colors.grey[900],
							}}
						>
							Login
						</Button>
					</Stack>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
