import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
// Importando desde el nuevo módulo
import { getBlogArticleBySlug, formatDate, getStrapiImageUrl } from '@/lib/strapi';
import RelatedArticles from '@/components/blog/RelatedArticles';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Generar los metadatos para la página
export async function generateMetadata({ params }: { params: { slug: string } }) {
  if (!params || !params.slug) {
    console.error('No slug provided to generateMetadata', params);
    return {
      title: 'Artículo no encontrado | Por Fin Dormimos',
      description: 'El artículo que buscas no existe o ha sido eliminado.',
    };
  }
  
  const article = await getBlogArticleBySlug(params.slug);
  
  if (!article) {
    return {
      title: 'Artículo no encontrado | Por Fin Dormimos',
      description: 'El artículo que buscas no existe o ha sido eliminado.',
    };
  }
  
  // Extract title and summary regardless of the structure
  const title = article.attributes?.title || article.title || 'Artículo';
  const summary = article.attributes?.summary || article.summary || 'Por Fin Dormimos - Blog';
  
  // Get image URL if available
  let imageUrl = '';
  if (article.attributes?.coverImage?.data?.attributes?.url) {
    imageUrl = getStrapiImageUrl(article.attributes.coverImage.data.attributes.url);
  } else if (article.coverImage?.url) {
    imageUrl = getStrapiImageUrl(article.coverImage.url);
  }
  
  return {
    title: `${title} | Por Fin Dormimos`,
    description: summary,
    openGraph: {
      title: title,
      description: summary,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
  };
}

// Definición clara de tipos para los parámetros
type SlugParams = {
  slug: string;
};

// Componente principal de artículo
export default async function ArticlePage({ params }: { params: SlugParams }) {
  if (!params || !params.slug) {
    console.error('ArticlePage called with no slug', params);
    notFound();
  }
  
  const article = await getBlogArticleBySlug(params.slug);
  
  // Si no se encuentra el artículo, redireccionar a 404
  if (!article) {
    console.error('Article not found for slug:', params.slug);
    notFound();
  }
  
  // Extract properties from article, handling both data structures
  const title = article.attributes?.title || article.title || '';
  const content = article.attributes?.content || article.content || '';
  const publishedDay = article.attributes?.publishedDay || article.publishedDay || '';
  
  // Handle coverImage in both data structures
  let imageUrl = '/images/blog-placeholder.jpg';
  if (article.attributes?.coverImage?.data?.attributes?.url) {
    imageUrl = getStrapiImageUrl(article.attributes.coverImage.data.attributes.url);
  } else if (article.coverImage?.url) {
    imageUrl = getStrapiImageUrl(article.coverImage.url);
  }
  
  // Handle category in both data structures
  let categoryName = '';
  let categorySlug = '';
  if (article.attributes?.category?.data?.attributes) {
    categoryName = article.attributes.category.data.attributes.name || '';
    categorySlug = article.attributes.category.data.attributes.slug || '';
  } else if (article.categories && article.categories.length > 0) {
    categoryName = article.categories[0].name || '';
    categorySlug = article.categories[0].slug || '';
  }
  
  // Handle author in both data structures
  let authorName = 'Equipo Por Fin Dormimos';
  let authorAvatar = '';
  
  console.log('Article author data:', JSON.stringify(article.attributes?.author || article.author, null, 2));
  
  if (article.attributes?.author?.data?.attributes) {
    authorName = article.attributes.author.data.attributes.name || authorName;
    console.log('Author name from attributes:', authorName);
    
    if (article.attributes.author.data.attributes.avatar?.data?.attributes?.url) {
      const avatarUrl = article.attributes.author.data.attributes.avatar.data.attributes.url;
      console.log('Raw avatar URL from attributes:', avatarUrl);
      authorAvatar = getStrapiImageUrl(avatarUrl);
      console.log('Processed avatar URL:', authorAvatar);
    } else {
      console.log('No avatar URL found in attributes structure');
    }
  } else if (article.author) {
    authorName = article.author.name || authorName;
    console.log('Author name from article.author:', authorName);
    
    if (article.author.avatar?.url) {
      const avatarUrl = article.author.avatar.url;
      console.log('Raw avatar URL from article.author:', avatarUrl);
      authorAvatar = getStrapiImageUrl(avatarUrl);
      console.log('Processed avatar URL:', authorAvatar);
    } else {
      console.log('No avatar URL found in article.author structure');
    }
  } else {
    console.log('No author information found in article');
  }
  
  const formattedDate = publishedDay ? formatDate(publishedDay) : '';

  return (
    <main>
      {/* Hero del Artículo */}
      <section className="pt-28 pb-8 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            {categoryName && (
              <Link 
                href={`/blog/categoria/${categorySlug}`}
                className="bg-[#4a5d73] text-white text-sm py-1 px-4 rounded-full inline-block mb-4 hover:bg-[#3d4f65] transition-colors"
              >
                {categoryName}
              </Link>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              {title}
            </h1>
            <div className="flex items-center text-gray-600 text-sm md:text-base">
              <div className="flex items-center mr-4">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2 relative bg-gray-200">
                  {authorAvatar ? (
                    <Image 
                      src={authorAvatar}
                      alt={authorName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    // Mostrar iniciales del autor si no hay avatar
                    <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-xs font-bold">
                      {authorName.split(' ').map(name => name[0]).join('').toUpperCase().substring(0, 2)}
                    </div>
                  )}
                </div>
                <span>{authorName}</span>
              </div>
              <span>•</span>
              <span className="ml-4">{formattedDate}</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Imagen de Portada */}
      <section className="mb-12 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
            <Image 
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </section>
      
      {/* Contenido del Artículo */}
      <section className="pb-16 px-5">
        <div className="max-w-3xl mx-auto">
          {/* Contenido formateado desde Strapi (Markdown) */}
          <article className="prose prose-lg max-w-none">
            <div className="blog-content">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  // La personalización de componentes es la forma recomendada para aplicar estilos en react-markdown
                  p: ({...props}) => <p className="mb-4" {...props} />,
                  h1: ({...props}) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
                  h2: ({...props}) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
                  h3: ({...props}) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
                  h4: ({...props}) => <h4 className="text-lg font-bold mt-5 mb-3" {...props} />,
                  a: ({...props}) => <a className="text-blue-600 hover:text-blue-800 hover:underline" {...props} />,
                  ul: ({...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
                  ol: ({...props}) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                  li: ({...props}) => <li className="mb-1" {...props} />,
                  blockquote: ({...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600" {...props} />,
                  img: ({src, alt, ...props}) => {
                    const imgAlt = alt || 'Imagen del blog';
                    // For markdown images, we'll add proper alt attributes but keep them as img tags
                    // We could disable the ESLint rule but we'll keep the warning visible as a reminder to optimize later
                    return <div className="my-4 max-w-full overflow-hidden">
                      {/* Using img instead of Image because we don't know dimensions in advance */}
                      <img 
                        className="rounded-lg shadow-md max-w-full h-auto" 
                        src={src || ''}
                        alt={imgAlt}
                        loading="lazy"
                        {...props}
                      />
                    </div>;
                  }
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </article>
          
          {/* Línea separadora */}
          <div className="border-t border-gray-200 my-12"></div>
          
          {/* Sección de compartir */}
          <div className="flex flex-wrap items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-700 font-medium mb-2">Comparte este artículo:</p>
              <div className="flex space-x-3">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(global.window?.location.href || '')}`} target="_blank" rel="noopener noreferrer" className="bg-[#3b5998] text-white p-2 rounded-full hover:opacity-90 transition-opacity">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(global.window?.location.href || '')}`} target="_blank" rel="noopener noreferrer" className="bg-[#1da1f2] text-white p-2 rounded-full hover:opacity-90 transition-opacity">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - ${global.window?.location.href || ''}`)}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white p-2 rounded-full hover:opacity-90 transition-opacity">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <Link
              href="/blog"
              className="inline-flex items-center text-[#3d7d91] hover:text-[#4a5d73] transition-colors font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Volver al blog
            </Link>
          </div>
          
          {/* Artículos relacionados */}
          <RelatedArticles 
            categorySlug={categorySlug} 
            currentArticleId={article.id} 
          />
        </div>
      </section>
      
      {/* CTA Final */}
      <section className="bg-[#f8fafc] py-16 px-5 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">¿Necesitas ayuda con el sueño de tu bebé?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubre nuestros servicios personalizados para mejorar el descanso de tu bebé y de toda la familia.
            Agenda una consulta gratuita y comienza a dormir mejor.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/servicios"
              className="bg-[#4a5d73] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#3d4f65] transition duration-200"
            >
              Ver servicios
            </Link>
            
            <Link
              href="/contacto"
              className="bg-white text-[#4a5d73] border border-[#4a5d73] px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition duration-200"
            >
              Agenda una consulta
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
