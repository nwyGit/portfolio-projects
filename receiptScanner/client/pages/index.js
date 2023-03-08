import Head from 'next/head';
import axios from 'axios';
import { useState } from 'react';
import Dropzone from 'react-dropzone';

function Home() {
	const [receiptData, setReceiptData] = useState(null);

	const handleDrop = async (acceptedFiles) => {
		const formData = new FormData();
		formData.append('receipt', acceptedFiles[0]);

		try {
			const response = await axios.post(
				'http://localhost:3000/api/receipt',
				formData
			);
			console.log('test');
			setReceiptData(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Head>
				<title>Receipt Scanner</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				{' '}
				<div className='flex flex-col items-center justify-center min-h-screen'>
					<h1 className='text-4xl font-bold mb-8'>Receipt Recognizer</h1>
					<Dropzone onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}>
						{({ getRootProps, getInputProps }) => (
							<section className='p-8 border-dashed border-2'>
								<div {...getRootProps()}>
									<input {...getInputProps()} />
									<p>Drag 'n' drop some files here, or click to select files</p>
								</div>
							</section>
						)}
					</Dropzone>
					{receiptData && (
						<div className='mt-8'>
							<h2 className='text-2xl font-bold mb-4'>Receipt Data:</h2>
							<p>{receiptData}</p>
						</div>
					)}
				</div>
			</main>
		</>
	);
}

export default Home;
