"use client";

import { useState } from "react";
import { FaRegEnvelope, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

// Componente de Calendly embebido utilizando un iframe para mejor compatibilidad móvil
const CalendlyEmbed = ({ url, height = "630px" }: { url: string, height?: string }) => {
  // Transformamos la URL a formato iframe
  const iframeUrl = url.replace('https://calendly.com/', 'https://calendly.com/embed/');
  
  return (
    <div className="w-full h-full" style={{ position: 'relative', overflow: 'hidden' }}>
      <iframe
        src={iframeUrl}
        width="100%"
        height={height}
        frameBorder="0"
        title="Selector de Calendly"
        style={{
          minWidth: '0',
          width: '100%',
          height: height,
          border: 'none',
          overflow: 'hidden',
        }}
        allow="camera; microphone; autoplay; encrypted-media; fullscreen"
      ></iframe>
    </div>
  );
};

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null as null | string },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({
      submitted: false,
      submitting: true,
      info: { error: false, msg: null },
    });

    try {
      // Simular una llamada a API con un pequeño delay
      // En una implementación real, esto se conectaría con tu backend
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Formulario enviado:", formData);
      
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: "¡Mensaje enviado correctamente!" },
      });
      
      setFormData({ 
        nombre: "", 
        email: "", 
        telefono: "", 
        asunto: "", 
        mensaje: "" 
      });
      
      setTimeout(() => {
        setStatus({
          submitted: false,
          submitting: false,
          info: { error: false, msg: null },
        });
      }, 5000);
      
    } catch (err) {
      console.error('Error al enviar el formulario:', err);
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: "Ocurrió un error. Por favor intenta nuevamente." },
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-sans pb-16">
      {/* Hero Section - Rediseñado sin ola */}
      <section className="bg-[#4a5d73] text-white relative">
        <div className="max-w-[1200px] mx-auto px-5 py-24 md:py-32">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-3/5 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contacta con nosotros</h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
                Estamos aquí para ayudarte. No dudes en contactarnos para cualquier duda o consulta sobre nuestros servicios de sueño infantil.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#formulario" 
                  className="bg-white text-[#4a5d73] px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition duration-200 inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                  Enviar mensaje
                </a>
                <a 
                  href="#calendario" 
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition duration-200 inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Reservar cita
                </a>
              </div>
            </div>
            <div className="md:w-2/5 flex justify-end">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl max-w-sm">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Llámanos</p>
                    <p className="text-white font-medium">+34 XXX XXX XXX</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Escríbenos</p>
                    <p className="text-white font-medium">info@porfindormimos.es</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Decoración diagonal en lugar de la ola */}
        <div className="h-16 bg-[#f8f9fa] transform -skew-y-3 origin-top-right -mt-8"></div>
      </section>

      {/* Info Cards */}
      <section className="relative z-10 px-5 -mt-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 transition-transform hover:scale-[1.02]">
            <div className="p-3 bg-[#EDF4FF] inline-block rounded-xl mb-4">
              <HiOutlinePhone className="w-7 h-7 text-[#4a5d73]" />
            </div>
            <h3 className="text-xl font-bold text-[#4a5d73] mb-2">Llámanos</h3>
            <p className="text-gray-600 mb-3">De lunes a viernes de 9:00 a 18:00h</p>
            <a href="tel:+34XXXXXXXXX" className="text-lg font-medium text-[#4a5d73] hover:underline">+34 XXX XXX XXX</a>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 transition-transform hover:scale-[1.02]">
            <div className="p-3 bg-[#FFF4ED] inline-block rounded-xl mb-4">
              <HiOutlineMail className="w-7 h-7 text-[#4a5d73]" />
            </div>
            <h3 className="text-xl font-bold text-[#4a5d73] mb-2">Escríbenos</h3>
            <p className="text-gray-600 mb-3">Responderemos en menos de 24 horas</p>
            <a href="mailto:info@porfindormimos.es" className="text-lg font-medium text-[#4a5d73] hover:underline">info@porfindormimos.es</a>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 transition-transform hover:scale-[1.02]">
            <div className="p-3 bg-[#F0F9FF] inline-block rounded-xl mb-4">
              <HiOutlineLocationMarker className="w-7 h-7 text-[#4a5d73]" />
            </div>
            <h3 className="text-xl font-bold text-[#4a5d73] mb-2">Ubicación</h3>
            <p className="text-gray-600 mb-3">Servicios online para toda España</p>
            <p className="text-lg font-medium text-[#4a5d73]">Madrid, España</p>
          </div>
        </div>
      </section>

      {/* Form and Contact Information */}
      <section className="px-5 py-16 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-5">Envíanos un mensaje</h2>
            <p className="text-gray-600 mb-10">
              Completa el formulario y nos pondremos en contacto contigo lo antes posible. Estamos aquí para resolver todas tus dudas sobre el sueño infantil.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-medium text-gray-700 block mb-2" htmlFor="nombre">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre y apellidos"
                    required
                    className="w-full p-3.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a5d73] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="font-medium text-gray-700 block mb-2" htmlFor="email">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ejemplo@correo.com"
                    required
                    className="w-full p-3.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a5d73] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-medium text-gray-700 block mb-2" htmlFor="telefono">
                    Teléfono (opcional)
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Tu número de teléfono"
                    className="w-full p-3.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a5d73] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="font-medium text-gray-700 block mb-2" htmlFor="asunto">
                    Asunto
                  </label>
                  <select
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    required
                    className="w-full p-3.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a5d73] focus:border-transparent"
                  >
                    <option value="" disabled>Selecciona una opción</option>
                    <option value="informacion">Información general</option>
                    <option value="precios">Consulta de precios</option>
                    <option value="servicios">Consulta sobre servicios</option>
                    <option value="cita">Reservar cita</option>
                    <option value="otro">Otro asunto</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="font-medium text-gray-700 block mb-2" htmlFor="mensaje">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={5}
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Describe tu consulta o mensaje..."
                  required
                  className="w-full p-3.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a5d73] focus:border-transparent"
                ></textarea>
              </div>
              
              <div className="mt-2">
                <button
                  type="submit"
                  disabled={status.submitting}
                  className={`w-full bg-[#4a5d73] text-white py-4 px-8 rounded-xl font-medium text-lg 
                    transition-all hover:bg-[#3d4f65] transform hover:scale-[1.01] 
                    flex items-center justify-center ${status.submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {status.submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : 'Enviar mensaje'}
                </button>
              </div>
              
              {status.info.msg && (
                <div className={`mt-4 p-4 rounded-xl ${status.info.error ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                  {status.info.msg}
                </div>
              )}
            </form>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-5">Sigue conectado</h2>
            <p className="text-gray-600 mb-8">
              Mantente al día con nuestros consejos, promociones y novedades siguiéndonos en nuestras redes sociales o contactándonos por WhatsApp.
            </p>
            
            <div className="space-y-6 mb-10">
              <a 
                href="https://wa.me/34XXXXXXXXX" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="p-3 bg-[#25D366] rounded-xl mr-4">
                  <FaWhatsapp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">WhatsApp</h3>
                  <p className="text-gray-600">Chatea con nosotros</p>
                </div>
              </a>
              
              <a 
                href="https://instagram.com/porfindormimos" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="p-3 bg-gradient-to-r from-[#C13584] to-[#5851DB] rounded-xl mr-4">
                  <FaInstagram className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Instagram</h3>
                  <p className="text-gray-600">@porfindormimos</p>
                </div>
              </a>
              
              <a 
                href="mailto:info@porfindormimos.es" 
                className="flex items-center p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="p-3 bg-[#4a5d73] rounded-xl mr-4">
                  <FaRegEnvelope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Email</h3>
                  <p className="text-gray-600">info@porfindormimos.es</p>
                </div>
              </a>
            </div>
            
            <div className="bg-[#4a5d73]/10 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-[#4a5d73] mb-3">Horario de atención</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">Lunes - Viernes</span>
                  <span className="text-gray-700">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">Sábado</span>
                  <span className="text-gray-700">10:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">Domingo</span>
                  <span className="text-gray-700">Cerrado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Calendario Section */}
      <section className="px-5 py-16 bg-gradient-to-r from-[#4a5d73]/10 to-[#3d7d91]/10">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Reserva una consulta</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Encuentra un horario que te convenga y agenda una consulta gratuita de 15 minutos para discutir tus necesidades y el plan más adecuado para ti.
            </p>
          </div>
          
          <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">

              <div>
                <h3 className="text-2xl font-bold text-[#4a5d73] mb-5">Consulta gratuita inicial</h3>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">15 minutos de duración</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Evaluación de tus necesidades</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Recomendación personalizada de plan</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Sin compromiso</span>
                  </li>
                </ul>
                <a 
                  href="/calendario" 
                  target="_blank" 
                  className="inline-flex items-center bg-[#4a5d73] text-white py-3 px-6 rounded-xl font-medium hover:bg-[#3d4f65] transition duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Ver calendario completo
                </a>
              </div>
              
              <div className="bg-[#f8f9fa] p-3 sm:p-6 rounded-xl relative w-full">
                <div className="w-full" style={{ maxWidth: '100%', overflow: 'hidden' }}>
                  <CalendlyEmbed url="https://calendly.com/porfindormimos/consulta-servicio" height="350px" />
                </div>
                <p className="text-sm text-gray-500 text-center mt-3">
                  Selecciona una fecha y hora que te convenga para programar tu consulta gratuita.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="px-5 py-12 bg-[#f0f4f8]">
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Preguntas frecuentes</h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            Respuestas a las dudas más comunes sobre nuestros servicios de asesoramiento de sueño infantil
          </p>
          
          <div className="grid gap-6 text-left">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-2">¿Cuánto tiempo tardaré en recibir respuesta?</h3>
              <p className="text-gray-600">Nos comprometemos a responder a todas las consultas en un plazo máximo de 24 horas laborables.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-2">¿Puedo cambiar de plan una vez contratado?</h3>
              <p className="text-gray-600">Sí, es posible actualizar tu plan pagando la diferencia si necesitas un seguimiento más extenso.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-2">¿Realizáis consultas presenciales?</h3>
              <p className="text-gray-600">Actualmente todos nuestros servicios son online, lo que nos permite atender a familias de toda España y otros países hispanohablantes.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}