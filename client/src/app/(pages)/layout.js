import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script';
import PageProvider from "./page";
import dynamic from "next/dynamic";
import { HeaderPage, MobileBottomNav } from "../UI/Header";
import Footer from "../Footer";
import { Toaster } from "react-hot-toast";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Joyvinco",
  description: "Joyvinco your one in one detergent dealer solution for all your cleaning needs.",
};

const CookieConsentWrapper = dynamic(
  () => import('../UI/CookieConsentWrapper')
);


export default function PageLayout({ children }) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_MEASUREMENT_ID" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YOUR_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          
        <main className="relative z-0">
          <PageProvider>

            <HeaderPage />
            <div className="">
    
              <Script type="text/javascript">
                {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/6862754f47ce5c1911cb02ca/1iv0ded7u';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
                })();`}
              </Script>
            </div>
            {children}
            <MobileBottomNav />
            <Footer />
          </PageProvider>
        </main>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              zIndex: 99999, // So it stays above navbar etc
            },
          }}
        />

        <CookieConsentWrapper/>

      </body>
    </html>
  );
}