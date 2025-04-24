import type { Metadata } from "next";
import "./globals.css";
import "./tarteaucitron-custom.css"; // Estilos personalizados para tarteaucitron
import ClientLayout from "./ClientLayout"; // Importamos un Wrapper del lado del cliente
import Script from "next/script";
import Head from "next/head";

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
        {/* Solo cargamos Vercel analytics cuando tengamos consentimiento */}
        <div id="vercel-analytics-container">
          {/* Las Analytics de Vercel se cargarán aquí condicionalmente con JavaScript */}
        </div>
        {/* Tarteaucitron CSS */}
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/tarteaucitronjs@1.21.0/css/tarteaucitron.css" />
        
        {/* Tarteaucitron JS */}
        <Script src="https://cdn.jsdelivr.net/npm/tarteaucitronjs@1.21.0/tarteaucitron.min.js" strategy="beforeInteractive" />
        
        {/* Tarteaucitron Initialization */}
        <Script id="tarteaucitron-init" strategy="afterInteractive">
          {`
            if (typeof tarteaucitron !== 'undefined') {
              tarteaucitron.init({
                "privacyUrl": "/politica-de-privacidad",
                "orientation": "bottom",
                "showIcon": true,
                "iconPosition": "BottomRight",
                "DenyAllCta": true,
                "AcceptAllCta": true,
                "highPrivacy": true,
                "mandatory": true,
                "googleConsentMode": true,
                "closePopup": false,
                "removeCredit": true,
                "moreInfoLink": true,
                "cookieslist": true,
                "handleBrowserDNTRequest": true,
                "adblocker": false,
                "groupServices": true,
                "readmoreLink": "",
                "showAlertSmall": false,
                "cookieName": "porfindarmimosCookieConsent"
              });
              
              // Personalizar textos
              tarteaucitron.lang = { ...tarteaucitron.lang, 
                "alertBigPrivacy": "Utilizamos cookies para mejorar tu experiencia y ofrecer contenido personalizado. Puedes aceptar todas, rechazarlas o personalizar tus preferencias."
              };
              
              // Google Analytics 
              tarteaucitron.user.gtagUa = 'G-DGNS34JZVX';
              tarteaucitron.user.gtagMore = function () { /* add here your optional gtag() */ };
              (tarteaucitron.job = tarteaucitron.job || []).push('gtag');
              
              // WhatsApp
              tarteaucitron.services.whatsapp = {
                "key": "whatsapp",
                "type": "social",
                "name": "WhatsApp",
                "needConsent": true,
                "cookies": [],
                "js": function () {
                  // No es necesario ejecutar código aquí, ya que WhatsApp solo se usa para vincular
                  // No se cargan cookies antes de hacer clic
                },
                "fallback": function () {
                  // Nada que hacer si se rechaza
                }
              };
              (tarteaucitron.job = tarteaucitron.job || []).push('whatsapp');
              
              // Freeform (formularios de contacto)
              tarteaucitron.services.freeform = {
                "key": "freeform",
                "type": "api",
                "name": "Freeform",
                "needConsent": true,
                "cookies": ['freeform_session', 'freeform_form_data'],
                "js": function () {
                  // Habilitar formularios de Freeform cuando se da consentimiento
                  // Esto es más bien informativo, ya que los formularios se cargan con el sitio
                  if (document.querySelector('form[data-freeform]')) {
                    // Los formularios de Freeform ya están habilitados
                  }
                },
                "fallback": function () {
                  // Deshabilitar formularios si se rechaza el consentimiento
                  // Esto mostraría un mensaje en lugar del formulario
                  const formContainers = document.querySelectorAll('form[data-freeform]');
                  formContainers.forEach(container => {
                    if (container) {
                      container.innerHTML = '<div class="p-4 text-center bg-gray-100 rounded-lg"><p>Para utilizar nuestro formulario de contacto, por favor acepte las cookies de funcionalidad.</p></div>';
                    }
                  });
                }
              };
              (tarteaucitron.job = tarteaucitron.job || []).push('freeform');
              
              // Vercel Analytics
              tarteaucitron.services.vercelanalytics = {
                "key": "vercelanalytics",
                "type": "analytic",
                "name": "Vercel Analytics",
                "needConsent": true,
                "cookies": ['vercel-analytics', 'vercel-speed-insights'],
                "js": function () {
                  // Cargar dinámicamente Vercel Analytics cuando se da consentimiento
                  // Cargamos los componentes originales en el contenedor
                  var script = document.createElement('script');
                  script.text = "if(typeof window !== 'undefined') { const e = document.createElement('div'); e.id = 'vercel-analytics-wrapper'; document.body.appendChild(e); }";
                  document.head.appendChild(script);
                  
                  // Inyectar los componentes de Vercel manualmente
                  const isAnalyticsLoaded = document.querySelector('script[data-vercel-analytics]');
                  const isSpeedInsightsLoaded = document.querySelector('script[data-vercel-speed-insights]');
                  
                  if (!isAnalyticsLoaded) {
                    const analyticsScript = document.createElement('script');
                    analyticsScript.src = '/_vercel/insights/analytics';
                    analyticsScript.setAttribute('data-vercel-analytics', 'true');
                    document.body.appendChild(analyticsScript);
                  }
                  
                  if (!isSpeedInsightsLoaded) {
                    const speedInsightsScript = document.createElement('script');
                    speedInsightsScript.src = '/_vercel/insights/script.js';
                    speedInsightsScript.setAttribute('data-vercel-speed-insights', 'true');
                    document.body.appendChild(speedInsightsScript);
                  }
                },
                "fallback": function () {
                  // No hacer nada si se rechaza
                }
              };
              (tarteaucitron.job = tarteaucitron.job || []).push('vercelanalytics');
            }
          `}
        </Script>
      </body>
    </html>
  );
}