"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Award } from 'lucide-react';
import type { Product } from '@/types/product';

interface FeaturedProductProps {
  product: Product;
}

const FeaturedProduct: React.FC<FeaturedProductProps> = ({ product }) => {
  if (!product) {
    return null;
  }

  const { slug, title, description, price, rating, reviewCount, images } = product;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-6xl mx-auto transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.015]">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="lg:w-1/2 relative overflow-hidden">
          <div className="absolute top-4 left-4 z-10 bg-[#0046be] text-white text-sm font-medium px-3 py-1 rounded-full">
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-1" />
              <span>Featured</span>
            </div>
          </div>
          <div className="relative w-full h-[300px] lg:h-[400px]">
            <Image 
              src={images[0]} 
              alt={title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
        
        {/* Content Section */}
        <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col">
          <div className="flex-grow">
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
            {/* Rating */}
            <div className="mt-2 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">({reviewCount} reviews)</span>
            </div>
            {/* Price */}
            <div className="mt-4">
              <span className="text-3xl font-bold text-gray-900">${new Intl.NumberFormat('en-US').format(price)}</span>
              <span className="ml-2 text-sm text-gray-500">Free shipping</span>
            </div>
            {/* Description */}
            <p className="mt-4 text-gray-600 line-clamp-3">{description}</p>
          </div>
          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <Link 
              href={`/products/${slug}`}
              className="flex-1 bg-[#0046be] hover:bg-[#003494] text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300 text-center"
            >
              Add to Cart
            </Link>
            <Link 
              href={`/products/${slug}`}
              className="flex-1 flex items-center justify-center border border-[#0046be] text-[#0046be] hover:bg-blue-50 py-3 px-6 rounded-lg font-medium transition-colors duration-300"
            >
              View Details
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct; 