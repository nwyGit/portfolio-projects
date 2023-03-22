import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
	Box,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Typography,
	useTheme,
} from '@mui/material';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { tokens } from '@/styles/theme';

const FormInputPassword = ({ name, label }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [value, setValue] = useState('');

	const { control } = useFormContext();

	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<>
			<Controller
				name={name}
				control={control}
				rules={{ required: true }}
				render={({ fieldState: { error } }) => (
					<>
						<Box>
							<FormControl fullWidth>
								<InputLabel>{label}</InputLabel>
								<OutlinedInput
									label={label}
									value={value}
									onChange={(e) => setValue(e.target.value)}
									error={!!error}
									type={showPassword ? 'text' : 'password'}
									endAdornment={
										<InputAdornment position='end'>
											<IconButton
												edge='end'
												onClick={handleClickShowPassword}
												aria-label='toggle password visibility'
											>
												{showPassword ? (
													<VisibilityOutlined fontSize='small' />
												) : (
													<VisibilityOffOutlined fontSize='small' />
												)}
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
							{error && (
								<Typography style={{ color: colors.redAccent[500] }}>
									{label} is required
								</Typography>
							)}
						</Box>
					</>
				)}
			></Controller>
		</>
	);
};

export default FormInputPassword;
