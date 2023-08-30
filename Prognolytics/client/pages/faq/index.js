import DashboardLayout from '@/components/layout/DashboardLayout';
import Header from '@/components/layout/Header';
import { tokens } from '@/styles/theme';
import { useTheme } from '@emotion/react';
import { ExpandMore } from '@mui/icons-material';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Typography,
} from '@mui/material';

const questions = [
	{
		question: 'How secure is my personal and financial information?',
		answer:
			'Your security is our top priority. We use industry-standard encryption methods and secure servers to protect your data. We never share your information with unauthorized third parties.',
	},
	{
		question: 'What devices are compatible with the app?',
		answer:
			'Our web application is compatible with most devices, including smartphones, tablets, and computers. We recommend using the latest version of your preferred web browser for the best user experience.',
	},
	{
		question: 'How do I upgrade to a higher plan?',
		answer:
			'Upgrading your plan is simple. Just log in to your account, navigate to the "Plans & Pricing" section, and select the plan that best suits your needs. Your new plan will take effect immediately.',
	},
	{
		question: 'Can I cancel my subscription at any time?',
		answer:
			'Yes, you can cancel your subscription at any time. We offer a hassle-free cancellation process, and there are no cancellation fees. Your account will revert to the Basic Plan upon cancellation.',
	},
	{
		question: 'Is the app available in languages other than English?',
		answer:
			'Currently, our app is only available in English. However, we plan to expand our language support in the future to accommodate users worldwide.',
	},
	{
		question: 'Who can I contact for support or assistance?',
		answer:
			'If you have any questions or need assistance, you can reach our customer support team by using the "Contact Us" form on our website or sending an email to support@example.com. Our team is committed to providing prompt and helpful assistance.',
	},
];

const FAQ = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<>
			<DashboardLayout>
				<Box m='10px 20px'>
					<Box
						display='flex'
						justifyContent='space-between'
						alignItems='center'
					>
						<Header title='FAQ' subtitle='Frequently Asked Questions Page' />
					</Box>
					<Box m='20px 0 0 0' height='80vh' sx={{ overflow: 'auto' }}>
						{questions.map((q) => {
							return (
								<>
									<Accordion>
										<AccordionSummary expandIcon={<ExpandMore />}>
											<Typography color={colors.greenAccent[300]} variant='h5'>
												{q.question}
											</Typography>
										</AccordionSummary>
										<AccordionDetails>
											<Typography>{q.answer}</Typography>
										</AccordionDetails>
									</Accordion>
								</>
							);
						})}
					</Box>
				</Box>
			</DashboardLayout>
		</>
	);
};

export default FAQ;
