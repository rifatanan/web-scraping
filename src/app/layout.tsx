import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

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
			className='lg:px-[200px]'
		>
			<Nav />
			{children}
		</body>
		</html>
	);
}
