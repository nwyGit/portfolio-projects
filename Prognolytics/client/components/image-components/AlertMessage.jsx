import { Alert, Typography } from '@mui/material';
import React from 'react';

const AlertMessage = ({ resMsg, type }) => {
	return (
		<>
			<Alert severity={type} className={`absolute top-0 left-0 w-full z-10`}>
				<Typography variant='h6' sx={{ fontWeight: 600 }}>
					{resMsg}
				</Typography>
			</Alert>
		</>
	);
};

export default AlertMessage;
