"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { slug, title, price, images, condition } = product;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <Link href={`/products/${slug}`} className="block">
        <div className="relative w-full h-48">
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-medium text-gray-900 line-clamp-2 sm:line-clamp-1">
          {title}
        </h3>
        <div className="mt-1">
          <span className="text-sm text-gray-500">{condition}</span>
        </div>
        <div className="mt-auto pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span className="text-xl font-bold text-gray-900">${new Intl.NumberFormat('en-US').format(price)}</span>
          <Link href={`/products/${slug}`} className="text-[#0046be] hover:text-[#003494] flex items-center">
            View Details
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 