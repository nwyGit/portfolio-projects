import Image from 'next/image';
import { useAtom } from 'jotai';
import { isCollapsedAtom } from '@/state';
import {
	Box,
	Divider,
	IconButton,
	List,
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
import HelpIcon from '@mui/icons-material/Help';
import { tokens } from '../../styles/theme';
import styles from '@/styles/index';
import Link from 'next/link';
import { readToken } from '@/lib/authenticate';
import { useRouter } from 'next/router';

const Item = ({ label, to, icon }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const router = useRouter();
	const active = router.pathname === to;

	return (
		<Link href={to} legacyBehavior>
			<ListItemButton
				component='a'
				style={{ color: colors.grey[100] }}
				sx={{
					m: '10px',
					p: '10px 15px',
				}}
			>
				<ListItemIcon
					sx={{
						color: active ? colors.orangeAccent[500] : '',
					}}
				>
					{icon}
				</ListItemIcon>
				<ListItemText
					primary={
						<Typography
							sx={{
								color: active ? colors.orangeAccent[500] : '',
								fontWeight: active ? 'bold' : '',
							}}
						>
							{label}
						</Typography>
					}
				/>
			</ListItemButton>
		</Link>
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
					background: colors.primary[200],
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
								label='Dashboard'
								to='/dashboard'
								icon={<DashboardIcon />}
							/>
							<Typography
								variant='h6'
								color={colors.grey[300]}
								sx={{ m: '15px 0 5px 20px' }}
							>
								Data
							</Typography>
							<Item
								label='Expense records'
								to='/records'
								icon={<ReceiptLongIcon />}
							/>
							<Typography
								variant='h6'
								color={colors.grey[300]}
								sx={{ m: '15px 0 5px 20px' }}
							>
								Charts
							</Typography>
							<Item label='Reports' to='/reports' icon={<RequestQuoteIcon />} />
							<Item
								label='Analytics'
								to='/analytics'
								icon={<AssessmentIcon />}
							/>
							<Divider />
							<Item label='FAQ' to='/faq' icon={<HelpIcon />} />
							<Item label='Settings' to='/settings' icon={<SettingsIcon />} />
						</List>
					</>
				)}
			</Box>
		</>
	);
};

export default Sidebar;
