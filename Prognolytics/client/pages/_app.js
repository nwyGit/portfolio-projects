import Head from 'next/head';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from '../styles/theme';
import '@/styles/globals.css';
import RouteGuard from '@/components/RouteGuard';

export default function App({ Component, pageProps }) {
	const [theme, colorMode] = useMode();

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<RouteGuard>
					<CssBaseline />
					<Head>
						<title>Prognolytics</title>
						<meta
							name='viewport'
							content='width=device-width, initial-scale=1'
						/>
						<link rel='icon' href='/favicon.ico' />
					</Head>
					<Component {...pageProps} />
				</RouteGuard>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}
