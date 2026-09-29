import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, alt }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
          {images.map((img, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`View product image ${idx + 1}`}
                className={`relative w-20 h-24 shrink-0 overflow-hidden border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#182B21] ring-1 ring-[#182B21]'
                    : 'border-[#E2DDD2] opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`${alt} thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Main Gallery Stage */}
      <div className="relative flex-1 aspect-[3/4] bg-[#EFECE3] border border-[#E2DDD2] overflow-hidden group">
        <img
          src={images[activeIndex] || images[0]}
          alt={alt}
          fetchPriority="high"
          width={900}
          height={1200}
          className="w-full h-full object-cover object-center transition-all duration-700"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#F7F4ED]/90 hover:bg-[#F7F4ED] text-[#1C1B18] border border-[#E2DDD2] flex items-center justify-center opacity-85 md:opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#F7F4ED]/90 hover:bg-[#F7F4ED] text-[#1C1B18] border border-[#E2DDD2] flex items-center justify-center opacity-85 md:opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        <div className="absolute bottom-3 right-3 bg-[#182B21]/80 text-[#F7F4ED] text-[11px] font-mono-spec px-2.5 py-1">
          {activeIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};
