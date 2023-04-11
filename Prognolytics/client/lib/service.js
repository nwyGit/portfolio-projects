import axios from 'axios';
import { getToken } from './authenticate';

// Create a record
export const createRecord = async (data) => {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/receipts`,
			data,
			{
				headers: {
					Authorization: `JWT ${getToken()}`,
					'Content-Type': 'application/json',
				},
			}
		);
		return response.data.message;
	} catch (err) {
		return err;
	}
};

// Get records
export const getRecords = async () => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/receipts`,
			{
				headers: {
					Authorization: `JWT ${getToken()}`,
					'Content-Type': 'application/json',
				},
			}
		);
		return response.data;
	} catch (err) {
		return err;
	}
};

// Update a record
export const updateRecord = async (data) => {
	try {
		const response = await axios.put(
			`${process.env.NEXT_PUBLIC_API_URL}/receipts/${data._id}`,
			data,
			{
				headers: {
					Authorization: `JWT ${getToken()}`,
					'Content-Type': 'application/json',
				},
			}
		);
		return response.data.message;
	} catch (err) {
		return err;
	}
};

// Delete record(s)
export const deleteRecords = async (IDs) => {
	if (IDs.length > 0) {
		try {
			const response = await axios.delete(
				`${process.env.NEXT_PUBLIC_API_URL}/receipts`,
				{
					headers: {
						Authorization: `JWT ${getToken()}`,
						'Content-Type': 'application/json',
					},
					data: { IDs },
				}
			);
			return response.data.message;
		} catch (err) {
			return err;
		}
	}
};
