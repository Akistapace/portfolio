import type { Metadata } from "next";
import localFont from "next/font/local";

// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
import 'swiper/swiper-bundle.css';
import { Header } from "./components/Header";
import "./globals.css";

// const fontAbril = localFont({
//   src: "./fonts/AbrilFatface-Regular.ttf",
//   variable: "--font-abril",
//   weight: "100 700 900",
//   display: "swap"
// });

const fontMontSerratUnderline = localFont({
  src: "./fonts/MontserratUnderline-Regular.ttf",
  variable: "--font-abril",
  weight: "100 700 900",
  display: "swap"
});


export const metadata: Metadata = {
  title: "Fernando Aquistapace",
  description: "Web Performance Specialist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={fontMontSerratUnderline.variable}>
      <body >
        <Header />
        {children}
      </body>
    </html>
  );
}
