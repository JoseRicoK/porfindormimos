import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Servicios de Asesoría de Sueño Infantil | Por Fin Dormimos",
  description: "Descubre nuestros servicios de asesoría de sueño infantil personalizados: planes básicos, seguimiento continuo y planes para hermanos. Mejora el descanso de toda la familia.",
  keywords: "servicios sueño infantil, plan de sueño bebé, asesoría sueño profesional, seguimiento sueño bebé, plan hermanos sueño, consultoría descanso infantil",
  robots: "index, follow",
  openGraph: {
    title: "Servicios de Asesoría de Sueño Infantil | Por Fin Dormimos",
    description: "Planes personalizados para mejorar el sueño de tu bebé con seguimiento profesional. Transforma las noches de tu familia con nuestros servicios.",
    url: "https://porfindormimos.es/servicios",
    type: "website",
    images: [
      {
        url: "https://porfindormimos.es/og-image-home.jpg",
        width: 1200,
        height: 630,
        alt: "Servicios de Asesoría de Sueño Infantil - Por Fin Dormimos"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios de Asesoría de Sueño Infantil | Por Fin Dormimos",
    description: "Planes personalizados de sueño infantil con seguimiento profesional.",
    images: ["https://porfindormimos.es/og-image-home.jpg"],
  },
  alternates: {
    canonical: "https://porfindormimos.es/servicios",
  },
};

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
