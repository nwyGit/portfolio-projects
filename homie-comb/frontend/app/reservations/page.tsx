import ClientOnly from "@/app/components/ClientOnly";

import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
	return (
		<ClientOnly>
			<ReservationsClient />
		</ClientOnly>
	);
};

export default ReservationsPage;
