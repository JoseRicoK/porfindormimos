import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  // Si solo hay una página, no mostramos paginación
  if (totalPages <= 1) return null;

  // Función para generar la URL de paginación
  const getPageUrl = (page: number) => {
    if (page === 1) return basePath;
    return `${basePath}?page=${page}`;
  };

  // Determinar qué páginas mostrar
  const pageNumbers = [];
  const showFirstPage = currentPage > 3;
  const showLastPage = currentPage < totalPages - 2;
  
  // Mostrar siempre las páginas alrededor de la actual
  for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
    pageNumbers.push(i);
  }
  
  // Añadir primera página si corresponde
  if (showFirstPage && !pageNumbers.includes(1)) {
    pageNumbers.unshift(1);
    // Añadir puntos suspensivos si hay un salto
    if (pageNumbers[1] > 2) {
      pageNumbers.splice(1, 0, -1); // -1 indica puntos suspensivos
    }
  }
  
  // Añadir última página si corresponde
  if (showLastPage && !pageNumbers.includes(totalPages)) {
    // Añadir puntos suspensivos si hay un salto
    if (pageNumbers[pageNumbers.length - 1] < totalPages - 1) {
      pageNumbers.push(-1); // -1 indica puntos suspensivos
    }
    pageNumbers.push(totalPages);
  }

  return (
    <nav className="flex justify-center items-center space-x-1 my-8">
      {/* Botón Anterior */}
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-3 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50"
          aria-label="Página anterior"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </Link>
      )}

      {/* Números de página */}
      {pageNumbers.map((pageNum, index) => {
        // Si es -1, mostramos puntos suspensivos
        if (pageNum === -1) {
          return (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
              ...
            </span>
          );
        }

        // Si es la página actual, la destacamos
        if (pageNum === currentPage) {
          return (
            <span
              key={pageNum}
              className="px-3 py-2 rounded-md bg-[#4a5d73] text-white font-medium"
              aria-current="page"
            >
              {pageNum}
            </span>
          );
        }

        // Para las demás páginas, mostramos un enlace
        return (
          <Link
            key={pageNum}
            href={getPageUrl(pageNum)}
            className="px-3 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            {pageNum}
          </Link>
        );
      })}

      {/* Botón Siguiente */}
      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-3 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50"
          aria-label="Página siguiente"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </Link>
      )}
    </nav>
  );
}
