import Image from 'next/image';
import Link from 'next/link';
import bebeDurmiendo from '@/assets/images/bebe_durmiendo.jpg';
import paulaPhoto from '@/assets/images/paula-bg.png';
import monicaPhoto from '@/assets/images/monica-bg.png';
import certificado from '@/assets/images/certi.png';

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden font-sans bg-gray-50">
      {/* Hero Section */}
      <section className="w-full min-h-[75vh] flex items-center justify-center relative pt-24"
               style={{
                 background: `linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%), url("https://images.pexels.com/photos/161709/newborn-baby-feet-basket-161709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2") center/cover no-repeat fixed`
               }}>
        <div className="z-20 text-white text-center max-w-[90%] mx-auto animate-fadeInDown backdrop-blur-sm bg-black/10 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-5xl mb-4 leading-tight md:text-3xl sm:text-2xl font-bold tracking-tight">
            Bienvenidos a <span className="text-[#a3c5e9]">Por Fin Dormimos</span>
          </h1>
          <p className="text-xl mb-8 max-w-[600px] mx-auto md:text-lg sm:text-base">
            Asesoría de sueño infantil profesional para que tú y tu bebé podáis descansar mejor.
          </p>
          <Link href="/servicios" className="bg-gradient-to-r from-[#4a5d73] to-[#3a4a5d] text-white px-8 py-4 rounded-full text-lg cursor-pointer transition-all duration-300 hover:from-[#3a4a5d] hover:to-[#2c3e50] hover:scale-105 shadow-lg hover:shadow-xl md:text-base sm:text-sm font-medium inline-block">
            Empieza Ahora
          </Link>
        </div>

        {/* Wave SVG */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
          <svg className="block w-full h-[120px]" viewBox="0 0 500 150" preserveAspectRatio="none">
            <path d="M0.00,49.98 C150.00,150.00 350.00,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className="fill-white" />
          </svg>
        </div>
      </section>

      {/* Services Section - Enhanced for SEO */}
      <section className="py-20 px-5 text-center bg-white" id="servicios-destacados">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#4a5d73] font-medium mb-3 block">SOLUCIONES PARA EL DESCANSO INFANTIL</span>
            <h2 className="text-4xl font-bold text-gray-800 md:text-3xl relative inline-block">
              <span className="relative z-10">Servicios Especializados en Sueño Infantil</span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#a3c5e9] z-0"></span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Metodologías respetuosas y personalizadas para mejorar el sueño de tu bebé y recuperar la tranquilidad familiar.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {/* Consultoría Personalizada */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl p-0 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full overflow-hidden border border-gray-100 group">
              <div className="relative overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/6393346/pexels-photo-6393346.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Consultoría de sueño infantil personalizada"
                  width={500}
                  height={300}
                  className="w-full object-cover h-[220px] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-[#4a5d73] text-white text-xs font-semibold py-1.5 px-3 rounded-full">Más solicitado</div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-[#4a5d73] text-xl font-bold mb-3">Consultoría Personalizada de Sueño</h3>
                <p className="text-gray-600 leading-relaxed flex-grow mb-4">
                  Evaluación profesional y plan de sueño a medida para que tu bebé aprenda a dormir mejor. Adaptamos todas nuestras estrategias según la edad, temperamento y necesidades específicas de tu familia.
                </p>
                <Link href="/servicios#consultorias" className="text-[#4a5d73] font-medium hover:text-[#2c3e50] inline-flex items-center transition-colors duration-200">
                  Ver planes disponibles
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Seguimiento Personalizado */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl p-0 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full overflow-hidden border border-gray-100 group">
              <div className="relative overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/3887738/pexels-photo-3887738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Seguimiento personalizado para mejorar el sueño de bebés"
                  width={500}
                  height={300}
                  className="w-full object-cover h-[220px] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-[#4a5d73] text-xl font-bold mb-3">Seguimiento Integral del Sueño</h3>
                <p className="text-gray-600 leading-relaxed flex-grow mb-4">
                  Acompañamiento continuo de 2 a 4 semanas con ajustes diarios a tu plan de sueño. Monitoreo de patrones de sueño y soporte constante para garantizar resultados duraderos y un descanso reparador.
                </p>
                <Link href="/servicios#seguimiento" className="text-[#4a5d73] font-medium hover:text-[#2c3e50] inline-flex items-center transition-colors duration-200">
                  Descubrir opciones
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Planes para Hermanos */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl p-0 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full overflow-hidden border border-gray-100 group">
              <div className="relative overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/6849558/pexels-photo-6849558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Planes de sueño para hermanos y coordinación del descanso familiar"
                  width={500}
                  height={300}
                  className="w-full object-cover h-[220px] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-[#4a5d73] text-xl font-bold mb-3">Planes Especiales para Hermanos</h3>
                <p className="text-gray-600 leading-relaxed flex-grow mb-4">
                  Soluciones coordinadas para mejorar el sueño de hermanos con rutinas sincronizadas. Optimizamos los horarios de descanso de todos los niños del hogar para lograr un descanso familiar completo.
                </p>
                <Link href="/servicios#hermanos" className="text-[#4a5d73] font-medium hover:text-[#2c3e50] inline-flex items-center transition-colors duration-200">
                  Explorar plan hermanos
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Benefits Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 bg-gray-50 p-6 rounded-2xl shadow-lg">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-[#4a5d73] mb-4">¿Por qué elegir nuestros servicios de sueño infantil?</h3>
              <p className="text-gray-600 mb-6">En Por Fin Dormimos combinamos conocimientos científicos con un enfoque respetuoso para transformar el descanso de tu familia:</p>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><strong>Metodología respetuosa</strong> centrada en las necesidades del bebé</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><strong>Asesoras certificadas</strong> con formación especializada</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><strong>Planes 100% personalizados</strong> adaptados a cada familia</span>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <Link href="/servicios" className="bg-[#4a5d73] hover:bg-[#3d4f65] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 inline-flex items-center group">
                <span>Ver todos nuestros servicios</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

{/* Nuestro Equipo Section */}
<section className="py-10 px-5 mx-auto bg-gray-50">
  <div className="max-w-[1200px] mx-auto">
    <div className="text-center mb-10">
      <h2 className="text-4xl font-bold text-gray-800 md:text-3xl relative inline-block">
        <span className="relative z-10">Nuestro Equipo</span>
        <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#a3c5e9] z-0"></span>
      </h2>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      {/* Paula Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Desktop Layout */}
        <div className="relative h-[260px] bg-gradient-to-r from-[#e0eafc]/70 to-[#cfdef3]/90 hidden md:block">
          <div className="absolute bottom-0 right-0 w-[220px] h-[260px]">
            <Image
              src={paulaPhoto}
              alt="Paula García-Borreguero"
              width={220}
              height={260}
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="absolute top-6 left-6 max-w-[60%]">
            <h3 className="text-2xl font-bold text-[#2c3e50] mb-2">Paula García-Borreguero</h3>
            <p className="text-sm font-medium text-[#4a5d73] mb-4">Asesora de Sueño Infantil</p>
          </div>
        </div>
        
        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="bg-gradient-to-r from-[#e0eafc]/70 to-[#cfdef3]/90 p-5">
            <h3 className="text-2xl font-bold text-[#2c3e50] mb-2">Paula García-Borreguero</h3>
            <p className="text-sm font-medium text-[#4a5d73] mb-4">Asesora de Sueño Infantil</p>
          </div>
          <div className="flex justify-center bg-gradient-to-r from-[#e0eafc]/70 to-[#cfdef3]/90 py-2">
            <div className="w-[250px] h-[300px] relative -mt-12 -mb-8">
              <Image
                src={paulaPhoto}
                alt="Paula García-Borreguero"
                width={250}
                height={300}
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 text-sm leading-relaxed">
            Mamá de un peque de 5 años.
            Psicóloga con más de 20 años de experiencia, coach ejecutivo
            y especialista en sueño pediátrico.
          </p>
        </div>
      </div>

      {/* Mónica Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Desktop Layout */}
        <div className="relative h-[260px] bg-gradient-to-r from-[#d4e7fa] to-[#e8f2fd] hidden md:block">
          <div className="absolute bottom-0 right-0 w-[170px] h-[260px] mt-8 mr-6 ">
            <Image
              src={monicaPhoto}
              alt="Mónica Prados Ruiz de Almiron"
              width={170}
              height={200}
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="absolute top-6 left-6 max-w-[60%]">
            <h3 className="text-2xl font-bold text-[#2c3e50] mb-2">Mónica Prados Ruiz de Almiron</h3>
            <p className="text-sm font-medium text-[#4a5d73] mb-4">Asesora de Sueño Infantil</p>
          </div>
        </div>
        
        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="bg-gradient-to-r from-[#d4e7fa] to-[#e8f2fd] p-5">
            <h3 className="text-2xl font-bold text-[#2c3e50] mb-2">Mónica Prados Ruiz de Almiron</h3>
            <p className="text-sm font-medium text-[#4a5d73] mb-4">Asesora de Sueño Infantil</p>
          </div>
          <div className="flex justify-center bg-gradient-to-r from-[#d4e7fa] to-[#e8f2fd] py-2 relative">
            <div className="relative w-[160px] h-[200px] -mt-8 mb-6">
              <Image
                src={monicaPhoto}
                alt="Mónica Prados Ruiz"
                width={160}
                height={200}
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 text-sm leading-relaxed">
          Madre de dos niños menores de 3 años.
          Pediatra especializada en urgencias y cuidados intensivos, especialista en sueño pediátrico, asesora de lactancia e interesada en intervenciones de apego seguro.
          </p>
        </div>
      </div>
    </div>
      
    <div className="text-center mt-10 bg-white p-6 rounded-2xl shadow-md max-w-[800px] mx-auto">
      <p className="text-gray-600 text-lg">
        En Por Fin Dormimos, estamos en constante formación para brindarte las estrategias
        más actuales y efectivas. ¡Juntos lograremos que el sueño de tu bebé sea un éxito!
      </p>
    </div>
  </div>
</section>

      {/* Certificate Section */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-800 md:text-3xl relative inline-block">
              <span className="relative z-10">Certificación SleepyKids</span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#a3c5e9] z-0"></span>
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
            <div className="max-w-[600px] text-left">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                En Por Fin Dormimos contamos con la prestigiosa certificación de SleepyKids, que avala nuestra
                profesionalidad y conocimientos en el área del sueño infantil.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Esta acreditación garantiza que aplicamos metodologías basadas en evidencia científica,
                respetando siempre el desarrollo y las necesidades emocionales de los más pequeños.
              </p>
            </div>
            <div className="relative w-[300px] h-[300px] flex-shrink-0">
              <Image
                src={certificado}
                alt="Certificado SleepyKids"
                width={300}
                height={300}
                className="object-contain transform hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-5 bg-gray-50">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 md:text-3xl relative inline-block">
            <span className="relative z-10">Testimonios</span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#a3c5e9] z-0"></span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-[1000px] mx-auto mt-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 relative">
            <div className="absolute -top-3 -left-3 bg-[#4a5d73] text-white p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <p className="italic text-gray-600 mb-4 mt-2">
              &quot;Mónica fue clara desde el principio y en el proceso han habido momentos complicados pero con constancia lo hemos conseguido.&quot;
            </p>
            <span className="font-bold text-gray-800">— María García</span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 relative">
            <div className="absolute -top-3 -left-3 bg-[#4a5d73] text-white p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <p className="italic text-gray-600 mb-4 mt-2">
              &quot;Nos cambió la vida, realmente es una inversión en salud y mejora el ambiente familiar.&quot;
            </p>
            <span className="font-bold text-gray-800">— Antón García</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-5 text-center bg-gradient-to-r from-[#4a5d73] to-[#2c3e50] text-white">
        <h2 className="text-4xl font-bold mb-6 md:text-3xl">¿List@s para dormir mejor?</h2>
        <p className="text-lg mb-6 max-w-[600px] mx-auto leading-relaxed">
          Ponte en contacto para comenzar tu viaje hacia el descanso ideal. Juntas
          trazaremos un plan personalizado para tu bebé, ¡y tú podrás volver a
          disfrutar de un sueño reparador!
        </p>
        <Link href="/contacto" className="inline-block bg-white text-[#4a5d73] px-8 py-4 rounded-full font-bold transition-all duration-300 hover:bg-[#a3c5e9] hover:text-[#2c3e50] hover:scale-105 shadow-lg">
          Contáctame
        </Link>
      </section>
    </main>
  );
}