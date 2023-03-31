import React from 'react';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { isCollapsedAtom } from '@/state';
import {
	Box,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	useTheme,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AssessmentIcon from '@mui/icons-material/Assessment';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { tokens } from '../../styles/theme';
import styles from '@/styles/index';
import Link from 'next/link';
import { readToken } from '@/lib/authenticate';

const Item = ({ title, to, icon }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<ListItem style={{ color: colors.grey[100] }}>
			<Link href={to} passHref legacyBehavior>
				<ListItemButton>
					<ListItemIcon>{icon}</ListItemIcon>
					<ListItemText primary={title} />
				</ListItemButton>
			</Link>
		</ListItem>
	);
};

const Sidebar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [isCollapsed, setIsCollapsed] = useAtom(isCollapsedAtom);

	return (
		<>
			<Box
				sx={{
					'&.pro-sidebar-inner': {
						background: `${colors.primary[200]} !important`,
					},
					'& .MuiListItem-root': {
						background: `${colors.primary[200]} !important`,
					},
					'& .MuiListItemIcon-root': {
						minWidth: '40px',
					},
				}}
				className={`${styles.sideBar} ${
					isCollapsed ? 'w-0' : 'w-1/6 min-w-[16rem]'
				}`}
			>
				{!isCollapsed && (
					<>
						{/** MENU ICON */}
						<Box className={`flex justify-end m-4`}>
							<IconButton
								onClick={() => {
									setIsCollapsed(!isCollapsed);
								}}
							>
								<MenuOutlinedIcon />
							</IconButton>
						</Box>
						{/** USER */}
						<Box mb='25px'>
							<Box className={`${styles.flexCenter}`}>
								<Image
									priority
									src='/avatar.jpg'
									alt='profile-user'
									width={100}
									height={100}
									className='cursor-pointer rounded-full m-4'
								/>
							</Box>
							<Box textAlign='center'>
								<Typography
									variant='h3'
									color={colors.grey[100]}
									fontWeight='bold'
								>
									{readToken()?.username}
								</Typography>
								<Typography variant='h5' color={colors.greenAccent[400]}>
									Basic Plan
								</Typography>
							</Box>
						</Box>
						{/** MENU ITEMS */}
						<List sx={{ mx: 2 }}>
							<Item
								title='Dashboard'
								to='/dashboard'
								icon={<DashboardIcon />}
							/>
							<Item
								title='Expense records'
								to='/records'
								icon={<ReceiptLongIcon />}
							/>
							<Item title='Reports' to='/reports' icon={<RequestQuoteIcon />} />
							<Item
								title='Analytics'
								to='/analytics'
								icon={<AssessmentIcon />}
							/>
							<Divider />
							<Item title='Settings' to='/settings' icon={<SettingsIcon />} />
						</List>
					</>
				)}
			</Box>
		</>
	);
};

export default Sidebar;
