import React, { useContext, useState } from 'react';
import {
	Box,
	Divider,
	IconButton,
	ListItemIcon,
	Menu,
	MenuItem,
	useTheme,
} from '@mui/material';
import { ColorModeContext, tokens } from '@/styles/theme';
import InputBase from '@mui/material/InputBase';
import {
	LightModeOutlined,
	DarkModeOutlined,
	NotificationsOutlined,
	SettingsOutlined,
	PersonOutlined,
	MenuOutlined,
	Logout,
} from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { useAtom } from 'jotai';
import { isCollapsedAtom } from '@/state';
import { readToken, removeToken } from '@/lib/authenticate';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AlertMessage from '../image-components/AlertMessage';

const TopBar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const colorMode = useContext(ColorModeContext);

	const [isCollapsed, setIsCollapsed] = useAtom(isCollapsedAtom);
	const [resMsg, setResMsg] = useState('');
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const router = useRouter();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const token = readToken();

	const logout = async () => {
		setResMsg('You have been successfully logged out.');
		setTimeout(() => {
			removeToken();
			router.push('/');
		}, 2000);
	};

	return (
		<>
			{resMsg && <AlertMessage resMsg={resMsg} type='info' />}
			<Box display='flex' justifyContent='space-between' p={2}>
				<Box display='flex'>
					{isCollapsed && (
						<>
							{/** MENU ICON */}
							<Box>
								<IconButton
									onClick={() => {
										setIsCollapsed(!isCollapsed);
									}}
								>
									<MenuOutlined />
								</IconButton>
							</Box>
						</>
					)}
					{/** SEARCH BAR */}
					<Box
						display='flex'
						backgroundColor={colors.primary[200]}
						borderRadius='10px'
						sx={{ ml: 2 }}
					>
						<InputBase sx={{ ml: 2 }} placeholder='Search' />
						<IconButton type='button' sx={{ p: 1 }}>
							<SearchIcon />
						</IconButton>
					</Box>
				</Box>
				{/** ICONS */}
				<Box>
					<IconButton onClick={colorMode.toggleColorMode}>
						{theme.palette.mode === 'dark' ? (
							<LightModeOutlined />
						) : (
							<DarkModeOutlined />
						)}
					</IconButton>
					<IconButton>
						<NotificationsOutlined />
					</IconButton>
					<IconButton>
						<Link href='/settings' passHref legacyBehavior>
							<SettingsOutlined />
						</Link>
					</IconButton>
					<IconButton
						onClick={handleClick}
						size='small'
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
					>
						<PersonOutlined />
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						id='account-menu'
						open={open}
						onClose={handleClose}
						onClick={handleClose}
						transformOrigin={{ horizontal: 'right', vertical: 'top' }}
						anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
					>
						<MenuItem onClick={logout}>
							<ListItemIcon>
								<Logout />
							</ListItemIcon>
							Logout
						</MenuItem>
					</Menu>
				</Box>
			</Box>
		</>
	);
};

export default TopBar;
