import { getBlogArticles } from '@/lib/strapi';
import BlogCard from './BlogCard';

interface RelatedArticlesProps {
  categorySlug?: string; 
  currentArticleId: number;
  limit?: number;
}

export default async function RelatedArticles({ 
  categorySlug, 
  currentArticleId,
  limit = 3 
}: RelatedArticlesProps) {
  // Obtener artículos relacionados (de la misma categoría si es posible)
  const articlesData = await getBlogArticles(1, limit + 1, categorySlug);
  
  // Filtrar el artículo actual y limitar la cantidad
  const relatedArticles = articlesData.data
    .filter(article => article.id !== currentArticleId)
    .slice(0, limit);
  
  // Si no hay artículos relacionados, no mostrar nada
  if (relatedArticles.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Artículos relacionados</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedArticles.map(article => (
          <BlogCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
