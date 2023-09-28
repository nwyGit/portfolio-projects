"use client";

import RegisterModal from "./components/modals/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";

import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import ClientOnly from "./components/ClientOnly";
import { ReduxProvider } from "./redux/ReduxProvider";
import ListingModal from "./components/modals/ListingModal";
import SearchModal from "./components/modals/SearchModal";

const font = Nunito({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={font.className}>
        <ReduxProvider>
          <ClientOnly>
            <ToasterProvider />
            <RegisterModal />
            <LoginModal />
            <ListingModal />
            <SearchModal />
            <Navbar />
          </ClientOnly>
          <div className="pb-20 pt-28">{children}</div>
        </ReduxProvider>
      </body>
    </html>
  );
}
