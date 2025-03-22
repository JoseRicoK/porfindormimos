"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "@/styles/components.css";
import "@/styles/modern.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Controlar el scroll para aplicar estilos a la navegación
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Cierra el menú al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Cierra el menú cuando se pulsa un enlace
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-2 bg-white/95 shadow-md backdrop-blur-sm' : 'py-4 bg-white/80 backdrop-blur-sm'}`}>
      <div className="container-custom mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo enlaza a Home */}
          <Link href="/" className="flex items-center gap-3 relative z-10">
            <div className="relative w-[55px] h-[55px] overflow-hidden rounded-full shadow-sm">
              <Image
                src="/images/logo.png"
                alt="Por Fin Dormimos"
                width={55}
                height={55}
                className="object-contain"
                priority
                unoptimized
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary">Por Fin Dormimos</span>
              <span className="text-xs text-gray-500 -mt-1">Consultores del sueño infantil</span>
            </div>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/" label="Inicio" onClick={handleLinkClick} />
            <NavLink href="/opiniones" label="Opiniones" onClick={handleLinkClick} />
            <NavLink href="/servicios" label="Servicios" onClick={handleLinkClick} />
            <NavLink href="/blog" label="Blog" onClick={handleLinkClick} />
            
            <Link 
              href="/contacto" 
              onClick={handleLinkClick}
              className="ml-3 btn btn-primary px-5 py-2.5 text-sm font-medium rounded-full transition-all shadow-sm hover:shadow"
            >
              Contacto
            </Link>
          </nav>

          {/* Botón menú móvil */}
          <div className="md:hidden" ref={navRef}>
            <button
              className={`relative w-10 h-10 flex flex-col justify-center items-center rounded-full ${menuOpen ? 'bg-gray-100' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                // Icono X cuando el menú está abierto
                <>
                  <span className="block w-6 h-0.5 bg-gray-700 rounded-full transform rotate-45 absolute"></span>
                  <span className="block w-6 h-0.5 bg-gray-700 rounded-full transform -rotate-45 absolute"></span>
                </>
              ) : (
                // Icono de hamburguesa cuando el menú está cerrado
                <>
                  <span className="block w-6 h-0.5 bg-gray-700 rounded-full mb-1.5"></span>
                  <span className="block w-6 h-0.5 bg-gray-700 rounded-full mb-1.5"></span>
                  <span className="block w-6 h-0.5 bg-gray-700 rounded-full"></span>
                </>
              )}
            </button>
            
            {/* Menú móvil */}
            {menuOpen && (
              <div className="absolute top-full right-0 w-screen h-[calc(100vh-4rem)] bg-white shadow-lg mt-2">
                <div className="container mx-auto py-5 px-4 flex flex-col gap-5">
                  <NavLinkMobile href="/" label="Inicio" onClick={handleLinkClick} />
                  <NavLinkMobile href="/opiniones" label="Opiniones" onClick={handleLinkClick} />
                  <NavLinkMobile href="/servicios" label="Servicios" onClick={handleLinkClick} />
                  <NavLinkMobile href="/blog" label="Blog" onClick={handleLinkClick} />
                  <Link 
                    href="/contacto" 
                    onClick={handleLinkClick}
                    className="btn btn-primary w-full py-3 text-center mt-4 rounded-lg font-medium"
                  >
                    Contacto
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Componente para enlaces de navegación desktop
const NavLink = ({ href, label, onClick }: { href: string; label: string; onClick: () => void }) => {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="relative px-4 py-2 text-gray-800 font-medium text-sm hover:text-[#4a5d73] transition-colors group"
    >
      {label}
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#4a5d73] transition-all duration-300 group-hover:w-1/2"></span>
    </Link>
  );
};

// Componente para enlaces de navegación mobile
const NavLinkMobile = ({ href, label, onClick }: { href: string; label: string; onClick: () => void }) => {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="relative w-full px-2 py-3 text-gray-800 font-medium text-lg border-b border-gray-100 flex justify-between items-center"
    >
      {label}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
};

export default Header;