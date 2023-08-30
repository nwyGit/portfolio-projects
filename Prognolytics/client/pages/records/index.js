import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { isStartToScanAtom, isEnterManuallyAtom } from '@/state';
import Record from '@/components/record/Record';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Box } from '@mui/material';
import UploadArea from '@/components/record/UploadArea';
import ReceiptForm from '@/components/forms/ExpenseForm';
import styles from '@/styles';

const ExpenseRecord = () => {
	const [isStartToScan, setIsStartToScan] = useAtom(isStartToScanAtom);
	const [isEnterManually, setIsEnterManually] = useAtom(isEnterManuallyAtom);
	const [receiptData, setReceiptData] = useState(null);

	const handleUploadComplete = (data) => {
		setReceiptData(data);
	};

	return (
		<>
			<DashboardLayout>
				<Box m='10px 20px'>
					<Record />
				</Box>
			</DashboardLayout>
			{isStartToScan && (
				<>
					<Box
						className={`${styles.blurOverlay} z-5`}
						onClick={() => {
							setIsStartToScan(false);
							setIsEnterManually(false);
						}}
					></Box>
					<UploadArea onUploadComplete={handleUploadComplete} />
					{isEnterManually && (
						<ReceiptForm receiptData={receiptData} action='Create' />
					)}
				</>
			)}
		</>
	);
};

export default ExpenseRecord;
