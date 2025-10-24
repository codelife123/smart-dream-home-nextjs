"use client";

import { useState, useRef, useEffect } from "react";

export default function VideoIntroSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      if (videoRef.current) {
        const player = new window.YT.Player(videoRef.current, {
          height: '100%',
          width: '100%',
          videoId: 'UJed1D_PKgA',
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            loop: 1,
            playlist: 'UJed1D_PKgA',
            modestbranding: 1,
            iv_load_policy: 3,
            fs: 0,
            cc_load_policy: 0,
            playsinline: 1,
            disablekb: 1
          },
          events: {
            onReady: (event) => {
              setIsVideoLoaded(true);
              event.target.playVideo();
            },
            onStateChange: (event) => {
              // Loop the video when it ends
              if (event.data === window.YT.PlayerState.ENDED) {
                event.target.playVideo();
              }
            }
          }
        });
      }
    };

    // If API is already loaded, initialize immediately
    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady();
    }
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Video Container */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          {/* YouTube Player */}
          <div 
            ref={videoRef}
            className="absolute inset-0 w-full h-full"
            style={{
              transform: 'scale(1.1)', // Slightly scale up to hide black bars
              transformOrigin: 'center center'
            }}
          />
          
          {/* Loading overlay */}
          {!isVideoLoaded && (
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-lg">Loading video...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

      {/* Content Overlay */}
      <div className="relative z-20 text-center text-white px-6 max-w-4xl mx-auto">
        {/* Caption */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Experience the Future of Smart Living
          </h2>
          <p className="text-lg md:text-xl mb-6 opacity-90 leading-relaxed">
            Transform your home with our cutting-edge smart devices. 
            From intelligent lighting to advanced security systems, 
            discover how technology can make your life easier and more comfortable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center text-sm md:text-base opacity-80">
              <span className="mr-2">🏠</span>
              Island-wide Installation
            </div>
            <div className="flex items-center text-sm md:text-base opacity-80">
              <span className="mr-2">🛡️</span>
              6-24 Months Warranty
            </div>
            <div className="flex items-center text-sm md:text-base opacity-80">
              <span className="mr-2">📱</span>
              Smart App Control
            </div>
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

      {/* Mobile-specific adjustments */}
      <style jsx>{`
        @media (max-width: 768px) {
          .video-container {
            transform: scale(1.2);
          }
        }
      `}</style>
    </section>
  );
}