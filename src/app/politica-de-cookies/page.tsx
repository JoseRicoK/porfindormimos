"use client";

import React from 'react';

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl mt-24">
      <h1 className="text-3xl font-bold mb-6 text-center">Política de Cookies</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="mb-4">
          Última actualización: {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que los sitios web colocan en su dispositivo cuando los visita. 
          Se utilizan ampliamente para hacer que los sitios web funcionen, o funcionen de manera más eficiente, 
          así como para proporcionar información a los propietarios del sitio.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Cómo utilizamos las cookies</h2>
        <p>
          En Por Fin Dormimos utilizamos cookies y tecnologías similares por varias razones, incluyendo:
        </p>
        <ul className="list-disc pl-6 my-4">
          <li>Para hacer que nuestro sitio web funcione correctamente</li>
          <li>Para mejorar la experiencia del usuario y personalizar el contenido</li>
          <li>Para entender cómo los usuarios interactúan con nuestro sitio web</li>
          <li>Para analizar y medir el rendimiento de nuestro sitio web</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Tipos de cookies que utilizamos</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">3.1. Cookies esenciales</h3>
        <p>
          Estas cookies son necesarias para que el sitio web funcione y no pueden ser desactivadas en nuestros sistemas. 
          Generalmente solo se establecen en respuesta a acciones realizadas por usted que equivalen a una solicitud de servicios, 
          como establecer sus preferencias de privacidad, iniciar sesión o rellenar formularios.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">3.2. Cookies analíticas</h3>
        <p>
          Estas cookies nos permiten contar las visitas y las fuentes de tráfico para poder medir y mejorar el rendimiento de nuestro sitio. 
          Nos ayudan a saber qué páginas son las más y menos populares y ver cómo se mueven los visitantes por el sitio.
        </p>
        <p>
          Utilizamos los siguientes servicios analíticos:
        </p>
        <ul className="list-disc pl-6 my-4">
          <li>
            <strong>Google Analytics (Google LLC)</strong>: Utilizado para analizar el tráfico del sitio web. Las cookies 
            utilizadas incluyen _ga, _gat y _gid, que almacenan un identificador único, así como información sobre cómo los 
            visitantes utilizan el sitio web. ID de seguimiento: G-DGNS34JZVX
          </li>
          <li>
            <strong>Vercel Analytics y Speed Insights</strong>: Utilizados para analizar el rendimiento y el uso del sitio web. 
            Las cookies de Vercel Analytics ayudan a recopilar datos sobre la experiencia del usuario para mejorar el rendimiento.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">3.3. Cookies de redes sociales y servicios externos</h3>
        <p>
          Estas cookies son establecidas por servicios de redes sociales que hemos añadido al sitio para permitirle compartir 
          nuestro contenido con sus amigos y redes o contactarnos directamente.
        </p>
        <ul className="list-disc pl-6 my-4">
          <li>
            <strong>WhatsApp (Meta Platforms, Inc.)</strong>: Cuando utiliza los enlaces de WhatsApp en nuestro sitio, 
            Meta puede establecer cookies en su dispositivo para rastrear esta interacción.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Gestión de cookies</h2>
        <p>
          Utilizamos un sistema de gestión de consentimiento de cookies llamado tarteaucitron.js que le permite controlar qué 
          categorías de cookies desea aceptar o rechazar. Cuando visita nuestro sitio por primera vez, verá un banner que le 
          permite hacer esta elección.
        </p>
        <p>
          Puede cambiar sus preferencias en cualquier momento haciendo clic en el icono de cookies que aparece en la esquina 
          inferior derecha de nuestro sitio web.
        </p>
        <p>
          Además de nuestro sistema de gestión de cookies, la mayoría de los navegadores web le permiten algún control de la 
          mayoría de las cookies a través de la configuración del navegador. Para obtener más información sobre las cookies, 
          incluida la forma de ver qué cookies se han establecido, visite <a href="https://www.aboutcookies.org" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.aboutcookies.org</a>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Cookies específicas utilizadas en este sitio</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 mt-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Proveedor</th>
                <th className="py-2 px-4 border-b">Propósito</th>
                <th className="py-2 px-4 border-b">Caducidad</th>
                <th className="py-2 px-4 border-b">Tipo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">_ga</td>
                <td className="py-2 px-4 border-b">Google</td>
                <td className="py-2 px-4 border-b">Registra un ID único que se utiliza para generar datos estadísticos sobre cómo utiliza el visitante el sitio web.</td>
                <td className="py-2 px-4 border-b">2 años</td>
                <td className="py-2 px-4 border-b">Analítica</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">_gid</td>
                <td className="py-2 px-4 border-b">Google</td>
                <td className="py-2 px-4 border-b">Registra un ID único que se utiliza para generar datos estadísticos sobre cómo utiliza el visitante el sitio web.</td>
                <td className="py-2 px-4 border-b">24 horas</td>
                <td className="py-2 px-4 border-b">Analítica</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">_gat</td>
                <td className="py-2 px-4 border-b">Google</td>
                <td className="py-2 px-4 border-b">Se utiliza por Google Analytics para limitar la tasa de solicitudes.</td>
                <td className="py-2 px-4 border-b">1 minuto</td>
                <td className="py-2 px-4 border-b">Analítica</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">vercel-analytics</td>
                <td className="py-2 px-4 border-b">Vercel</td>
                <td className="py-2 px-4 border-b">Recopila información sobre el uso del sitio web para fines analíticos.</td>
                <td className="py-2 px-4 border-b">1 año</td>
                <td className="py-2 px-4 border-b">Analítica</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">vercel-speed-insights</td>
                <td className="py-2 px-4 border-b">Vercel</td>
                <td className="py-2 px-4 border-b">Recopila métricas de rendimiento del sitio web.</td>
                <td className="py-2 px-4 border-b">1 año</td>
                <td className="py-2 px-4 border-b">Analítica</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">porfindarmimosCookieConsent</td>
                <td className="py-2 px-4 border-b">Por Fin Dormimos</td>
                <td className="py-2 px-4 border-b">Guarda sus preferencias de consentimiento de cookies.</td>
                <td className="py-2 px-4 border-b">12 meses</td>
                <td className="py-2 px-4 border-b">Necesaria</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Cambios en nuestra política de cookies</h2>
        <p>
          Cualquier cambio que podamos hacer en nuestra política de cookies en el futuro se publicará en esta página. 
          Por favor, compruebe con frecuencia para ver cualquier actualización o cambio en nuestra política de cookies.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contacto</h2>
        <p>
          Si tiene alguna pregunta sobre esta política de cookies o nuestras prácticas relacionadas con la privacidad, por favor contáctenos en:
        </p>
        <p className="mb-4">
          <strong>Por Fin Dormimos</strong><br />
          Email: info@porfindormimos.es<br />
        </p>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            onClick={() => {
              if (typeof window !== 'undefined') {
                // Usando any para evitar errores de TypeScript ya que tarteaucitron se carga dinámicamente
                const tarteaucitronInstance = (window as any).tarteaucitron;
                if (tarteaucitronInstance) {
                  tarteaucitronInstance.userInterface.openPanel();
                }
              }
            }}
          >
            Configurar preferencias de cookies
          </button>
        </div>
      </div>
    </div>
  );
}
