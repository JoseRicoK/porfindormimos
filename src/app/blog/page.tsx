import { Suspense } from 'react';
// Importando desde el nuevo módulo
import { getBlogArticles, getBlogCategories, BlogArticle } from '@/lib/strapi';
import BlogCard from '@/components/blog/BlogCard';
import Pagination from '@/components/blog/Pagination';
import CategoryList from '@/components/blog/CategoryList';

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

// Componente principal del blog
export default async function BlogPage({ 
  searchParams 
}: { 
  searchParams: { page?: string } 
}) {
  // Obtener la página actual de los parámetros de búsqueda
  // In Next.js 15, we need to handle searchParams properly
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams?.page;
  const currentPage = page ? parseInt(page) : 1;
  
  // Obtener los artículos del blog y las categorías
  const articlesData = await getBlogArticles(currentPage, PAGE_SIZE);
  const categoriesData = await getBlogCategories();
  
  console.log('Categories raw data:', JSON.stringify(categoriesData, null, 2));
  
  const articles = articlesData?.data || [];
  // categoriesData ya es un array directamente desde getBlogCategories
  const categories = Array.isArray(categoriesData) ? categoriesData : [];
  
  console.log('Categories processed:', JSON.stringify(categories, null, 2));
  const { pageCount = 1 } = articlesData?.meta?.pagination || {};

  // Filtrar artículos que no tienen slug para evitar errores
  const validArticles = articles.filter((article: BlogArticle) => {
    // Check for slug in either location (attributes or direct)
    const hasSlug = article?.attributes?.slug || article?.slug;
    // Check for title in either location (attributes or direct)
    const hasTitle = article?.attributes?.title || article?.title;
    return !!hasSlug && !!hasTitle;
  });

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#4a5d73] to-[#3d7d91] text-white py-16 px-5 mt-0">
        <div className="max-w-5xl mx-auto text-center pt-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Por Fin Dormimos</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            Consejos, información y guías sobre el sueño infantil para ayudarte a conseguir 
            noches tranquilas para toda la familia.
          </p>
        </div>
      </section>

      {/* Contenido del Blog */}
      <section className="py-6 px-5 pt-12">
        <div className="max-w-7xl mx-auto">
          {/* Categorías */}
          <CategoryList categories={categories} />

          {/* Artículos del Blog */}
          <Suspense fallback={<BlogSkeleton />}>
            {validArticles.length > 0 ? (
              <>
                {/* Grid de artículos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                  {validArticles.map((article: BlogArticle) => (
                    <div key={article.id} className="h-full">
                      <BlogCard article={article} />
                    </div>
                  ))}
                </div>
                
                {/* Paginación */}
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={pageCount} 
                  basePath="/blog" 
                />
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">No se pueden mostrar los artículos</h3>
                <p className="text-gray-600 mb-6">
                  Error 403: No tienes permisos para acceder al contenido del blog.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 max-w-2xl mx-auto text-left">
                  <p className="text-yellow-700">
                    <strong>Información para desarrolladores:</strong> Necesitas configurar los permisos en el panel de administración de Strapi.
                  </p>
                  <ol className="list-decimal pl-5 mt-2 text-yellow-700">
                    <li>Accede a <code className="bg-yellow-100 px-1 rounded">http://localhost:1337/admin</code></li>
                    <li>Ve a Settings → Roles & Permissions</li>
                    <li>Selecciona el rol &quot;Public&quot;</li> 
                    <li>Habilita los permisos &quot;find&quot; y &quot;findOne&quot; para Blogs y Categories</li>
                    <li>Guarda los cambios</li>
                  </ol>
                </div>
              </div>
            )}
          </Suspense>
        </div>
      </section>

      {/* CTA Newsletter */}
      <section className="bg-gray-50 py-16 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">¿Te gusta nuestro contenido?</h2>
          <p className="text-gray-600 mb-8">
            Suscríbete a nuestro newsletter para recibir los últimos artículos, consejos y
            novedades directamente en tu correo electrónico.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4a5d73]"
              required
            />
            <button
              type="submit"
              className="bg-[#4a5d73] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#3d4f65] transition duration-200"
            >
              Suscribirme
            </button>
          </form>
          
          <p className="text-xs text-gray-500 mt-4">
            Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
          </p>
        </div>
      </section>
    </main>
  );
}