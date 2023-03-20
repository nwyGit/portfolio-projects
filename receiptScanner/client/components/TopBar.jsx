import React, { useContext } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { ColorModeContext, tokens } from '@/styles/theme';
import InputBase from '@mui/material/InputBase';
import {
	LightModeOutlined,
	DarkModeOutlined,
	NotificationsOutlined,
	SettingsOutlined,
	PersonOutlined,
	MenuOutlined,
} from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { useAtom } from 'jotai';
import { isCollapsedAtom } from '@/state';

const TopBar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const colorMode = useContext(ColorModeContext);
	const [isCollapsed, setIsCollapsed] = useAtom(isCollapsedAtom);

	return (
		<>
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
						<SettingsOutlined />
					</IconButton>
					<IconButton>
						<PersonOutlined />
					</IconButton>
				</Box>
			</Box>
		</>
	);
};

export default TopBar;
