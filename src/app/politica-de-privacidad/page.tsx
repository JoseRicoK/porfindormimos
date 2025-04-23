import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl mt-24">
      <h1 className="text-3xl font-bold mb-6 text-center">Política de Privacidad</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="mb-4">
          Última actualización: {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introducción</h2>
        <p>
          En Por Fin Dormimos ("nosotros", "nuestro", "nuestra"), respetamos su privacidad y nos comprometemos a proteger sus datos personales. 
          Esta política de privacidad le informará sobre cómo cuidamos sus datos personales cuando visita nuestro sitio web 
          (independientemente de dónde lo visite) y le informará sobre sus derechos de privacidad y cómo la ley le protege.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Datos que recopilamos</h2>
        <p>
          Podemos recopilar, usar, almacenar y transferir diferentes tipos de datos personales sobre usted, que hemos agrupado de la siguiente manera:
        </p>
        <ul className="list-disc pl-6 my-4">
          <li><strong>Datos de identidad:</strong> Incluye nombre, apellidos.</li>
          <li><strong>Datos de contacto:</strong> Incluye dirección de correo electrónico y número de teléfono.</li>
          <li><strong>Datos técnicos:</strong> Incluye dirección de protocolo de Internet (IP), sus datos de inicio de sesión, tipo y versión del navegador, configuración de zona horaria y ubicación, tipos y versiones de plugins del navegador, sistema operativo y plataforma, y otra tecnología en los dispositivos que utiliza para acceder a este sitio web.</li>
          <li><strong>Datos de uso:</strong> Incluye información sobre cómo utiliza nuestro sitio web, productos y servicios.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Cómo recopilamos sus datos personales</h2>
        <p>
          Utilizamos diferentes métodos para recopilar datos de y sobre usted, incluyendo:
        </p>
        <ul className="list-disc pl-6 my-4">
          <li>
            <strong>Interacciones directas:</strong> Puede proporcionarnos sus datos de identidad y contacto al rellenar formularios o al ponerse en contacto con nosotros por correo electrónico, WhatsApp, teléfono, o de otra manera.
          </li>
          <li>
            <strong>Tecnologías o interacciones automatizadas:</strong> A medida que interactúa con nuestro sitio web, podemos recopilar automáticamente datos técnicos sobre su equipo, acciones de navegación y patrones. Recopilamos estos datos personales mediante cookies y otras tecnologías similares.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cómo utilizamos sus datos personales</h2>
        <p>
          Solo utilizaremos sus datos personales cuando la ley nos lo permita. Más comúnmente, utilizaremos sus datos personales en las siguientes circunstancias:
        </p>
        <ul className="list-disc pl-6 my-4">
          <li>Para proporcionar nuestros servicios de asesoría de sueño infantil.</li>
          <li>Cuando necesitemos cumplir con una obligación legal o regulatoria.</li>
          <li>Cuando sea necesario para nuestros intereses legítimos (o los de un tercero) y sus intereses y derechos fundamentales no anulen esos intereses.</li>
          <li>Con su consentimiento.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Divulgación de sus datos personales</h2>
        <p>
          Podemos compartir sus datos personales con las partes que se indican a continuación para los fines establecidos en la sección 4 anterior:
        </p>
        <ul className="list-disc pl-6 my-4">
          <li>Proveedores de servicios que proporcionan servicios de TI y administración de sistemas, como nuestro proveedor de hosting Render.</li>
          <li>Nuestro sistema de gestión de contenidos Strapi para proporcionar y gestionar el contenido del sitio web.</li>
          <li>Terceros como Google y Vercel, que proporcionan servicios de análisis.</li>
          <li>WhatsApp (Meta) cuando decide contactarnos a través de este canal.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Cookies y tecnologías similares</h2>
        <p>
          Utilizamos cookies y tecnologías similares para diferenciar sus preferencias de las de otros usuarios de nuestro sitio web. Esto nos ayuda a proporcionarle una buena experiencia cuando navegue por nuestro sitio web y también nos permite mejorarlo.
        </p>
        <p>
          Para obtener información detallada sobre las cookies que utilizamos, los fines para los que las utilizamos y cómo puede ejercer sus elecciones con respecto a ellas, consulte nuestra <a href="/politica-de-cookies" className="text-blue-600 hover:underline">Política de Cookies</a>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Seguridad de datos</h2>
        <p>
          Hemos implementado medidas de seguridad apropiadas para evitar que sus datos personales se pierdan, utilicen o accedan de forma no autorizada, se modifiquen o divulguen accidentalmente. Además, limitamos el acceso a sus datos personales a aquellos empleados, agentes, contratistas y otros terceros que tengan una necesidad comercial de conocer dichos datos.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Retención de datos</h2>
        <p>
          Solo conservaremos sus datos personales durante el tiempo que sea necesario para cumplir con los fines para los que los recopilamos, incluyendo para satisfacer cualquier requisito legal, contable o de información.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Sus derechos legales</h2>
        <p>
          En determinadas circunstancias, tiene derechos bajo las leyes de protección de datos en relación con sus datos personales. Estos incluyen el derecho a:
        </p>
        <ul className="list-disc pl-6 my-4">
          <li>Solicitar acceso a sus datos personales.</li>
          <li>Solicitar la corrección de sus datos personales.</li>
          <li>Solicitar la eliminación de sus datos personales.</li>
          <li>Oponerse al procesamiento de sus datos personales.</li>
          <li>Solicitar la restricción del procesamiento de sus datos personales.</li>
          <li>Solicitar la transferencia de sus datos personales.</li>
          <li>Derecho a retirar el consentimiento.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Servicios de terceros</h2>
        <p>
          Nuestro sitio web utiliza los siguientes servicios de terceros que pueden recopilar o procesar datos personales:
        </p>
        <ul className="list-disc pl-6 my-4">
          <li><strong>Google Analytics (Google LLC)</strong>: Utilizado para analizar el tráfico del sitio web. Google puede utilizar los datos recopilados para contextualizar y personalizar los anuncios de su propia red publicitaria. ID: G-DGNS34JZVX</li>
          <li><strong>Vercel Analytics y Vercel SpeedInsights</strong>: Utilizados para analizar el rendimiento y el uso del sitio web.</li>
          <li><strong>WhatsApp Business (Meta Platforms, Inc.)</strong>: Utilizado como canal de comunicación cuando el usuario decide contactarnos a través de este medio.</li>
          <li><strong>Strapi CMS</strong>: Nuestro sistema de gestión de contenidos que almacena el contenido del sitio web.</li>
          <li><strong>Render</strong>: Nuestro proveedor de hosting que aloja la infraestructura del sitio web.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">11. Cambios a esta política de privacidad</h2>
        <p>
          Podemos actualizar esta política de privacidad de vez en cuando. Si realizamos cambios materiales, le notificaremos mediante la publicación de la nueva política de privacidad en esta página.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">12. Contacto</h2>
        <p>
          Si tiene alguna pregunta sobre esta política de privacidad o nuestras prácticas de privacidad, por favor contáctenos en:
        </p>
        <p className="mb-4">
          <strong>Por Fin Dormimos</strong><br />
          Email: info@porfindormimos.es<br />
        </p>
      </div>
    </div>
  );
}
