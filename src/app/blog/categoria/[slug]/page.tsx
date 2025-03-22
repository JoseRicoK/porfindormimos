import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
// Importando desde el nuevo módulo
import { getBlogArticles, getBlogCategories } from '@/lib/strapi';
import BlogCard from '@/components/blog/BlogCard';
import Pagination from '@/components/blog/Pagination';
import CategoryList from '@/components/blog/CategoryList';

// Interfaz para la categoría
interface Category {
  id: number;
  attributes?: {
    name: string;
    slug: string;
  };
  // Direct properties for when the data comes without attributes wrapper
  name?: string;
  slug?: string;
}

// Número de artículos por página
const PAGE_SIZE = 9;

// Componente de carga mientras se obtienen los datos
function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-gray-100 rounded-xl overflow-hidden animate-pulse">
          <div className="h-[200px] bg-gray-200" />
          <div className="p-5">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
            <div className="h-8 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Componente para generar metadatos
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const categoriesData = await getBlogCategories();
  const categories = Array.isArray(categoriesData) ? categoriesData : [];
  
  // Find category with the given slug, handling both data structures
  const category = categories.find((c: Category) => {
    const categorySlug = c.attributes?.slug || c.slug || '';
    return categorySlug === slug;
  });
  
  if (!category) {
    return {
      title: 'Categoría no encontrada | Por Fin Dormimos',
      description: 'La categoría que buscas no existe o ha sido eliminada.',
    };
  }
  
  // Get category name, handling both data structures
  const categoryName = category.attributes?.name || category.name || '';
  
  return {
    title: `${categoryName} | Blog Por Fin Dormimos`,
    description: `Artículos sobre ${categoryName} para el sueño infantil y el descanso familiar.`,
  };
}

// Componente principal de categoría
export default async function CategoryPage({ 
  params,
  searchParams 
}: { 
  params: { slug: string },
  searchParams: { page?: string } 
}) {
  const { slug } = params;
  
  // Obtener la página actual de los parámetros de búsqueda
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  
  // Obtener las categorías y verificar si la categoría actual existe
  const categoriesData = await getBlogCategories();
  // categoriesData es directamente el array de categorías
  const categories = Array.isArray(categoriesData) ? categoriesData : [];
  
  console.log('All categories:', JSON.stringify(categories, null, 2));
  
  // Find the current category, handling both data structures
  const currentCategory = categories.find((c: Category) => {
    const categorySlug = c.attributes?.slug || c.slug || '';
    const match = categorySlug === slug;
    console.log(`Category check: ${categorySlug} === ${slug} ? ${match}`);
    return match;
  });
  
  // Si la categoría no existe, mostrar 404
  if (!currentCategory) {
    notFound();
  }
  
  // Get category name and slug, handling both data structures
  const categoryName = currentCategory.attributes?.name || currentCategory.name || '';
  const categorySlug = currentCategory.attributes?.slug || currentCategory.slug || '';
  
  console.log('Using category:', { slug: categorySlug, name: categoryName });
  
  // Obtener los artículos de la categoría actual usando el slug
  // Usar slug en vez de ID para mayor compatibilidad con la API
  console.log(`Requesting articles with category slug: ${categorySlug}`);
  const articlesData = await getBlogArticles(currentPage, PAGE_SIZE, categorySlug);
  
  console.log('Articles response:', JSON.stringify(articlesData, null, 2));
  
  const articles = articlesData?.data || []; 
  console.log(`Found ${articles.length} articles for category ${categoryName}`);
  
  const { pageCount = 1 } = articlesData?.meta?.pagination || {};

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#4a5d73] to-[#3d7d91] text-white py-16 px-5 mt-0">
        <div className="max-w-5xl mx-auto text-center pt-16">  {/* Aumentado a pt-28 para evitar que el header tape el texto */}
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            {categoryName}
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            Artículos y consejos sobre {categoryName.toLowerCase()} para 
            mejorar el sueño infantil y el descanso familiar.
          </p>
        </div>
      </section>

      {/* Contenido del Blog */}
      <section className="py-6 px-5 pt-12">
        <div className="max-w-7xl mx-auto">
          {/* Categorías */}
          <CategoryList 
            categories={categories} 
            activeCategorySlug={slug}
          />

          {/* Artículos del Blog */}
          <Suspense fallback={<BlogSkeleton />}>
            {articles.length > 0 ? (
              <>
                {/* Grid de artículos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map(article => (
                    <BlogCard key={article.id} article={article} />
                  ))}
                </div>
                
                {/* Paginación */}
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={pageCount} 
                  basePath={`/blog/categoria/${slug}`} 
                />
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">No hay artículos en esta categoría</h3>
                <p className="text-gray-600 mb-6">
                  No se han encontrado artículos en la categoría {categoryName}.
                </p>
                <Link 
                  href="/blog"
                  className="inline-flex items-center bg-[#4a5d73] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#3d4f65] transition duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Ver todos los artículos
                </Link>
              </div>
            )}
          </Suspense>
        </div>
      </section>
    </main>
  );
}
