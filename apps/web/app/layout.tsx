import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ReactNode } from 'react';
import ProvidersTree from '@/components/providers/ProvidersTree';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
});

const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
});

export const metadata: Metadata = {
	title: 'Task manager',
	description:
		'Task management application that helps you organize and manage your tasks efficiently.',
};

const RootLayout = ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => (
	<html lang='en'>
		<body
			className={`${geistSans.variable} ${geistMono.variable} flex min-h-dvh flex-col antialiased`}>
			<ProvidersTree>
				<Header />
				<main className='container mx-auto flex grow flex-col items-center justify-center border-dashed p-2 sm:border-x lg:p-4'>
					{children}
				</main>
				<Footer />
				<Toaster position='top-center' richColors />
			</ProvidersTree>
		</body>
	</html>
);

export default RootLayout;
