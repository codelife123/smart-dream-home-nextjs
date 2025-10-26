"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductCard({ product, onViewDetails }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatPriceRange = (p) => {
    if (Array.isArray(p.variants) && p.variants.length) {
      const prices = p.variants.map(v => Number(v.price)).sort((a, b) => a - b);
      return `Rs. ${prices[0].toLocaleString()} - ${prices[prices.length - 1].toLocaleString()}`;
    }
    return p.price ? `Rs. ${Number(p.price).toLocaleString()}` : 'Contact for price';
  };

  const priceText = Array.isArray(product.variants) && product.variants.length
    ? `${formatPriceRange(product)} (1-4 gang)`
    : formatPriceRange(product);

  const imgSrc = (product.images && product.images[0]) || '';

  return (
    <div className="bg-white rounded-2xl shadow p-4 text-center cursor-pointer product-card hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-48 mb-3 rounded overflow-hidden bg-gray-100">
        {imgSrc && !imageError ? (
          <Image
            src={imgSrc}
            alt={`${product.name} - Smart home device from Smart Dream Home Lanka`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-all duration-300 hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}
        
        {/* Loading skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      <h3 className="font-bold text-lg mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-3">{priceText}</p>
      <button 
        onClick={() => onViewDetails(product)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-200"
      >
        View Details
      </button>
    </div>
  );
}
