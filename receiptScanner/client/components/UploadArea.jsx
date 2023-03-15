import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import styles from '@/styles';

const UploadArea = ({ onUploadComplete }) => {
	const [isLoading, setIsLoading] = useState(false);

	const handleDrop = async (acceptedFiles) => {
		setIsLoading(true);
		const formData = new FormData();
		formData.append('receipt', acceptedFiles[0]);

		try {
			const response = await axios.post(
				'http://localhost:3000/api/receipt-scanner',
				formData
			);
			onUploadComplete(response.data);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={`${styles.flexCenter} ${styles.form}`}>
			<h1 className='text-4xl font-bold mb-8'>Receipt Scanner</h1>
			<Dropzone onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}>
				{({ getRootProps, getInputProps }) => (
					<section className='p-8 rounded-lg border-dashed border-2 hover:cursor-pointer'>
						<div {...getRootProps()}>
							<input {...getInputProps()} />
							<p>Drag & Drop a receipt here, or Click to select one</p>
						</div>
					</section>
				)}
			</Dropzone>
			{isLoading && <div>Loading...</div>}
		</div>
	);
};

export default UploadArea;
