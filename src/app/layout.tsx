import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Auth from "@/components/Auth";
import ProviderRedux from "@/libs/reduxStore/Provider";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Freelancer | Save and Secure",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = cookies();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderRedux>
          <Auth />
          <Header initialUser={{
            full_name: cookieStore.get('full_name')?.value,
            avatar: cookieStore.get('avatar')?.value,
          }} />
          {children}
          <Footer />
        </ProviderRedux>
      </body>
    </html>
  );
}
