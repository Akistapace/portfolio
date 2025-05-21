import type { Metadata } from 'next'
import localFont from 'next/font/local'
import 'swiper/swiper-bundle.css'
import { CustomCursor } from './components/CustomCursor'
import { Header } from './components/Header'
import './globals.css'

const fontMontSerratUnderline = localFont({
	src: './fonts/MontserratUnderline-Regular.ttf',
	variable: '--font-abril',
	weight: '100 700 900',
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'Fernando Aquistapace',
	description: 'Frontend | Web Performance Specialist',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className={fontMontSerratUnderline.variable}>
			<body style={{ overflowY: 'hidden' }}>
				<CustomCursor />
				<Header />
				{children}
			</body>
		</html>
	)
}
