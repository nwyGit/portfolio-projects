import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import {
	FaCreditCard,
	FaMoneyBillAlt,
	FaPlus,
	FaShoppingCart,
	FaStore,
} from 'react-icons/fa';
import { BsCalendar, BsList } from 'react-icons/bs';
import { RiFileTextLine } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import styles from '@/styles';

const ReceiptForm = ({ receiptData }) => {
	const [formData, setFormData] = useState(null);

	const categories = [
		'Food and Dining',
		'Transportation',
		'Housing and Utilities',
		'Entertainment and Leisure',
		'Shopping',
		'Health and Wellness',
		'Personal Care and Beauty',
		'Travel and Vacation',
		'Education and Learning',
		'Technology and Electronics',
		'Gifts and Donations',
		'Home and Garden',
		'Finances and Fees',
		'Other',
	];

	const {
		register,
		setValue,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: receiptData });

	useEffect(() => {
		setFormData(receiptData);
		if (formData) {
			Object.keys(formData).forEach((key) => {
				setValue(key, formData[key]);
			});
		}
	}, [receiptData, formData, setValue]);

	const date = watch('date');
  
	const onSubmit = async (data) => {
		try {
			const response = await axios.post(
				'http://localhost:3000/api/receipts',
				data
			);
			return response.data;
		} catch (err) {
			throw new Error('Failed to create receipt.');
		}
	};

	const isFutureDate = (dateString) => {
		const currentDate = new Date();
		const inputDate = new Date(dateString);
		return inputDate > currentDate;
	};

	const validateItems = (value) => {
		const items = value.split(',');
		const trimmedItems = items.map((item) => item.trim());
		const isValid = trimmedItems.every(
			(item) => item.length > 0 && typeof item === 'string'
		);
		return isValid || 'Please enter a comma-separated list of items';
	};

	return (
		<>
			<div className={`${styles.form} ${styles.formPaddings}`}>
				<h1 className={`${styles.flexCenter} text-2xl font-bold my-4`}>
					Receipt Details
				</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='px-4 pt-4'>
						<Image
							src='/1.jpeg'
							alt='receipt image'
							width='512'
							height='512'
							className='w-full max-h-[30%] hover:overflow-scroll'
						/>
						<input type='hidden' value={'imageURL'} {...register('imageURL')} />
					</div>
					<div className='grid grid-cols-2'>
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
									className={`${styles.formInput}`}
								/>
							</div>
							{errors.merchant && <p>Merchant name is required</p>}
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
									className={`${styles.formInput}`}
								/>
							</div>
							{errors.date && <p>Date is required</p>}
							{date && isFutureDate(date) && (
								<p>Date cannot be in the future</p>
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
									className={`${styles.formInput}`}
								>
									<option value=''>Select a category</option>
									{categories.map((category) => (
										<option key={category} value={category}>
											{category}
										</option>
									))}
								</select>
							</div>
							{errors.category && <p>Category is required</p>}
						</div>
						<div className={`${styles.formInputPos}`}>
							<label>Payment method:</label>
							<div className='relative mt-2'>
								<span className={`${styles.formIcon}`}>
									<FaCreditCard className='h-5 w-5 text-gray-500' />
								</span>
								<select
									{...register('paymentMethod')}
									className={`${styles.formInput}`}
								>
									<option value=''>Select a method</option>
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
									className={`${styles.formInput}`}
								/>
							</div>
							{errors.amount && <p>Total amount is required</p>}
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
									value={formData?.items.join(', ')}
									{...register('items', { validate: validateItems })}
									className={`${styles.formInput}`}
								/>
							</div>
							{errors.items && <p>{errors.items.message}</p>}
						</div>
						<div className={`${styles.formInputPos} mt-8`}>
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
									className={`${styles.formInput}`}
								/>
							</div>
						</div>
					</div>
					<div className={`${styles.flexCenter} px-4 pt-4`}>
						<button
							type='submit'
							className={`${styles.button} px-6 py-2 w-full`}
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default ReceiptForm;
