import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
import { signIn } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';
import FormInputText from '../form-components/FormInputText';
import FormInputPassword from '../form-components/FormInputPassword';
import AlertMessage from '../image-components/AlertMessage';
import { authenticateUser } from '@/lib/authenticate';
import { tokens } from '@/styles/theme';
import styles from '@/styles';
import BackgroundImage from '../image-components/BackgroundImage';

const LoginForm = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [resMsg, setResMsg] = useState('');
	const [warning, setWarning] = useState('');
	const router = useRouter();

	const reactHookFormMethods = useForm();
	const { handleSubmit } = reactHookFormMethods;

	const onSubmit = async (data) => {
		try {
			const msg = await authenticateUser(data);
			setResMsg(msg);
			setTimeout(() => {
				router.push('/dashboard');
			}, 2000);
		} catch (err) {
			setWarning(err.message);
		}
	};

	return (
		<>
			<Box sx={{ zIndex: 5 }} className={`${styles.elementCenter}`}>
				<Card className={`${styles.logRegForm} rounded-xl`}>
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
								Welcome to Prognolytics! 👋🏻
							</Typography>
							<Typography sx={{ color: colors.primary[600] }}>
								Please sign-in to your account and monitor your financial goals.
							</Typography>
						</Box>
						<FormProvider {...reactHookFormMethods}>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className='space-y-4 min-w-[24rem] min-h-[18rem]'
							>
								<FormInputText name='email' label='Email Address' />
								<FormInputPassword name='password' label='Password' />
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
									<Typography
										sx={{ marginRight: 2, color: colors.primary[600] }}
									>
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
									<Link href='' passHref legacyBehavior>
										<IconButton component='a' onClick={() => signIn('github')}>
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
			<BackgroundImage ImageUrl='/formBackground.png' alt='login background'/>
			{resMsg && <AlertMessage resMsg={resMsg} type='success' />}
			{warning && <AlertMessage resMsg={warning} type='error' />}
		</>
	);
};

export default LoginForm;
