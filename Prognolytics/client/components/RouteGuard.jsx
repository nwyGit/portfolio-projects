import { isAuthenticated } from '@/lib/authenticate';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PUBLIC_PATHS = ['/login', '/register', '/', '/_error'];

const RouteGuard = ({ children, pageProps }) => {
	const [authorized, setAuthorized] = useState(false);
	const router = useRouter();

	useEffect(() => {
		authCheck(router.pathname);
		router.events.on('routeChangeComplete', authCheck);
		return () => {
			router.events.off('routeChangeComplete', authCheck);
		};
	}, []);

	const authCheck = (url) => {
		const path = url.split('?')[0];
		if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
			setAuthorized(false);
			router.push('/login');
		} else {
			setAuthorized(true);
		}
	};

	return <>{authorized && children}</>;
};

export default RouteGuard;
