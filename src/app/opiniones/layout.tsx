import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Opiniones y Testimonios | Por Fin Dormimos",
  description: "Descubre las experiencias reales de familias que han mejorado el sueño de sus bebés con nuestra asesoría de sueño infantil. Testimonios de padres satisfechos.",
  keywords: "opiniones sueño infantil, testimonios asesoría sueño, experiencias dormir bebé, resultados consultoría sueño, valoraciones asesoría infantil",
  robots: "index, follow",
  openGraph: {
    title: "Opiniones y Testimonios | Por Fin Dormimos",
    description: "Historias reales de familias que han transformado sus noches con nuestra asesoría de sueño infantil. Entérate de sus experiencias y resultados.",
    url: "https://porfindormimos.es/opiniones",
    type: "website",
    images: [
      {
        url: "https://porfindormimos.es/og-image-home.jpg",
        width: 1200,
        height: 630,
        alt: "Testimonios de familias - Por Fin Dormimos"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Opiniones y Testimonios | Por Fin Dormimos",
    description: "Descubre cómo hemos ayudado a familias a mejorar el sueño de sus bebés.",
    images: ["https://porfindormimos.es/og-image-home.jpg"],
  },
  alternates: {
    canonical: "https://porfindormimos.es/opiniones",
  },
};

export default function OpinionesLayout({
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
