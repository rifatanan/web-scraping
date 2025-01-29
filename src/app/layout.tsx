export const dynamic = 'force-static'; // This ensures the layout runs only on the server

import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
	title: "Web Scrapping",
	description: "For Learning",
};

export default async function RootLayout({
	children,
	}: Readonly<{
	children: React.ReactNode;
	}>)
	{
		const callCornJob = await fetch('http://localhost:3000/api/start-cron/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

	return (
		<html lang="en">
			<body className='lg:px-[200px]'>
				<Nav />
				{children}
			</body>
		</html>
	);
}
