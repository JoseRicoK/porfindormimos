import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout"; // Importamos un Wrapper del lado del cliente
import Script from "next/script";

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "Por Fin Dormimos",
  description: "Asesoría de sueño infantil",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  appleWebApp: {
    capable: true,
    title: "Por Fin Dormimos",
    statusBarStyle: "default",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Google Analytics - Direct implementation for verification */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-DGNS34JZVX" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DGNS34JZVX');
          `}
        </Script>
      </head>
      {/* 
        Using suppressHydrationWarning will prevent hydration mismatches 
        caused by browser extensions that add class names after page loads
      */}
      <body className="min-h-screen relative bg-white text-gray-800" suppressHydrationWarning={true}>
        <ClientLayout>{children}</ClientLayout>
        <SpeedInsights />
        <Analytics />
        <Script src="https://cdn.jsdelivr.net/npm/tarteaucitronjs@1.21.0/tarteaucitron.min.js" strategy="afterInteractive" />
        <Script id="tarteaucitron-init" strategy="afterInteractive">
          {`
            tarteaucitron.init({
              "privacyUrl": "",
              "orientation": "bottom",
              "showIcon": true,
              "iconPosition": "BottomRight",
              "DenyAllCta": true,
              "AcceptAllCta": true,
              "highPrivacy": true,
              "mandatory": true,
              "googleConsentMode": true
            });

            tarteaucitron.user.gtagUa = 'G-DGNS34JZVX';
            tarteaucitron.user.gtagMore = function () { /* add here your optional gtag() */ };
            (tarteaucitron.job = tarteaucitron.job || []).push('gtag');
          `}
        </Script>
      </body>
    </html>
  );
}