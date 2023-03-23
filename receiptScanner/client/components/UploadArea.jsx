import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { useAtom } from 'jotai';
import { isEnterManuallyAtom } from '@/state';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { tokens } from '@/styles/theme';
import styles from '@/styles';
import UploadScan from './UploadScanLogo';
import { getToken } from '@/lib/authenticate';

const UploadArea = ({ onUploadComplete }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [isLoading, setIsLoading] = useState(false);
	const [isEnterManually, setIsEnterManually] = useAtom(isEnterManuallyAtom);

	const handleDrop = async (acceptedFiles) => {
		setIsLoading(true);
		const formData = new FormData();
		formData.append('receipt', acceptedFiles[0]);

		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/receipt-scanner`,
				formData,
				{
					headers: {
						Authorization: `JWT ${getToken()}`,
						'Content-Type': 'application/json',
					},
				}
			);
			onUploadComplete(response.data);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Box className={`${styles.formCenter}`}>
			<Box
				sx={{ backgroundColor: colors.primary[200], borderRadius: '25px' }}
				className={`${styles.flexCenter} ${styles.form} grid place-content-evenly`}
			>
				<Typography
					variant='h1'
					color={colors.grey[100]}
					fontWeight='bold'
					display='flex'
					justifyContent='center'
				>
					Receipt Scanner
				</Typography>
				<Dropzone onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}>
					{({ getRootProps, getInputProps }) => (
						<>
							<Box sx={{ p: '2rem' }}>
								<div
									{...getRootProps()}
									className={`${styles.flexCenter} flex-col cursor-pointer`}
								>
									<input {...getInputProps()} />
									<div className={`${styles.flexCenter} `}>
										<UploadScan color={colors.grey[500]} />
									</div>
									<Typography
										variant='h5'
										color={colors.grey[100]}
										className='mt-10'
									>
										Drag & Drop a receipt here, or Click to select one
									</Typography>
								</div>
							</Box>
						</>
					)}
				</Dropzone>
				<div className={`${styles.flexCenter}`}>
					<Button
						variant='outlined'
						size='large'
						onClick={() => setIsEnterManually(!isEnterManually)}
						style={{ backgroundColor: colors.primary[700] }}
						sx={{
							color: colors.primary[100],
						}}
					>
						Enter Manually
					</Button>
				</div>
				{isLoading && <div></div>}
			</Box>
		</Box>
	);
};

export default UploadArea;
