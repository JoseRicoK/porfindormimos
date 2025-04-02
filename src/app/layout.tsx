import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout"; // Importamos un Wrapper del lado del cliente
import { SpeedInsights } from "@vercel/speed-insights/next"

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
      {/* 
        Using suppressHydrationWarning will prevent hydration mismatches 
        caused by browser extensions that add class names after page loads
      */}
      <body className="min-h-screen relative bg-white text-gray-800" suppressHydrationWarning={true}>
        <ClientLayout>{children}</ClientLayout>
        <SpeedInsights />
      </body>
    </html>
  );
}