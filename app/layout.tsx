
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
      {/* <head>
        <style>{`
          .loader {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            max-width: 6rem;
            margin: 3rem auto;
          }

          .loader:before,
          .loader:after {
            content: "";
            position: absolute;
            border-radius: 50%;
            animation: pulsOut 1.8s ease-in-out infinite;
            filter: drop-shadow(0 0 1rem rgba(255, 255, 255, 0.75));
          }

          .loader:before {
            width: 100%;
            padding-bottom: 100%;
            box-shadow: inset 0 0 0 1rem #fff;
            animation-name: pulsIn;
          }

          .loader:after {
            width: calc(100% - 2rem);
            padding-bottom: calc(100% - 2rem);
            box-shadow: 0 0 0 0 #fff;
          }

          @keyframes pulsIn {
            0% {
              box-shadow: inset 0 0 0 1rem #fff;
              opacity: 1;
            }
            50%, 100% {
              box-shadow: inset 0 0 0 0 #fff;
              opacity: 0;
            }
          }

          @keyframes pulsOut {
            0%, 50% {
              box-shadow: 0 0 0 0 #fff;
              opacity: 0;
            }
            100% {
              box-shadow: 0 0 0 1rem #fff;
              opacity: 1;
            }
          }
        `}</style>
      </head> */}

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
