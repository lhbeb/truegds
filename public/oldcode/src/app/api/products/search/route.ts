import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';
    const limit = parseInt(searchParams.get('limit') || '10');
    
    console.log('Search API called with query:', query, 'limit:', limit);
    
    if (!query.trim()) {
      return NextResponse.json([]);
    }

    const allProducts = await getProducts();
    console.log('Total products loaded:', allProducts.length);
    
    const filteredProducts = allProducts
      .filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      )
      .slice(0, limit);

    console.log('Filtered products found:', filteredProducts.length);
    console.log('First filtered product:', filteredProducts[0] ? {
      id: filteredProducts[0].id,
      slug: filteredProducts[0].slug,
      title: filteredProducts[0].title
    } : 'No products found');

    return NextResponse.json(filteredProducts);
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json({ error: 'Failed to search products' }, { status: 500 });
  }
} 