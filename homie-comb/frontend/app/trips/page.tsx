import ClientOnly from "@/app/components/ClientOnly";

import TripsClient from "./TripsClient";

const TripsPage = async () => {
  return (
    <ClientOnly>
      <TripsClient />
    </ClientOnly>
  );
};

export default TripsPage;
