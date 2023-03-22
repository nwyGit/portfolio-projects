import React from 'react';
import Link from 'next/link';
import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	IconButton,
	Typography,
	useTheme,
} from '@mui/material';
import { Facebook, GitHub, Google, Twitter } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import FormInputText from '../form-components/FormInputText';
import FormInputPassword from '../form-components/FormInputPassword';
import { tokens } from '@/styles/theme';
import styles from '@/styles';

const LoginForm = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const { handleSubmit, control } = useForm();

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<>
			<Box className={`${styles.formCenter}`}>
				<Card className={`${styles.logRegForm} z-5 rounded-xl`}>
					<CardContent
						sx={{
							'& label.Mui-focused': {
								color: `${colors.greenAccent[400]}`,
							},
							'& .MuiOutlinedInput-root': {
								borderRadius: '8px',
								'&:hover fieldset': {
									borderColor: `${colors.primary[400]}`,
								},
								'&.Mui-focused fieldset': {
									borderColor: `${colors.greenAccent[400]}`,
								},
							},
						}}
						className={`${styles.logRegForm}  overflow-hidden hover:overflow-auto overscroll-contain`}
					>
						<Box sx={{ mb: 2 }}>
							<Typography
								variant='h3'
								sx={{ fontWeight: 600, marginBottom: 1.5 }}
							>
								Welcome to FinScope! 👋🏻
							</Typography>
							<Typography sx={{ color: colors.primary[600] }}>
								Please sign-in to your account and monitor your financial goals.
							</Typography>
						</Box>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='space-y-4 min-w-[24rem] min-h-[18rem]'
						>
							<FormInputText
								name='email'
								label='Email Address'
								control={control}
							/>
							<FormInputPassword
								name='password'
								label='Password'
								control={control}
							/>
							<Button
								size='large'
								fullWidth
								variant='contained'
								onClick={handleSubmit(onSubmit)}
								style={{ backgroundColor: colors.primary[700] }}
								sx={{
									color: colors.primary[100],
								}}
							>
								Login
							</Button>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									flexWrap: 'wrap',
									justifyContent: 'center',
								}}
							>
								<Typography sx={{ marginRight: 2, color: colors.primary[600] }}>
									Just getting started?
								</Typography>
								<Typography sx={{ color: colors.greenAccent[400] }}>
									<Link passHref href='/register'>
										Create an account
									</Link>
								</Typography>
							</Box>
							<Divider sx={{ my: 5 }}>or</Divider>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Link href='/' passHref legacyBehavior>
									<IconButton component='a' onClick={(e) => e.preventDefault()}>
										<Facebook sx={{ color: '#497ce2' }} />
									</IconButton>
								</Link>
								<Link href='/' passHref legacyBehavior>
									<IconButton component='a' onClick={(e) => e.preventDefault()}>
										<Twitter sx={{ color: '#1da1f2' }} />
									</IconButton>
								</Link>
								<Link href='/' passHref legacyBehavior>
									<IconButton component='a' onClick={(e) => e.preventDefault()}>
										<GitHub
											sx={{
												color: (theme) =>
													theme.palette.mode === 'light'
														? '#272727'
														: theme.palette.grey[300],
											}}
										/>
									</IconButton>
								</Link>
								<Link href='/' passHref legacyBehavior>
									<IconButton component='a' onClick={(e) => e.preventDefault()}>
										<Google sx={{ color: '#db4437' }} />
									</IconButton>
								</Link>
							</Box>
						</form>
					</CardContent>
				</Card>
			</Box>
		</>
	);
};

export default LoginForm;
