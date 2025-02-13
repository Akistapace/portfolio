
import type { Metadata } from "next";
import localFont from "next/font/local";
import AnimatedCursor from "react-animated-cursor";
import 'swiper/swiper-bundle.css';
import { Header } from "./components/Header";
import "./globals.css";

const fontMontSerratUnderline = localFont({
  src: "./fonts/MontserratUnderline-Regular.ttf",
  variable: "--font-abril",
  weight: "100 700 900",
  display: "swap"
});


export const metadata: Metadata = {
  title: "Fernando Aquistapace",
  description: "Frontend | Web Performance Specialist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={fontMontSerratUnderline.variable}>
      {/* <Head>
        <link rel="stylesheet" href="https://unpkg.com/lenis@1.1.20/dist/lenis.css" />
      </Head> */}
      <AnimatedCursor
        clickables={['a', 'input', 'texarea', 'button', 'select']}
        color="#fff"
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={1.7}
        outerAlpha={0}
        outerStyle={{
          width: '60px',
          height: '60px',
          background: '#fff',
          mixBlendMode: 'exclusion'
        }}
        innerStyle={{
          background: '#fff',
          mixBlendMode: 'exclusion'
        }}
      />
      <body >
        <Header />
        {children}
      </body>
    </html>
  );
}
