import {
	AppBar,
	Box,
	Menu,
	IconButton,
	MenuItem,
	Toolbar,
	Typography,
	useTheme,
	Button,
} from '@mui/material';
import { tokens } from '@/styles/theme';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

const navItems = [
	{ name: 'Features', path: 'features' },
	{ name: 'Plans & Pricing', path: 'pricing' },
	{ name: 'About Us', path: 'about' },
	{ name: 'Contact Us', path: 'contact' },
];

const Navbar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [anchorElNav, setAnchorElNav] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<Box sx={{ position: 'fixed', zIndex: 15, width: 'screen' }}>
			<AppBar
				sx={{
					backgroundColor: 'white',
					boxShadow: 'none',
					p: '.5rem 1.5rem',
				}}
			>
				<Toolbar
					sx={{
						color: colors.primary[800],
					}}
				>
					{/** Logo and brand name for small device*/}
					<Typography
						variant='h5'
						noWrap
						component='a'
						href='/'
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.1rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						Prognolytics
					</Typography>

					{/** Small device navbar */}
					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{navItems.map((page) => (
								<MenuItem key={page.path} onClick={handleCloseNavMenu}>
									<Typography
										textAlign='center'
										component='a'
										href={`/#${page.path}`}
									>
										{page.name}
									</Typography>
								</MenuItem>
							))}
							<MenuItem key='Login' onClick={handleCloseNavMenu}>
								<Typography textAlign='center' component='a' href='/login'>
									Login
								</Typography>
							</MenuItem>
							<MenuItem key='SignUp' onClick={handleCloseNavMenu}>
								<Typography textAlign='center' component='a' href='/register'>
									Sign Up
								</Typography>
							</MenuItem>
						</Menu>
					</Box>

					{/** Logo and brand name for large device*/}
					<Typography
						variant='h3'
						noWrap
						component='a'
						href='/'
						sx={{
							mr: 6,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 'bold',
							letterSpacing: '.1rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						Prognolytics
					</Typography>

					{/** Large device navbar */}
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{navItems.map((page) => (
							<Typography
								variant='h5'
								component='h5'
								textAlign='center'
								key={page.path}
								onClick={handleCloseNavMenu}
								sx={{ mx: 4, display: 'block', letterSpacing: '.05rem' }}
							>
								<Link href={`/#${page.path}`}>{page.name}</Link>
							</Typography>
						))}
					</Box>
					<Box
						sx={{
							display: { xs: 'none', md: 'flex' },
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Button
							href='/login'
							sx={{ mx: 4, display: 'block', color: 'inherit' }}
						>
							<Typography
								variant='h5'
								component='h5'
								textAlign='center'
								onClick={handleCloseNavMenu}
								sx={{ letterSpacing: '.05rem' }}
							>
								Login
							</Typography>
						</Button>
						<Button
							variant='contained'
							href='/register'
							sx={{
								display: 'block',
								backgroundColor: colors.primary[800],
							}}
						>
							<Typography
								variant='h6'
								component='h6'
								textAlign='center'
								onClick={handleCloseNavMenu}
								sx={{ letterSpacing: '.05rem' }}
							>
								Sign up
							</Typography>
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
