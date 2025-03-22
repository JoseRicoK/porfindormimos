"use client";

import Link from "next/link";

export default function CalendarioPage() {
  // URL del iframe de Calendly
  const iframeUrl = "https://calendly.com/embed/porfindormimos/consulta-servicio";

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header con botón de volver */}
      <header className="bg-[#4a5d73] text-white py-4 px-6 flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <Link href="/contacto" className="flex items-center text-white hover:text-gray-200 transition">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Volver a contacto</span>
          </Link>
        </div>
        <h1 className="text-xl font-bold">Reserva de consulta gratuita</h1>
        <div className="w-24">
          {/* Espacio vacío para centrar el título */}
        </div>
      </header>

      {/* Contenedor del iframe de Calendly a pantalla completa */}
      <div className="flex-grow w-full h-full">
        <iframe
          src={iframeUrl}
          width="100%"
          height="calc(100vh - 60px)"
          frameBorder="0"
          title="Calendario de consultas"
          style={{
            width: '100%',
            minWidth: '0',
            height: 'calc(100vh - 60px)',
            border: 'none',
            overflow: 'hidden',
          }}
          allow="camera; microphone; autoplay; encrypted-media; fullscreen"
        ></iframe>
      </div>
    </main>
  );
}
