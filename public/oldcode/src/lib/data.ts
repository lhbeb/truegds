import 'server-only';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import type { Product } from '@/types/product';

const PRODUCTS_DIR = join(process.cwd(), 'src/lib/products-raw');

// In-memory cache for products during request lifecycle
let productsCache: Product[] | null = null;

/**
 * Read all product JSON files and return typed Product objects
 * Uses in-memory caching to prevent repeated disk reads
 */
export async function getProducts(): Promise<Product[]> {
  // Return cached products if available
  if (productsCache !== null) {
    return productsCache;
  }

  try {
    const productDirs = readdirSync(PRODUCTS_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    const products: Product[] = [];

    for (const dir of productDirs) {
      const productPath = join(PRODUCTS_DIR, dir, 'product.json');
      const productData = JSON.parse(readFileSync(productPath, 'utf-8'));
      
      // Transform the JSON data to match our Product interface
      const product: Product = {
        id: productData.slug,
        slug: productData.slug,
        title: productData.title,
        description: productData.description,
        price: productData.price,
        rating: productData.rating,
        reviewCount: productData.reviewCount,
        images: productData.images,
        condition: productData.condition,
        category: productData.category,
        brand: productData.brand,
        payeeEmail: productData.payeeEmail,
        currency: productData.currency,
        checkoutLink: productData.checkoutLink,
        reviews: productData.reviews || [],
        meta: productData.meta || {},
      };

      products.push(product);
    }

    // Cache the results
    productsCache = products;
    return products;
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

/**
 * Get featured products (first 4 products for now)
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.slice(0, 4);
}

/**
 * Get all products (alias for getProducts for consistency)
 */
export async function getAllProducts(): Promise<Product[]> {
  return getProducts();
}

/**
 * Clear the products cache (useful for development or when data changes)
 */
export function clearProductsCache(): void {
  productsCache = null;
}

/**
 * Get a single product by its slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const productPath = join(PRODUCTS_DIR, slug, 'product.json');
    const productData = JSON.parse(readFileSync(productPath, 'utf-8'));
    
    const product: Product = {
      id: productData.slug,
      slug: productData.slug,
      title: productData.title,
      description: productData.description,
      price: productData.price,
      rating: productData.rating,
      reviewCount: productData.reviewCount,
      images: productData.images,
      condition: productData.condition,
      category: productData.category,
      brand: productData.brand,
      payeeEmail: productData.payeeEmail,
      currency: productData.currency,
      checkoutLink: productData.checkoutLink,
      reviews: productData.reviews || [],
      meta: productData.meta || {},
    };

    return product;
  } catch (error) {
    console.error(`Error loading product ${slug}:`, error);
    return null;
  }
}

/**
 * Get products by category
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Search products by title, description, or brand
 */
export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getProducts();
  const searchTerm = query.toLowerCase();
  
  return products.filter(product => 
    product.title.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
} 