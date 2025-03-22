import Image from 'next/image';
import Link from 'next/link';
// Importando desde el nuevo módulo
import { formatDate, getStrapiImageUrl } from '@/lib/strapi';

// Importamos la interfaz desde el módulo strapi para reutilizarla
import { BlogArticle } from '@/lib/strapi';

interface BlogCardProps {
  article: BlogArticle;
}

export default function BlogCard({ article }: BlogCardProps) {
  // Add null checks to prevent errors
  if (!article) {
    console.error('Article is undefined');
    return null;
  }

  console.log('BlogCard received article:', JSON.stringify(article, null, 2));

  // Check if data is in attributes or directly on the article
  const title = article.attributes?.title || article.title || '';
  const slug = article.attributes?.slug || article.slug || '';
  const summary = article.attributes?.summary || article.summary || '';
  const publishedDay = article.attributes?.publishedDay || article.publishedDay || '';
  
  // If slug is missing, we can't render the card properly
  if (!slug) {
    console.error('Article slug is missing', article);
    return null;
  }
  
  // Handle coverImage in both data structures
  let imageUrl = '/images/blog-placeholder.jpg';
  let imageAlt = title || '';
  
  if (article.attributes?.coverImage?.data?.attributes?.url) {
    imageUrl = getStrapiImageUrl(article.attributes.coverImage.data.attributes.url);
    imageAlt = article.attributes.coverImage.data.attributes.alternativeText || title || '';
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
  
  const formattedDate = publishedDay ? formatDate(publishedDay) : '';

  // Componente para tarjeta de blog
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-[450px]">
      <div className="relative h-[200px] w-full">
        <Image 
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {categoryName && (
          <Link 
            href={`/blog/categoria/${categorySlug}`}
            className="absolute top-3 left-3 bg-[#4a5d73] text-white text-xs py-1 px-2 rounded-full"
          >
            {categoryName}
          </Link>
        )}
      </div>
      <div className="p-5 flex flex-col h-[250px]">
        <p className="text-gray-500 text-xs mb-2">{formattedDate}</p>
        <h3 className="text-lg font-bold text-gray-800 mb-2 h-[60px] line-clamp-2">
          <Link href={`/blog/${slug}`} className="hover:text-[#3d7d91] transition-colors">
            {title}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-4 h-[100px] line-clamp-3">{summary}</p>
        <div className="mt-auto">
          <Link 
            href={`/blog/${slug}`}
            className="text-[#3d7d91] font-medium hover:underline text-sm inline-flex items-center"
          >
            Leer más
            <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
