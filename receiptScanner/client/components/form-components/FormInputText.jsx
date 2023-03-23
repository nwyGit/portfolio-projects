import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
	Box,
	FormControl,
	InputLabel,
	OutlinedInput,
	Typography,
	useTheme,
} from '@mui/material';
import { tokens } from '@/styles/theme';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const FormInputText = ({ name, label }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [value, setValue] = useState('');

	const { control } = useFormContext();

	const rules =
		name === 'email'
			? { required: true, pattern: emailRegex }
			: { required: true };
	const message =
		name === 'email' ? 'Invalid email address' : `${label} is required`;

	return (
		<>
			<Controller
				name={name}
				control={control}
				rules={rules}
				render={({ field: { onChange }, fieldState: { error } }) => (
					<>
						<Box>
							<FormControl fullWidth>
								<InputLabel>{label}</InputLabel>
								<OutlinedInput
									label={label}
									value={value}
									onChange={(e) => {
										setValue(e.target.value);
										onChange(e.target.value);
									}}
									error={!!error}
								/>
							</FormControl>
							{error && (
								<Typography style={{ color: colors.redAccent[500] }}>
									{message}
								</Typography>
							)}
						</Box>
					</>
				)}
			/>
		</>
	);
};

export default FormInputText;
