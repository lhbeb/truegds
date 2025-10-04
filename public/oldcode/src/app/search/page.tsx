import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/data';

export default async function SearchPage(props: any) {
  const searchParams = props?.searchParams || {};
  const allProducts = await getProducts();
  const query = (searchParams.query || '').toLowerCase();
  const filtered = query
    ? allProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      )
    : allProducts;

  return (
    <main className="min-h-screen bg-gray-50">
      <ProductGrid products={filtered} />
    </main>
  );
} 