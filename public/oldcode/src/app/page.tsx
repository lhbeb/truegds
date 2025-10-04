import React, { Suspense } from 'react';
import Hero from '@/components/Hero';
import FeaturedProduct from '@/components/FeaturedProduct';
import ProductGrid from '@/components/ProductGrid';
import HomeReviews from '@/components/HomeReviews';
import { getProducts } from '@/lib/data';
import { homeReviews, homeReviewsStats } from '@/lib/homeReviews';
import ScrollToTop from '@/components/ScrollToTop';
import type { Product } from '@/types/product';

function getRandomProducts(products: Product[], count: number): Product[] {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default async function HomePage() {
  // Fetch all products just once
  const allProducts = await getProducts(); 
  
  // Pick 4 random featured products
  const featuredProducts = getRandomProducts(allProducts, 4);

  return (
    <>
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
      <Hero />
      
      <section id="featured" className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Check out our handpicked selection of premium electronics and photography equipment.
            </p>
          </div>
          <div className="space-y-12">
            {featuredProducts.map((product) => (
              <FeaturedProduct key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      <Suspense fallback={null}>
        <ProductGrid products={allProducts} />
      </Suspense>
      
      <HomeReviews 
        reviews={homeReviews}
        averageRating={homeReviewsStats.averageRating}
        totalReviews={homeReviewsStats.totalReviews}
      />
    </>
  );
}
