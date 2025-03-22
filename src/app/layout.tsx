import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout"; // Importamos un Wrapper del lado del cliente

export const metadata: Metadata = {
  title: "Por Fin Dormimos",
  description: "Asesoría de sueño infantil",
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
      </body>
    </html>
  );
}