import Link from 'next/link';

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

interface CategoryListProps {
  categories: Category[];
  activeCategorySlug?: string;
}

export default function CategoryList({ categories, activeCategorySlug }: CategoryListProps) {
  // Si no hay categorías o hay un error, mostrar un mensaje
  if (!categories || categories.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Categorías</h2>
        <p className="text-gray-500 italic">No hay categorías disponibles.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Link
        href="/blog"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !activeCategorySlug 
            ? 'bg-[#4a5d73] text-white' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Todos
      </Link>
      
      {categories.map((category) => {
        // Check if the category data is nested under attributes or directly on the object
        const name = category.attributes?.name || category.name || '';
        const slug = category.attributes?.slug || category.slug || '';
        
        // Skip if no slug is available
        if (!slug) {
          console.warn('Category missing slug:', category);
          return null;
        }
        
        return (
          <Link
            key={category.id}
            href={`/blog/categoria/${slug}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategorySlug === slug 
                ? 'bg-[#4a5d73] text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {name}
          </Link>
        );
      })}
    </div>
  );
}
