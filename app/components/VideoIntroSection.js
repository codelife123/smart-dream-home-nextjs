"use client";

import { useState, useEffect } from "react";

export default function VideoIntroSection() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading to false after component mounts
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-black">
      {/* Desktop Layout */}
      <div className="hidden md:block relative w-full h-screen">
        {/* Video Container */}
        <div className="w-full h-full overflow-hidden">
          <iframe
            className="w-full h-full"
            style={{
              transform: 'scale(1.1)',
              transformOrigin: 'center center'
            }}
            src="https://www.youtube.com/embed/UJed1D_PKgA?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=UJed1D_PKgA&modestbranding=1&iv_load_policy=3&fs=0&cc_load_policy=0&playsinline=1&disablekb=1"
            title="Smart Home Introduction"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-30">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-lg">Loading video...</p>
            </div>
          </div>
        )}

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>

        {/* Content Overlay - Desktop */}
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="text-center text-white px-6 max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Experience the Future of Smart Living
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Transform your home with our cutting-edge smart devices. 
              From intelligent lighting to advanced security systems, 
              discover how technology can make your life easier and more comfortable.
            </p>
            <div className="flex gap-8 justify-center items-center mb-8">
              <div className="flex items-center text-base opacity-80">
                <span className="mr-2">🏠</span>
                Island-wide Installation
              </div>
              <div className="flex items-center text-base opacity-80">
                <span className="mr-2">🛡️</span>
                6-24 Months Warranty
              </div>
              <div className="flex items-center text-base opacity-80">
                <span className="mr-2">📱</span>
                Smart App Control
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={scrollToProducts}
              className="inline-flex items-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 text-lg"
            >
              <span className="mr-2">🛍️</span>
              Explore Our Products
              <svg 
                className="ml-2 w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </button>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Stacked */}
      <div className="md:hidden">
        {/* Video Section - Mobile */}
        <div className="relative w-full h-64 overflow-hidden">
          <iframe
            className="w-full h-full"
            style={{
              transform: 'scale(1.1)',
              transformOrigin: 'center center'
            }}
            src="https://www.youtube.com/embed/UJed1D_PKgA?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=UJed1D_PKgA&modestbranding=1&iv_load_policy=3&fs=0&cc_load_policy=0&playsinline=1&disablekb=1"
            title="Smart Home Introduction"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          
          {/* Loading overlay - Mobile */}
          {isLoading && (
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-30">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p className="text-sm">Loading...</p>
              </div>
            </div>
          )}
        </div>

        {/* Content Section - Mobile */}
        <div className="bg-gray-900 text-white px-6 py-12">
          <div className="text-center max-w-lg mx-auto">
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              Experience the Future of Smart Living
            </h2>
            <p className="text-base mb-6 opacity-90 leading-relaxed">
              Transform your home with our cutting-edge smart devices. 
              From intelligent lighting to advanced security systems.
            </p>
            
            <div className="flex flex-col gap-3 justify-center items-center mb-8">
              <div className="flex items-center text-sm opacity-80">
                <span className="mr-2">🏠</span>
                Island-wide Installation
              </div>
              <div className="flex items-center text-sm opacity-80">
                <span className="mr-2">🛡️</span>
                6-24 Months Warranty
              </div>
              <div className="flex items-center text-sm opacity-80">
                <span className="mr-2">📱</span>
                Smart App Control
              </div>
            </div>

            {/* CTA Button - Mobile */}
            <button
              onClick={scrollToProducts}
              className="inline-flex items-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 text-base w-full justify-center"
            >
              <span className="mr-2">🛍️</span>
              Explore Our Products
              <svg 
                className="ml-2 w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}