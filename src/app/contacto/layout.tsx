import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contacto | Por Fin Dormimos",
  description: "Contáctanos para resolver tus dudas sobre nuestros servicios de asesoría de sueño infantil. Agenda una consulta gratuita y comienza a mejorar el descanso de tu familia.",
  keywords: "contacto asesoría sueño, consulta gratuita sueño infantil, agendar consulta, contactar Por Fin Dormimos, asesoría sueño bebé",
  robots: "index, follow",
  openGraph: {
    title: "Contacto | Por Fin Dormimos",
    description: "Ponte en contacto con nuestro equipo de asesoría de sueño infantil. Primeros pasos para transformar el descanso de tu familia.",
    url: "https://porfindormimos.es/contacto",
    type: "website",
    images: [
      {
        url: "https://porfindormimos.es/og-image-home.jpg",
        width: 1200,
        height: 630,
        alt: "Contacto - Por Fin Dormimos"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | Por Fin Dormimos",
    description: "Agenda una consulta gratuita con nuestros asesores de sueño infantil.",
    images: ["https://porfindormimos.es/og-image-home.jpg"],
  },
  alternates: {
    canonical: "https://porfindormimos.es/contacto",
  },
};

export default function ContactoLayout({
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
