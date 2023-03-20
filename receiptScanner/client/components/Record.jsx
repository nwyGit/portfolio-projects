import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../styles/theme';
import { mockDataRecord } from '../data/record';
import { AddBoxRounded } from '@mui/icons-material';
import Header from './Header';

const Record = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const columns = Object.keys(mockDataRecord[2])
		.filter((key) => {
			return key !== 'items' && key !== 'imageURL' ? true : false;
		})
		.map((key) => {
			const obj = {
				field: key,
				headerName: key.charAt(0).toUpperCase() + key.slice(1),
				flex: 1,
				cellClassName: 'name-column--cell',
			};
			if (key === 'merchant') {
				obj.flex = 2;
				return obj;
			} else if (key === 'description') {
				obj.flex = 3;
				return obj;
			} else if (key === 'amount') {
				obj.headerAlign = 'right';
				obj.align = 'right';
				return obj;
			} else {
				return obj;
			}
		});

	function getRowId(row) {
		return row.merchant + row.date;
	}

	return (
		<>
			<Box display='flex' justifyContent='space-between' alignItems='center'>
				<Header
					title='Expense records'
					subtitle='Managing your expense records'
				/>
				<Button variant='filled' endIcon={<AddBoxRounded />}>
					Add a record
					<input hidden accept='image/*' multiple type='file' />
				</Button>
			</Box>

			<Box
				m='40px 0 0 0'
				height='75vh'
				sx={{
					'& .MuiDataGrid-root': { border: 'none' },
					'& .MuiDataGrid-cell': { borderBottom: 'none' },
					'& .name-column--cell': { color: colors.greenAccent[300] },
					'& .MuiDataGrid-columnHeaderTitle': {
						fontWeight: 'bold',
					},
				}}
			>
				<DataGrid rows={mockDataRecord} columns={columns} getRowId={getRowId} />
			</Box>
		</>
	);
};

export default Record;
