import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	FaCreditCard,
	FaMoneyBillAlt,
	FaShoppingCart,
	FaStore,
} from 'react-icons/fa';
import { BsCalendar, BsList } from 'react-icons/bs';
import { RiFileTextLine } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import {
	isEnterManuallyAtom,
	isStartToScanAtom,
	isUpdateRecordAtom,
} from '@/state';
import styles from '@/styles';
import { Box, Button, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from '@/styles/theme';
import AlertMessage from '../image-components/AlertMessage';
import { createRecord, updateRecord } from '@/lib/service';
import categories from '@/public/categories';

const ReceiptForm = ({ receiptData, action }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [formData, setFormData] = useState(null);
	const [imageURL, setImageUrl] = useState('');
	const [isEnterManually, setIsEnterManually] = useAtom(isEnterManuallyAtom);
	const [isStartToScan, setIsStartToScan] = useAtom(isStartToScanAtom);
	const [, setIsUpdateRecord] = useAtom(isUpdateRecordAtom);
	const [resMsg, setResMsg] = useState('');

	const {
		register,
		setValue,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			merchant: '',
			category: '',
			date: '',
			description: '',
			paymentMethod: '',
			amount: '',
			items: [],
			imageURL: '',
		},
	});

	useEffect(() => {
		setFormData(receiptData);
		if (formData) {
			setImageUrl(receiptData.imageURL);
			Object.keys(formData).forEach((key) => {
				setValue(key, formData[key]);
			});
		}
	}, [receiptData, formData, setValue]);

	const date = watch('date');

	const onSubmit = async (data) => {
		if (action === 'Create') {
			newRecord(data);
		} else if (action === 'Update') {
			modifyRecord(data);
		}
	};

	const isFutureDate = (dateString) => {
		const currentDate = new Date();
		const inputDate = new Date(dateString);
		return inputDate > currentDate;
	};

	const validateItems = (value) => {
		if (Array.isArray(value)) {
			value = value.join(',');
		}
		const items = value.split(',');
		const trimmedItems = items.map((item) => item.trim());
		const isValid = trimmedItems.every(
			(item) => item.length > 0 && typeof item === 'string'
		);
		return isValid || 'Please enter a comma-separated list of items';
	};

	const newRecord = (data) => {
		createRecord(data)
			.then((msg) => {
				setMessage(msg);
			})
			.catch((err) => {
				console.log(err);
				throw new Error('Failed to create receipt.');
			});
	};

	const modifyRecord = (data) => {
		updateRecord(data)
			.then((msg) => {
				setMessage(msg);
			})
			.catch((err) => {
				console.log(err);
				throw new Error('Failed to update receipt.');
			});
	};

	const setMessage = (msg) => {
		setResMsg(msg);
		setTimeout(() => {
			setIsEnterManually(!isEnterManually);
			setIsStartToScan(!isStartToScan);
			window.location.reload();
		}, 3000);
	};

	return (
		<>
			{resMsg && <AlertMessage resMsg={resMsg} type='success' />}
			<Box className={`${styles.elementCenter}`}>
				<Box
					sx={{ backgroundColor: colors.primary[200], borderRadius: '25px' }}
					className={`${styles.expenseForm} overflow-hidden hover:overflow-auto overscroll-contain`}
				>
					<div className={`flex px-4 justify-between items-center`}>
						<h1 className='text-2xl font-bold my-4'>{action} Expense</h1>
						<IconButton
							onClick={() => {
								setIsStartToScan(false);
								setIsEnterManually(false);
								setIsUpdateRecord(false);
							}}
						>
							<CloseIcon sx={{ fontSize: '2rem' }} />
						</IconButton>
					</div>

					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={`${styles.flexCenter} pt-4`}>
							{formData && (
								<div className={`${styles.flexCenter} px-4 pt-4`}>
									<img
										src={imageURL ? imageURL : ''}
										alt='receipt image'
										className='max-h-80'
									/>
									<input
										type='hidden'
										value={'imageURL'}
										{...register('imageURL')}
									/>
								</div>
							)}
						</div>
						<div className='grid grid-cols-2 min-w-max'>
							<div className={`${styles.formInputPos}`}>
								<label htmlFor='merchant'>Merchant name:</label>
								<div className='relative mt-2'>
									<span className={`${styles.formIcon}`}>
										<FaStore className='h-5 w-5 text-gray-500' />
									</span>
									<input
										type='text'
										placeholder='Name'
										{...register('merchant', { required: true })}
										style={{ color: '#333' }}
										className={`${styles.formInput}`}
									/>
								</div>
								{errors.merchant && (
									<p style={{ color: colors.greenAccent[300] }}>
										Merchant name is required
									</p>
								)}
							</div>
							<div className={`${styles.formInputPos}`}>
								<label>Date:</label>
								<div className='relative mt-2'>
									<span className={`${styles.formIcon}`}>
										<BsCalendar className='h-5 w-5 text-gray-500' />
									</span>
									<input
										type='date'
										{...register('date', { required: true })}
										style={{ color: '#333' }}
										className={`${styles.formInput}`}
									/>
								</div>
								{errors.date && (
									<p style={{ color: colors.greenAccent[300] }}>
										Date is required
									</p>
								)}
								{date && isFutureDate(date) && (
									<p style={{ color: colors.greenAccent[300] }}>
										Date cannot be in the future
									</p>
								)}
							</div>
							<div className={`${styles.formInputPos}`}>
								<label>Category:</label>
								<div className='relative mt-2'>
									<span className={`${styles.formIcon}`}>
										<BsList className='h-5 w-5 text-gray-500' />
									</span>
									<select
										{...register('category', { required: true })}
										style={{ color: '#333' }}
										className={`${styles.formInput}`}
									>
										{categories.map((category) => (
											<option key={category} value={category}>
												{category}
											</option>
										))}
									</select>
								</div>
								{errors.category && (
									<p style={{ color: colors.greenAccent[300] }}>
										Category is required
									</p>
								)}
							</div>
							<div className={`${styles.formInputPos}`}>
								<label>Payment method:</label>
								<div className='relative mt-2'>
									<span className={`${styles.formIcon}`}>
										<FaCreditCard className='h-5 w-5 text-gray-500' />
									</span>
									<select
										{...register('paymentMethod')}
										style={{ color: '#333' }}
										className={`${styles.formInput}`}
									>
										<option value='Cash'>Cash</option>
										<option value='Credit Card'>Credit Card</option>
										<option value='Debit Card'>Debit Card</option>
										<option value='Check'>Check</option>
										<option value='Other'>Other</option>
									</select>
								</div>
							</div>
							<div className={`${styles.formInputPos} `}>
								<label>Total amount:</label>
								<div className='relative mt-2'>
									<span className={`${styles.formIcon}`}>
										<FaMoneyBillAlt className='h-5 w-5 text-gray-500' />
									</span>
									<input
										type='number'
										placeholder='$34.87'
										step='0.01'
										{...register('amount', { required: true })}
										style={{ color: '#333' }}
										className={`${styles.formInput}`}
									/>
								</div>
								{errors.amount && (
									<p style={{ color: colors.greenAccent[300] }}>
										Total amount is required
									</p>
								)}
							</div>
							<div className={`${styles.formInputPos} row-span-2`}>
								<label>Items:</label>
								<div className='relative mt-2'>
									<span className={`${styles.formIcon}`}>
										<FaShoppingCart className='h-5 w-5 text-gray-500' />
									</span>
									<textarea
										rows='8'
										type='text'
										placeholder='e.g. Onions, Potatoes, Garlic, Bananas'
										{...register('items', { validate: validateItems })}
										style={{ color: '#333' }}
										className={`${styles.formInput}`}
									/>
								</div>
								{errors.items && (
									<p style={{ color: colors.greenAccent[300] }}>
										{errors.items.message}
									</p>
								)}
							</div>
							<div className={`${styles.formInputPos}`}>
								<label>Description:</label>
								<div className='relative mt-2'>
									<span className={`${styles.formIcon}`}>
										<RiFileTextLine className='h-5 w-5 text-gray-500' />
									</span>
									<textarea
										rows='3'
										type='number'
										placeholder='e.g. Grocery shopping'
										{...register('description')}
										style={{ color: '#333' }}
										className={`${styles.formInput}`}
									/>
								</div>
							</div>
						</div>
						<div className={`${styles.flexCenter}`}>
							<Button
								type='submit'
								variant='contained'
								size='large'
								style={{
									backgroundColor: colors.orangeAccent[400],
								}}
								sx={{
									color: colors.primary[100],
									m: '2rem 0 0 0',
								}}
							>
								{action}
							</Button>
						</div>
					</form>
				</Box>
			</Box>
		</>
	);
};

export default ReceiptForm;
