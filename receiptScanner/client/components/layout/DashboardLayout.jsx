import React from 'react';
import { useAtom } from 'jotai';
import { isCollapsedAtom } from '@/state';
import SideBar from '../navigation/SideBar';
import TopBar from '../navigation/TopBar';
import styles from '@/styles';

const DashboardLayout = ({ children }) => {
	const [isCollapsed] = useAtom(isCollapsedAtom);

	return (
		<div className='flex relative'>
			<SideBar />
			<main
				className={`${styles.sideBar} ${
					isCollapsed ? 'w-screen' : 'w-5/6'
				} h-screen`}
			>
				<TopBar />
				{children}
			</main>
		</div>
	);
};

export default DashboardLayout;
