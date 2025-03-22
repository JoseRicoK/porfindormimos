"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import bebeDurmiendo from '@/assets/images/bebe_durmiendo.jpg';

const testimonials = [
  {
    content: "Gracias a Paula, mi bebé duerme toda la noche. El método que utilizó se adaptó perfectamente a nuestra familia y ahora todos descansamos mejor.",
    author: "— Mamá Feliz"
  },
  {
    content: "El seguimiento constante fue clave. Paula nos acompañó durante todo el proceso y siempre estuvo disponible para resolver nuestras dudas.",
    author: "— Familia Pérez"
  },
  {
    content: "Ya no hay peleas a la hora de dormir. Nuestro hijo aprendió a dormirse solo y ahora disfrutamos mucho más de las tardes en familia.",
    author: "— Familia Rodríguez"
  },
  {
    content: "Pasamos de despertarnos 5-6 veces cada noche a dormir 12 horas seguidas. Ha sido un cambio increíble para toda la familia.",
    author: "— Ana G."
  },
  {
    content: "Pensábamos que era imposible, pero en solo dos semanas nuestro bebé aprendió a conciliar el sueño sin ayuda. Paula es una profesional excepcional.",
    author: "— Carlos y Laura"
  },
  {
    content: "La metodología es respetuosa y se adapta a las necesidades de cada familia. Los resultados son sorprendentes y duraderos.",
    author: "— Familia Martínez"
  },
];

export default function Opiniones() {
  // Creamos un plugin Autoplay con configuración personalizada
  const autoplayOptions = {
    delay: 3000,  // 3 segundos entre slides
    stopOnInteraction: false,  // Continúa el autoplay incluso después de interacción
    rootNode: (emblaRoot: HTMLElement) => emblaRoot, // Necesario para el correcto funcionamiento
  };
  
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true, 
      align: "center",
      slidesToScroll: 1
    }, 
    [Autoplay(autoplayOptions)]
  );

  return (
    <main className="w-full overflow-x-hidden font-sans">
      {/* 🔹 Hero de Opiniones con ola */}
      <section className="w-full min-h-[70vh] flex items-center justify-center relative"
        style={{
          background:
            `linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.2) 100%), url(${bebeDurmiendo.src}) center/cover no-repeat fixed`
        }}
      >
        <div className="z-10 text-white text-center p-5 max-w-[90%] mx-auto animate-fadeInDown">
          <h1 className="text-6xl font-bold mb-8 leading-tight tracking-wide md:text-5xl sm:text-4xl text-shadow-lg">
            Testimonios Reales
          </h1>
          <p className="text-2xl max-w-[700px] mx-auto mb-6 md:text-xl sm:text-lg font-light leading-relaxed">
            Descubre cómo las familias han mejorado su descanso con nuestra ayuda.
          </p>
        </div>

        {/* Ola decorativa al pie del hero */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
          <svg className="block w-full h-[100px]" viewBox="0 0 500 150" preserveAspectRatio="none">
            <path d="M0.00,49.98 C150.00,150.00 350.00,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className="fill-white" />
          </svg>
        </div>
      </section>

      {/* 🔹 Título y carrusel de testimonios */}
      <section id="testimonios" className="py-16 px-5">
        <h2 className="text-4xl text-gray-800 font-bold mb-12 text-center">Lo que dicen nuestras familias</h2>
        
        <div className="w-full max-w-6xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_80%] sm:flex-[0_0_70%] md:flex-[0_0_50%] lg:flex-[0_0_33%] p-4">
                  <div className="bg-white p-8 rounded-xl shadow-lg text-center h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                    <p className="text-xl italic text-gray-700 mb-5 flex-grow">{testimonial.content}</p>
                    <div className="text-lg font-bold text-[#4a5d73]">{testimonial.author}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 CTA para compartir experiencias */}
      <section className="bg-gray-50 py-16 px-5 mb-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl text-gray-800 font-bold mb-4">¿Quieres compartir tu experiencia?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Ayuda a otras familias a conocer los beneficios de un sueño reparador y cómo Por Fin Dormimos puede cambiar sus vidas.</p>
          <a href="/contacto" className="bg-yellow-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-yellow-600 hover:-translate-y-1 shadow-md hover:shadow-lg inline-block">
            Dejar mi Opinión
          </a>
        </div>
        
        {/* Círculos decorativos */}
        <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full bg-blue-100/50"></div>
        <div className="absolute bottom-[-30px] left-[-30px] w-[150px] h-[150px] rounded-full bg-yellow-100/50"></div>
      </section>
    </main>
  );
}