import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono"
});

const RobotoRegular = localFont({
	src: "./fonts/Roboto-Regular.woff",
	variable: "--font-roboto"
});

export const metadata: Metadata = {
	title: "Web Scrapping",
	description: "For Learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${RobotoRegular.variable } antialiased lg:px-[200px]`}
      >
		<Nav />
        {children}
      </body>
    </html>
  );
}
