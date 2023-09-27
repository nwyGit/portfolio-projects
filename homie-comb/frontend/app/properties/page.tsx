import ClientOnly from "@/app/components/ClientOnly";

import PropertyClient from "./PropertiesClient";

const PropertiesPage = async () => {
  return (
    <ClientOnly>
      <PropertyClient />
    </ClientOnly>
  );
};

export default PropertiesPage;
