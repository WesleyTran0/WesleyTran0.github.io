import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata: Metadata = {
	title: 'Wesley Tran',
	description: "Wesley's personal portfolio"
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className="min-h-screen bg-background text-secondary font-sans antialiased leading-relaxed text-lg">
				<Navbar />
				<div className="flex flex-col justify-center max-w-280 mx-auto items-center px-6 py-5 gap-4">
					{children}
				</div>
			</body>
		</html>
	);
}
