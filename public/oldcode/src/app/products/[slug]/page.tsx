import { getProductBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import ProductPageClient from './ProductPageClient';
import type { Metadata, ResolvingMetadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://happydeel.com';

// @ts-expect-error Next.js app directory dynamic page/metadata functions do not support typing the params argument yet
export async function generateMetadata({ params }, parent: ResolvingMetadata): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found | HappyDeel',
    };
  }

  const title = `${product.title} - ${product.brand} | ${product.category} | HappyDeel`;
  const description = product.description.substring(0, 155) + '...';
  const canonicalUrl = `${BASE_URL}/products/${product.slug}`;

  return {
    title,
    description,
    keywords: product.meta?.keywords || `${product.title}, ${product.brand}, ${product.category}`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'HappyDeel',
      images: product.images.map(img => ({ url: new URL(img, BASE_URL).toString() })),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.images.map(img => new URL(img, BASE_URL).toString()),
    },
  };
}

// @ts-expect-error Next.js app directory dynamic page/metadata functions do not support typing the params argument yet
export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  // Generate Product Schema for Rich Snippets
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "image": product.images.map(img => new URL(img, BASE_URL).toString()),
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "category": product.category,
    "sku": product.slug,
    "condition": product.condition,
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": product.currency || "USD",
      "availability": "https://schema.org/InStock",
      "url": `${BASE_URL}/products/${product.slug}`
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    },
    "review": (product.reviews || []).slice(0, 5).map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": 5,
        "worstRating": 1
      },
      "reviewBody": review.content,
      "datePublished": review.date,
    }))
  };
  
  // Generate Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": `${BASE_URL}/#products` },
      { "@type": "ListItem", "position": 3, "name": product.category, "item": `${BASE_URL}/#products?category=${encodeURIComponent(product.category)}` },
      { "@type": "ListItem", "position": 4, "name": product.title, "item": `${BASE_URL}/products/${product.slug}` }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductPageClient product={product} />
    </>
  );
}
 