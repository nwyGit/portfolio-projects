import React, { useState } from 'react';
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
import {
	Controller,
	FormProvider,
	useForm,
	useFormContext,
} from 'react-hook-form';
import { tokens } from '@/styles/theme';
import styles from '@/styles';
import FormInputPassword from '../form-components/FormInputPassword';
import FormInputText from '../form-components/FormInputText';



const RegisterForm = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');

	const reactHookFormMethods = useForm();
	const { handleSubmit } = reactHookFormMethods;

	const onSubmit = async (data) => {
		console.log(data);
		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/users`,
				data
			);
			return response.data;
		} catch (err) {
			throw new Error('Failed to create receipt.');
		}
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
								Start your change today 💪
							</Typography>
							<Typography sx={{ color: colors.primary[600] }}>
								Managing your wealth has never been easier!
							</Typography>
						</Box>
						<FormProvider {...reactHookFormMethods}>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className='space-y-4 min-w-[24rem] min-h-[30rem]'
							>
								<Box
									sx={{
										display: 'grid',
										gridTemplateColumns: '1fr 1fr',
										gap: 2,
									}}
								>
									
									<FormInputText name='firstName' label='First Name' />
									<FormInputText name='lastName' label='Last Name' />
								</Box>
								<FormInputText name='username' label='Username' />
								<FormInputText name='email' label='Email Address' />
								<FormInputPassword name='password' label='Password' />
								<FormInputPassword name='password2' label='Confirm Password' />
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
									Sign Up
								</Button>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										flexWrap: 'wrap',
										justifyContent: 'center',
									}}
								>
									<Typography
										variant='p'
										sx={{ marginRight: 2, color: colors.primary[600] }}
									>
										Already have an account?
									</Typography>
									<Typography
										variant='p'
										sx={{ color: colors.greenAccent[400] }}
									>
										<Link passHref href='/login'>
											Sign in instead
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
										<IconButton
											component='a'
											onClick={(e) => e.preventDefault()}
										>
											<Facebook sx={{ color: '#497ce2' }} />
										</IconButton>
									</Link>
									<Link href='/' passHref legacyBehavior>
										<IconButton
											component='a'
											onClick={(e) => e.preventDefault()}
										>
											<Twitter sx={{ color: '#1da1f2' }} />
										</IconButton>
									</Link>
									<Link href='/' passHref legacyBehavior>
										<IconButton
											component='a'
											onClick={(e) => e.preventDefault()}
										>
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
										<IconButton
											component='a'
											onClick={(e) => e.preventDefault()}
										>
											<Google sx={{ color: '#db4437' }} />
										</IconButton>
									</Link>
								</Box>
							</form>
						</FormProvider>
					</CardContent>
				</Card>
			</Box>
		</>
	);
};

export default RegisterForm;
