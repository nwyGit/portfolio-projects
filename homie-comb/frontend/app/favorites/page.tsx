import ClientOnly from "@/app/components/ClientOnly";

import FavoritesClient from "./FavoritesClient";

const favoritesPage = async () => {
  return (
    <ClientOnly>
      <FavoritesClient />
    </ClientOnly>
  );
};

export default favoritesPage;
