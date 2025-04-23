"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import "@/styles/components.css";
import "@/styles/modern.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 pt-16 pb-8 border-t border-gray-200">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Logo and About */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-[50px] h-[50px] overflow-hidden rounded-full shadow-sm">
                <Image
                  src="/images/logo.png"
                  alt="Por Fin Dormimos"
                  width={50}
                  height={50}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-800">Por Fin Dormimos</span>
                <span className="text-xs text-gray-500">Descanso familiar</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Expertos en mejorar la calidad del sueño de bebés y niños, acompañando a familias en este importante proceso.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-3 mt-5">
              <SocialIcon href="https://www.instagram.com/porfindormimos.es" label="Instagram" icon="instagram" />
            </div>
          </div>

          {/* Column 2: Servicios */}
          <div>
            <h3 className="text-md font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Servicios</h3>
            <nav className="flex flex-col space-y-3">
              <FooterLink href="/servicios" label="Asesoría individual" />
              <FooterLink href="/servicios" label="Asesoría de sueño" />
              <FooterLink href="/servicios" label="Talleres y cursos" />
              <FooterLink href="/servicios" label="Consultas online" />
            </nav>
          </div>

          {/* Column 3: Enlaces rápidos */}
          <div>
            <h3 className="text-md font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Enlaces rápidos</h3>
            <nav className="flex flex-col space-y-3">
              <FooterLink href="/" label="Inicio" />
              <FooterLink href="/opiniones" label="Opiniones" />
              <FooterLink href="/blog" label="Blog" />
              <FooterLink href="/contacto" label="Contacto" />
            </nav>
          </div>

          {/* Column 4: Contacto */}
          <div>
            <h3 className="text-md font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Contacto</h3>
            <div className="flex flex-col space-y-3 text-gray-600 text-sm">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>porfindormimos@gmail.com</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+34 699 851 245</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Madrid, España</span>
              </div>
            </div>
            <Link 
              href="/contacto"
              className="mt-6 inline-block btn btn-primary py-2 px-4 rounded-lg text-sm font-medium"
            >
              Contacta
            </Link>
          </div>
        </div>
        
        {/* Bottom Bar / Copyright */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {currentYear} Por Fin Dormimos. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-xs text-gray-500">
            <Link href="/politica-de-privacidad" className="hover:text-gray-700 transition-colors duration-300">
              Política de Privacidad
            </Link>
            <Link href="/politica-de-cookies" className="hover:text-gray-700 transition-colors duration-300">
              Política de Cookies
            </Link>
            <Link href="/aviso-legal" className="hover:text-gray-700 transition-colors duration-300">
              Aviso Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Componente para enlaces del footer
const FooterLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link href={href} className="text-gray-600 hover:text-[#4a5d73] transition-colors duration-300 text-sm hover-link">
      {label}
    </Link>
  );
};

// Componente para iconos sociales
const SocialIcon = ({ href, label, icon }: { href: string; label: string; icon: string }) => {
  // Aplicar estilos específicos para Instagram
  const isInstagram = icon === 'instagram';
  
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`bg-white ${isInstagram ? 'hover:bg-purple-600 hover:border-purple-700' : 'hover:bg-gray-50'} shadow-sm hover:shadow p-2 rounded-full transition-all duration-300 border border-gray-200 ${isInstagram ? 'group' : ''}`}
      aria-label={label}
    >
      <Image 
        src={`/icons/${icon}.svg`} 
        alt={label} 
        width={20} 
        height={20} 
        className={`w-5 h-5 ${isInstagram ? 'group-hover:invert group-hover:brightness-0 group-hover:contrast-100' : ''}`} 
        unoptimized 
      />
    </a>
  );
};