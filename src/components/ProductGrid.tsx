"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from './ProductCard';
import { Filter, ChevronDown } from 'lucide-react';
import type { Product } from '@/types/product';

const ITEMS_PER_PAGE = 12;

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState('price-high');
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllConditions, setShowAllConditions] = useState(false);
  
  const productsRef = useRef<HTMLDivElement>(null);

  const searchQuery = searchParams.get('search')?.toLowerCase();

  const brands = useMemo(() => [...new Set(products.map(p => p.brand))], [products]);
  const conditions = useMemo(() => [...new Set(products.map(p => p.condition))], [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery)
      );
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }

    if (selectedConditions.length > 0) {
      filtered = filtered.filter(p => selectedConditions.includes(p.condition));
    }

    if (priceRange.min !== '') {
      filtered = filtered.filter(p => p.price >= Number(priceRange.min));
    }
    if (priceRange.max !== '') {
      filtered = filtered.filter(p => p.price <= Number(priceRange.max));
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating ?? 0) - (a.rating ?? 0);
        case 'featured':
        default:
          return 0;
      }
    });
  }, [products, sortBy, selectedBrands, selectedConditions, priceRange, searchQuery]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    // Only scroll if there's a search query or filters applied AND it's not the initial load
    if (typeof window !== 'undefined' && productsRef.current && (searchQuery || selectedBrands.length > 0 || selectedConditions.length > 0 || priceRange.min !== '' || priceRange.max !== '') && currentPage > 1) {
        const headerHeight = 120; // Approximate header height
        const elementPosition = productsRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
  }, [currentPage, searchQuery, selectedBrands, selectedConditions, priceRange]);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrands, selectedConditions, priceRange, sortBy, searchQuery]);

  return (
    <div id="products" ref={productsRef} className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start gap-8">
          <div className={`w-full md:w-64 lg:w-80 flex-shrink-0 ${filterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-medium text-lg mb-4">Filters</h3>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" value={priceRange.min} onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0046be]" />
                  <input type="number" placeholder="Max" value={priceRange.max} onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0046be]" />
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-2">Brands</h4>
                <div className="space-y-2">
                  {(showAllBrands ? brands : brands.slice(0, 10)).map(brand => (
                    <label key={brand} className="flex items-center">
                      <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={(e) => setSelectedBrands(e.target.checked ? [...selectedBrands, brand] : selectedBrands.filter(b => b !== brand))} className="mr-2 text-[#0046be] focus:ring-[#0046be]" />
                      {brand}
                    </label>
                  ))}
                  {brands.length > 10 && (
                    <button
                      type="button"
                      onClick={() => setShowAllBrands(v => !v)}
                      className="mt-2 px-3 py-1 rounded-lg bg-[#f3f6fa] text-[#0046be] border border-[#0046be] hover:bg-[#e6f0fa] transition-colors duration-200 text-sm font-medium w-full"
                    >
                      {showAllBrands ? 'Show less brands' : `Show all brands (${brands.length})`}
                    </button>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-2">Condition</h4>
                <div className="space-y-2">
                  {(showAllConditions ? conditions : conditions.slice(0, 10)).map(condition => (
                    <label key={condition} className="flex items-center">
                      <input type="checkbox" checked={selectedConditions.includes(condition)} onChange={(e) => setSelectedConditions(e.target.checked ? [...selectedConditions, condition] : selectedConditions.filter(c => c !== condition))} className="mr-2 text-[#0046be] focus:ring-[#0046be]" />
                      {condition}
                    </label>
                  ))}
                  {conditions.length > 10 && (
                    <button
                      type="button"
                      onClick={() => setShowAllConditions(v => !v)}
                      className="mt-2 px-3 py-1 rounded-lg bg-[#f3f6fa] text-[#0046be] border border-[#0046be] hover:bg-[#e6f0fa] transition-colors duration-200 text-sm font-medium w-full"
                    >
                      {showAllConditions ? 'Show less conditions' : `Show all conditions (${conditions.length})`}
                    </button>
                  )}
                </div>
              </div>

              <button onClick={() => { setPriceRange({ min: '', max: '' }); setSelectedBrands([]); setSelectedConditions([]); }} className="w-full px-4 py-2 text-[#0046be] border border-[#0046be] rounded-lg hover:bg-blue-50 transition-colors duration-300">
                Clear Filters
              </button>
            </div>
          </div>

          <div className="flex-grow">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-medium text-gray-900">
                All Products
                {filteredAndSortedProducts.length > 0 && (<span className="text-sm text-gray-500 ml-2">({filteredAndSortedProducts.length} items)</span>)}
              </h2>
              
              <div className="flex gap-4">
                <button className="md:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white" onClick={() => setFilterOpen(!filterOpen)}>
                  <Filter className="h-5 w-5" />
                  <span>Filters</span>
                </button>
                
                <div className="relative">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="appearance-none px-4 py-2 pr-8 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0046be]">
                    <option value="price-high">Price: High to Low</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="rating">Highest Rated</option>
                    <option value="featured">Featured</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" />
                </div>
              </div>
            </div>
            
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your criteria.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {paginatedProducts.map(product => (<ProductCard key={product.id} product={product} />))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <div className="flex space-x-2">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setCurrentPage(i + 1);
                            if (productsRef.current) {
                              const headerHeight = 120; // Adjust if your header height is different
                              const elementPosition = productsRef.current.getBoundingClientRect().top;
                              const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                              window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth',
                              });
                            }
                          }}
                          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                            currentPage === i + 1
                              ? 'bg-[#0046be] text-white'
                              : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-[#0046be] border border-gray-300'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid; 