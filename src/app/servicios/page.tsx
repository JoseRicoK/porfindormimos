"use client";

import { useState, useEffect } from "react";
import { getServices, Service } from "@/lib/strapi";

// Componente de Calendly embebido (solo para el widget)
const CalendlyEmbed = ({ url, height = "200px" }: { url: string, height?: string }) => {
  useEffect(() => {
    // Cargamos el script de Calendly
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Limpieza cuando el componente se desmonte
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div 
      className="calendly-inline-widget w-full h-full" 
      data-url={url}
      style={{ minWidth: '320px', height: height }}
    ></div>
  );
};

// Componente de tarjeta de servicio
interface ServiceCardProps {
  title: string;
  price: string | number;
  features: string[];
  buttonText?: string;
  highlightColor?: string;
  highlighted?: boolean;
}

const ServiceCard = ({ 
  title, 
  price, 
  features, 
  buttonText = "Contratar", // Cambiado de "Comprar ahora" a "Contratar"
  highlightColor = "bg-[#4a5d73]",
  highlighted = false 
}: ServiceCardProps) => {
  // Función para generar el mensaje predefinido para WhatsApp
  const getWhatsAppMessage = (serviceTitle: string) => {
    return encodeURIComponent(`Me gustaría contratar el plan de sueño: ${serviceTitle}`);
  };

  return (
    <div className={`
      ${highlighted ? highlightColor : 'bg-white'} rounded-2xl shadow-lg p-6 flex flex-col h-full
      transition-all duration-300 hover:scale-[1.02] 
      ${highlighted ? 'text-white ring-4 ring-yellow-300' : 'text-gray-800'}
    `}>
      <h3 className={`text-xl ${highlighted ? 'text-white' : 'text-[#4a5d73]'} font-bold mb-2`}>{title}</h3>
      <div className="text-center my-4">
        <span className={`text-3xl font-bold ${highlighted ? 'text-white' : 'text-gray-800'}`}>{price}€</span>
      </div>
      <div className="flex-grow">
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className={`h-5 w-5 ${highlighted ? 'text-yellow-200' : 'text-green-500'} mr-2 flex-shrink-0 mt-0.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className={`${highlighted ? 'text-white' : 'text-gray-600'}`}>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <a 
        href={`https://wa.me/34699851245?text=${getWhatsAppMessage(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          px-6 py-3 rounded-xl text-white font-semibold
          transition-all duration-200 text-center
          ${highlighted 
            ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900' 
            : `${highlightColor} hover:bg-[#2c3e50]`}
        `}
      >
        {buttonText}
      </a>
    </div>
  );
};

export default function Servicios() {
  const [activeTab, setActiveTab] = useState('seguimiento');
  const [servicios, setServicios] = useState<Service[]>([]); // Array de servicios de Strapi
  const [loading, setLoading] = useState(true); // Para controlar el estado de carga
  
  // Función para obtener el precio de un servicio desde Strapi
  const getPrecioServicio = (titulo: string) => {
    const servicio = servicios.find(s => 
      (s.attributes?.title || s.title || '').toLowerCase() === titulo.toLowerCase()
    );
    return servicio?.attributes?.price || servicio?.price || 0;
  };
  
  // Estado para gestionar errores
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Efecto para cargar los servicios
  useEffect(() => {
    const loadServicios = async () => {
      try {
        setLoading(true);
        setErrorMsg(null);
        const data = await getServices();
        setServicios(data);
        console.log('Servicios cargados:', data);
      } catch (error: any) {
        console.error('Error al cargar servicios:', error);
        // Verificar si es un error de permisos (403)
        if (error?.response?.status === 403) {
          setErrorMsg('Error 403: No tienes permisos para acceder a los servicios. Por favor, configura los permisos en Strapi.');
        } else {
          setErrorMsg(`Error al cargar los servicios: ${error?.message || 'Desconocido'}`);
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadServicios();
  }, []);

  const tabs = [
    { id: 'basicos', label: 'Planes Básicos' },
    { id: 'seguimiento', label: 'Seguimiento' },
    { id: 'hermanos', label: 'Plan Hermanos' }
  ];

  return (
    <main className="w-full overflow-x-hidden font-sans pb-16">
      {/* Hero Section - New Split Design */}
      <section className="w-full bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-0">
          {/* Left side - Content */}
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 order-2 md:order-1">
            <div className="max-w-md">
              <div className="inline-block px-3 py-1 mb-6 text-xs font-medium text-[#4a5d73] bg-blue-100 rounded-full">
                Servicios personalizados
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Soluciones para un <span className="text-[#4a5d73]">mejor descanso</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Planes adaptados a cada familia para que todos puedan disfrutar de un sueño reparador. 
                Nuestro enfoque personalizado garantiza resultados efectivos y duraderos.
              </p>
              <div className="flex">
                <button 
                  onClick={() => {
                    const planesElement = document.getElementById('planes');
                    if (planesElement) {
                      window.scrollTo({top: planesElement.offsetTop - 100, behavior: 'smooth'});
                    }
                  }}
                  className="bg-[#4a5d73] text-white px-6 py-3 rounded-lg text-lg font-medium
                          transition-all duration-300 hover:bg-[#36485a] transform hover:-translate-y-1 shadow-md"
                >
                  Explorar planes
                </button>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="h-[50vh] md:h-auto relative overflow-hidden order-1 md:order-2">
            <div className="absolute inset-0 bg-[#4a5d73]/10"></div>
            <img 
              src="https://images.pexels.com/photos/265987/pexels-photo-265987.jpeg" 
              alt="Bebé durmiendo pacíficamente en su cuna" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-[80%] md:max-w-[300px]">
              <p className="text-sm font-medium text-gray-900">"Gracias a estos servicios, nuestra familia por fin duerme toda la noche."</p>
              <p className="text-xs text-gray-600 mt-2">— María G., madre de Emma, 8 meses</p>
            </div>
          </div>
        </div>
        
        {/* Stats Bar */}
        
      </section>

      {/* Planes Section */}
      <section id="planes" className="py-16 px-5 max-w-[1200px] mx-auto">
        <h2 className="text-3xl md:text-4xl text-gray-800 mb-12 text-center">
          Encuentra el plan perfecto para ti
        </h2>
        
        {loading && (
          <div className="text-center py-6">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#4a5d73] mb-4"></div>
            <p>Cargando precios...</p>
          </div>
        )}
        
        {errorMsg && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 mx-auto text-left max-w-3xl">
            <p className="text-yellow-700">
              <strong>Error:</strong> {errorMsg}
            </p>
            <div className="mt-3">
              <p className="text-yellow-700"><strong>Instrucciones para resolver:</strong></p>
              <ol className="list-decimal pl-5 mt-2 text-yellow-700">
                <li>Accede a <code className="bg-yellow-100 px-1 rounded">http://localhost:1337/admin</code></li>
                <li>Ve a Settings → Roles & Permissions</li>
                <li>Selecciona el rol &quot;Public&quot;</li> 
                <li>Habilita el permiso &quot;find&quot; para Servicios</li>
                <li>Guarda los cambios</li>
                <li>Recarga esta página</li>
              </ol>
            </div>
          </div>
        )}
        
        {/* Tabs */}
        <div className="flex justify-center mb-12 px-4 overflow-x-auto whitespace-nowrap max-w-full">
          <div className="inline-flex bg-gray-100 rounded-xl p-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200
                  text-sm sm:text-base
                  ${activeTab === tab.id 
                    ? 'bg-[#4a5d73] text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-200'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Planes Básicos */}
        <div className={`${activeTab === 'basicos' ? 'block' : 'hidden'}`}>
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <ServiceCard
                title="Consulta"
                price={getPrecioServicio("Consulta") || 99}
                features={[
                  "Llamada de 30 minutos",
                  "Resolución rápida de dudas específicas",
                  "Recomendaciones personalizadas"
                ]}
              />
            </div>
          </div>
        </div>

        {/* Seguimiento */}
        <div className={`${activeTab === 'seguimiento' ? 'block' : 'hidden'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              title="Seguimiento 2 Semanas"
              price={getPrecioServicio("Seguimiento 2 Semanas") || 199}
              features={[
                "Videollamada inicial de 60 minutos",
                "Valoración y plan personalizado",
                "Seguimiento durante 2 semanas",
              ]}
            />
            <ServiceCard
              title="Seguimiento 3 Semanas"
              price={getPrecioServicio("Seguimiento 3 Semanas") || 299}
              features={[
                "Videollamada inicial de 60 minutos",
                "Valoración y plan personalizado",
                "Seguimiento durante 3 semanas",
              ]}
              highlighted={true}
              highlightColor="bg-[#3d7d91]"
            />
            <ServiceCard
              title="Seguimiento 4 Semanas"
              price={getPrecioServicio("Seguimiento 4 Semanas") || 399}
              features={[
                "Videollamada inicial de 60 minutos",
                "Valoración y plan personalizado",
                "Seguimiento durante 4 semanas",
              ]}
            />
          </div>
        </div>

        {/* Plan Hermanos */}
        <div className={`${activeTab === 'hermanos' ? 'block' : 'hidden'}`}>
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <ServiceCard
                title="Hermanos Estándar"
                price={getPrecioServicio("Hermanos Estándar") || 499}
                features={[
                  "Plan para 2 hermanos",
                  "Videollamada inicial de 90 minutos",
                  "Seguimiento durante 3 semanas",
                  "Ajustes semanales personalizados para cada niño"
                ]}
                highlighted={true}
                highlightColor="bg-[#5d5d91]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contacto por WhatsApp Section */}
      <section className="py-16 px-5 bg-gradient-to-r from-[#4a5d73] to-[#3d7d91]">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿No estáis seguros de qué plan elegir?</h2>
            <p className="text-lg opacity-90 mb-6">
              Contáctanos directamente por WhatsApp para resolver tus dudas y recibir una recomendación personalizada sobre el plan más adecuado para ti y tu familia.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-yellow-300 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Respuesta rápida y directa</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-yellow-300 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Resuelve tus dudas iniciales</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-yellow-300 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Recibe una recomendación personalizada</span>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-[#4a5d73] mb-5 text-center">Contáctanos por WhatsApp</h3>
            <div className="mb-6 text-center">
              <p className="text-gray-600 mb-6">Escríbenos directamente para recibir información sobre nuestros servicios y resolver tus dudas.</p>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
              </div>
              <p className="text-xl font-bold text-[#4a5d73] mb-2">699851245</p>
              <p className="text-sm text-gray-500">Disponible de lunes a viernes de 9:00 a 20:00h</p>
            </div>
            <a 
              href="https://wa.me/34699851245" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full bg-[#25D366] text-white py-4 px-6 rounded-xl font-semibold text-center hover:bg-[#20bd5a] transition duration-200 flex items-center justify-center text-lg"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Testimonios Section */}
      <section className="py-12 px-5 bg-gray-50">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-gray-800 mb-10">Lo que dicen nuestros clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">&quot;Gracias a Paula, mi hijo de 30 meses se duerme solo y la hora de dormir ya no es una pelea.&quot;</p>
              <p className="font-semibold">Tania Colinas</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">&quot;Parecía imposible pero pasamos de 13 despertares a solo 2 en tan solo 3 semanas.&quot;</p>
              <p className="font-semibold">Jose Rico</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">&quot;Me decidi por ellas porque tambien hay una pedriata en el equipo que me dio mucha tranquilidad por las complicaciones de mi hija de 2 años.&quot;</p>
              <p className="font-semibold">Marta Martín</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-5 text-center">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-3xl md:text-4xl text-gray-800 mb-6">¿Listo para descansar mejor?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Elige el plan que mejor se adapte a tus necesidades y comienza hoy mismo a transformar el sueño de tu familia.
          </p>
          <button 
            onClick={() => {
              const planesElement = document.getElementById('planes');
              if (planesElement) {
                window.scrollTo({top: planesElement.offsetTop - 100, behavior: 'smooth'});
              }
            }}
            className="bg-[#4a5d73] text-white px-7 py-4 rounded-xl text-lg cursor-pointer 
                    transition-all duration-300 hover:bg-[#2c3e50] hover:scale-105 shadow-lg"
          >
            Ver planes
          </button>
        </div>
      </section>
      
    </main>
  );
}
