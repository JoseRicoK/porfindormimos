"use strict";

const axios = require('axios');

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
/**
 * @typedef {Object} BlogArticle
 * @property {number} id
 * @property {string} [documentId]
 * @property {Object} [attributes]
 * @property {string} attributes.title
 * @property {string} attributes.slug
 * @property {string} attributes.summary
 * @property {string} attributes.content
 * @property {string} [attributes.publishedDay]
 * @property {string} [attributes.cover]
 * @property {Array} [attributes.categories]
 * @property {string} [title]
 * @property {string} [slug]
 * @property {string} [summary]
 * @property {string} [content]
 * @property {string} [publishedDay]
 * @property {string} [cover]
 * @property {Array} [categories]
 */

/**
 * @typedef {Object} Category
 * @property {number} id
 * @property {Object} [attributes]
 * @property {string} attributes.name
 * @property {string} attributes.slug
 * @property {string} [name]
 * @property {string} [slug]
 */

/**
 * @typedef {Object} PaginatedResponse
 * @property {Array} data
 * @property {Object} meta
 * @property {Object} meta.pagination
 * @property {number} meta.pagination.page
 * @property {number} meta.pagination.pageSize
 * @property {number} meta.pagination.pageCount
 * @property {number} meta.pagination.total
 */

// Funciones para obtener datos del blog
/**
 * Obtiene artículos del blog paginados
 * @param {number} page - Número de página (por defecto 1)
 * @param {number} pageSize - Tamaño de página (por defecto 9)
 * @param {string|number} [categoryFilter] - Filtro por categoría (opcional)
 * @returns {Promise<PaginatedResponse<BlogArticle>|null>} - Resultados paginados o null si hay error
 */
async function getBlogArticles(page = 1, pageSize = 9, categoryFilter = null) {
  try {
    console.log(`Fetching blog articles: page=${page}, pageSize=${pageSize}, categoryFilter=${categoryFilter || 'none'}`);
    
    let filters = {};
    
    // Añadir filtro de categoría si está presente
    if (categoryFilter) {
      if (typeof categoryFilter === 'string') {
        // Para depurar, hagamos log del filtro que se está construyendo
        filters = {
          categories: {
            slug: {
              $eq: categoryFilter
            }
          }
        };
        console.log('Using category filter by slug:', JSON.stringify(filters, null, 2));
      } else if (typeof categoryFilter === 'number') {
        filters = {
          categories: {
            id: {
              $eq: categoryFilter
            }
          }
        };
        console.log('Using category filter by id:', JSON.stringify(filters, null, 2));
      }
    }
    
    // Intentar obtener artículos de /blogs
    try {
      // Si hay filtro de categoría, lo construimos como string query para mayor compatibilidad
      let url = '/blogs';
      let queryParams = {
        populate: '*',
        pagination: {
          page,
          pageSize
        },
        sort: ['publishedDay:desc']
      };
      
      // Añadir filtros si existen
      if (Object.keys(filters).length > 0) {
        queryParams.filters = filters;
        console.log('Full query params:', JSON.stringify(queryParams, null, 2));
      }
      
      const response = await strapiApi.get(url, { params: queryParams });
      
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
      // Diagnosticar si es un problema de permisos
      if (error?.response?.status === 403) {
        console.error('Error 403 (Forbidden) al obtener artículos del blog. Verifica permisos en Strapi (Settings -> Roles & Permissions -> Public -> Blogs -> find)');
      } else {
        console.error('Error fetching blog articles:', error);
      }
      return { data: [], meta: { pagination: { page, pageSize, pageCount: 0, total: 0 } } };
    }
  } catch (error) {
    console.error('Error general en getBlogArticles:', error);
    return { data: [], meta: { pagination: { page, pageSize, pageCount: 0, total: 0 } } };
  }
}

/**
 * Obtiene un artículo de blog por su slug
 * @param {string} slug - Slug del artículo
 * @returns {Promise<BlogArticle|null>} - Artículo o null si no se encuentra
 */
async function getBlogArticleBySlug(slug) {
  try {
    if (!slug) {
      console.error('getBlogArticleBySlug called with empty slug');
      return null;
    }
    
    // Intentar obtener artículo de /blogs con filtro por slug
    try {
      const response = await strapiApi.get(`/blogs`, {
        params: {
          filters: {
            slug: {
              $eq: slug
            }
          },
          populate: '*'
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
  } catch (error) {
    console.error('Error general en getBlogArticleBySlug:', error);
    return null;
  }
}

/**
 * Obtiene las categorías del blog
 * @returns {Promise<Category[]>} - Lista de categorías o array vacío si hay error
 */
async function getBlogCategories() {
  try {
    // Obtener categorías
    const response = await strapiApi.get(`/categories`);
    
    if (!response?.data?.data) {
      console.warn('Categories API returned no data array');
      return [];
    }
    
    console.log('Categories from Strapi:', JSON.stringify(response.data.data, null, 2));
    return response.data.data; // Retorna directamente la data sin modificar
  } catch (error) {
    // Diagnosticar si es un problema de permisos
    if (error?.response?.status === 403) {
      console.error('Error 403 (Forbidden) al obtener categorías. Verifica permisos en Strapi (Settings -> Roles & Permissions -> Public -> Categories -> find)');
    } else {
      console.error('Error fetching blog categories:', error);
    }
    return [];
  }
}

/**
 * Obtiene la URL completa para una imagen de Strapi
 * @param {string} imageUrl - URL relativa de la imagen
 * @returns {string} - URL completa de la imagen
 */
function getStrapiImageUrl(imageUrl) {
  if (!imageUrl) {
    console.warn('getStrapiImageUrl called with empty URL');
    return '';
  }
  
  // Si la URL ya es absoluta, devolverla tal cual
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Si es una URL relativa, añadir el API_URL
  return `${API_URL}${imageUrl}`;
}

/**
 * Formatea una fecha en formato legible
 * @param {string} dateString - Fecha en formato ISO
 * @returns {string} - Fecha formateada
 */
function formatDate(dateString) {
  if (!dateString) return '';
  
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', options);
}

module.exports = {
  getBlogArticles,
  getBlogArticleBySlug,
  getBlogCategories,
  getStrapiImageUrl,
  formatDate
};
