import axios from 'axios';

// Configuración de la API de Strapi
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

// Cliente Axios configurado
const strapiApi = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
    'Origin': 'http://localhost:3000',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Tipos de datos para los artículos de blog
export interface BlogArticle {
  id: number;
  documentId?: string;
  attributes?: {
    title: string;
    slug: string;
    content: string;
    summary: string;
    coverImage?: {
      data?: {
        attributes?: {
          url: string;
          alternativeText?: string;
        }
      }
    };
    category?: {
      data?: {
        id: number;
        attributes?: {
          name: string;
          slug: string;
        }
      }
    };
    author?: {
      data?: {
        id: number;
        attributes?: {
          name: string;
          avatar?: {
            data?: {
              attributes?: {
                url: string;
              }
            }
          }
        }
      }
    };
    publishedDay?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  // Direct properties for when data comes without attributes wrapper
  title?: string;
  slug?: string;
  content?: string;
  summary?: string;
  coverImage?: {
    url?: string;
    alternativeText?: string;
  };
  categories?: Array<Category>;
  author?: {
    id: number;
    name: string;
    slug?: string;
    bio?: string;
    avatar?: {
      url?: string;
    };
  };
  publishedDay?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

// Interfaz para categorías
export interface Category {
  id: number;
  attributes?: {
    name: string;
    slug: string;
    description?: string;
  };
  // Propiedades directas para cuando los datos vienen sin el wrapper de atributos
  name?: string;
  slug?: string;
  description?: string;
}

// Interfaz para servicios
export interface Service {
  id: number;
  attributes?: {
    title: string;
    price: number;
  };
  // Propiedades directas para cuando los datos vienen sin el wrapper de atributos
  title?: string;
  price?: number;
}

// Interfaz para las respuestas paginadas
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  }
}

// Funciones para obtener datos del blog
export async function getBlogArticles(page = 1, pageSize = 9, categoryFilter?: string | number) {
  try {
    console.log(`Fetching blog articles: page=${page}, pageSize=${pageSize}, categoryFilter=${categoryFilter || 'none'}`);
    
    // Handle both category ID and slug
    let filters = {};
    if (categoryFilter) {
      if (typeof categoryFilter === 'number') {
        console.log('Filtering by category ID:', categoryFilter);
        filters = { 
          'categories': {
            'id': {
              '$eq': categoryFilter
            }
          } 
        };
      } else if (typeof categoryFilter === 'string') {
        console.log('Filtering by category slug:', categoryFilter);
        filters = { 
          'categories': {
            'slug': {
              '$eq': categoryFilter
            }
          } 
        };
      }
      console.log('Applied filters:', JSON.stringify(filters, null, 2));
    }
      
    console.log('Fetching blog articles with URL:', `${API_URL}/api/blogs`);
    try {
      const response = await strapiApi.get<PaginatedResponse<BlogArticle>>('/blogs', {
        params: {
          populate: '*',
          pagination: {
            page,
            pageSize
          },
          sort: ['publishedDay:desc'],
          filters
        }
      });
      
      console.log('Blog API response meta:', JSON.stringify(response.data.meta, null, 2));
      console.log(`Blog API received ${response.data.data?.length || 0} articles`);
    
      if (!response.data.data) {
        console.warn('Blog API returned no data array');
        return { data: [], meta: { pagination: { page, pageSize, pageCount: 0, total: 0 } } };
      }
      
      // Log if any articles have missing slug
      const articlesWithMissingData = response.data.data.filter(article => {
        // Check if article has either attributes.slug or a direct slug property
        const hasSlug = (article.attributes?.slug) || article.slug;
        // Article must have either title under attributes or directly
        const hasTitle = (article.attributes?.title) || article.title;
        
        return !hasSlug || !hasTitle;
      });
      
      if (articlesWithMissingData.length > 0) {
        console.error(`Found ${articlesWithMissingData.length} articles with missing slug or title`, 
          JSON.stringify(articlesWithMissingData, null, 2));
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching blog articles:', error);
      return { data: [], meta: { pagination: { page, pageSize, pageCount: 0, total: 0 } } };
    }
  } catch (error) {
    console.error('Error general en getBlogArticles:', error);
    return { data: [], meta: { pagination: { page, pageSize, pageCount: 0, total: 0 } } };
  }
}

export async function getBlogArticleBySlug(slug: string) {
  try {
    if (!slug) {
      console.error('getBlogArticleBySlug called with empty slug');
      return null;
    }
    
    console.log(`Fetching article with slug: ${slug}`);
    
    const response = await strapiApi.get<{ data: BlogArticle[] }>('/blogs', {
      params: {
        populate: '*',
        filters: {
          slug: {
            $eq: slug
          }
        }
      }
    });

    if (!response.data.data || response.data.data.length === 0) {
      console.warn(`No blog article found for slug: ${slug}`);
      return null;
    }
    
    return response.data.data[0];
  } catch (error) {
    console.error(`Error fetching blog article with slug ${slug}:`, error);
    return null;
  }
}

export async function getBlogCategories() {
  try {
    const response = await strapiApi.get<{ data: Category[] }>('/categories', {
      params: {
        populate: '*'
      }
    });
    
    if (!response.data.data) {
      return [];
    }
    
    return response.data.data;
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return [];
  }
}

// Función para obtener los servicios de Strapi
export async function getServices() {
  try {
    console.log('Fetching services from Strapi');
    const response = await strapiApi.get<{ data: Service[] }>('/servicios', {
      params: {
        populate: '*'
      }
    });
    
    if (!response.data.data) {
      console.warn('Service API returned no data array');
      return [];
    }
    
    return response.data.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export function getStrapiImageUrl(imageUrl: string): string {
  if (!imageUrl) return '';
  
  // Si la URL ya es absoluta (comienza con http:// o https://), devolverla tal cual
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Si es una URL relativa (comienza con / o no), añadir la URL base de la API
  return `${API_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
}

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '';
  
  try {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}
