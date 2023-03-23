import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { isStartToScanAtom, isEnterManuallyAtom } from '@/state';
import Record from '@/components/Record';
import DashboardLayout from '@/components/content/DashboardLayout';
import { Box } from '@mui/material';
import UploadArea from '@/components/UploadArea';
import ReceiptForm from '@/components/forms/ExpenseForm';
import styles from '@/styles';

const ExpenseRecord = () => {
	const [isStartToScan, setIsStartToScan] = useAtom(isStartToScanAtom);
	const [isEnterManually, setIsEnterManually] = useAtom(isEnterManuallyAtom);
	const [receiptData, setReceiptData] = useState(null);

	const handleUploadComplete = (data) => {
		console.log(data);
		setReceiptData(data);
		setIsEnterManually(true);
	};

	return (
		<>
			<DashboardLayout>
				<Box m='20px'>
					<Record />
				</Box>
			</DashboardLayout>
			{isStartToScan && (
				<>
					<Box
						className={`${styles.blurOverlay} z-5`}
						onClick={() => {
							setIsStartToScan(!isStartToScan);
							setIsEnterManually(false);
						}}
					></Box>
					<UploadArea onUploadComplete={handleUploadComplete} />
					{isEnterManually && (
						<>
							<ReceiptForm receiptData={receiptData} />
						</>
					)}
				</>
			)}
		</>
	);
};

export default ExpenseRecord;
