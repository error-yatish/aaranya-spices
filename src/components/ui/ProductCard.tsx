import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ShoppingBag } from 'lucide-react';
import { Product, SpiceWeight } from '../../types/ecommerce';
import { useShop } from '../../context/ShopContext';
import { Badge, Price, Rating } from './Primitives';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useShop();
  const [selectedWeight, setSelectedWeight] = useState<SpiceWeight>(
    product.variants[0]?.weight || '100g'
  );
  const [justAdded, setJustAdded] = useState(false);

  const activeVariant =
    product.variants.find((v) => v.weight === selectedWeight) || product.variants[0];

  const handleAdd = (e: React.MouseEvent, openDrawer = false) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedWeight, 1, openDrawer);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <article className="group flex flex-col bg-[#F7F4ED] border border-[#E2DDD2]/80 transition-colors duration-500 hover:border-[#C89236]/60">
      {/* Image Container with Hover Secondary Image & Quick Add */}
      <Link
        to={`/shop/${product.slug}`}
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#EFECE3] block"
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.images.primary}
          alt={product.images.alt}
          loading="lazy"
          width={600}
          height={800}
          className="h-full w-full object-cover object-center image-zoom-slow group-hover:scale-105 group-hover:opacity-0"
        />
        <img
          src={product.images.secondary}
          alt={`${product.name} macro texture view`}
          loading="lazy"
          width={600}
          height={800}
          className="absolute inset-0 h-full w-full object-cover object-center opacity-0 scale-105 image-zoom-slow group-hover:opacity-100 group-hover:scale-100"
        />

        {/* Top left badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isSignature && <Badge tone="forest">Signature Harvest</Badge>}
          {!product.isSignature && product.isBestseller && (
            <Badge tone="ivory">Essential</Badge>
          )}
          {product.isNew && <Badge tone="earth">New Harvest</Badge>}
        </div>

        {/* Subtle Quick Add overlay on desktop hover */}
        <div className="hidden md:flex absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <button
            type="button"
            onClick={(e) => handleAdd(e, true)}
            className="w-full bg-[#182B21]/95 hover:bg-[#0F1D16] text-[#F7F4ED] text-[11px] uppercase tracking-[0.16em] py-3 px-4 font-medium flex items-center justify-center gap-2 backdrop-blur-xs cursor-pointer"
          >
            <ShoppingBag size={13} />
            <span>Quick Add · {selectedWeight}</span>
          </button>
        </div>
      </Link>

      {/* Card Body */}
      <div className="p-4 md:p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#6D4C38] font-medium">
              {product.categoryLabel}
            </span>
            <Rating value={product.rating} count={product.reviewCount} size="sm" />
          </div>

          <Link
            to={`/shop/${product.slug}`}
            className="block group-hover:text-[#6D4C38] transition-colors"
          >
            <h3 className="font-serif-editorial text-xl md:text-2xl text-[#1C1B18] leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="mt-1 text-xs md:text-[13px] text-[#5A564E] line-clamp-2 leading-relaxed">
            {product.shortDescriptor}
          </p>
        </div>

        {/* Size Selector + Price + Add to Cart */}
        <div className="pt-3 border-t border-[#E2DDD2]/80 space-y-3">
          <div className="flex items-center justify-between gap-2">
            {/* Weight Variant Pills */}
            <div
              className="inline-flex items-center border border-[#D5CFC2] bg-[#EFECE3]/60 p-0.5"
              role="group"
              aria-label={`Select size for ${product.name}`}
            >
              {product.variants.map((variant) => {
                const active = variant.weight === selectedWeight;
                return (
                  <button
                    key={variant.sku}
                    type="button"
                    onClick={() => setSelectedWeight(variant.weight)}
                    className={`px-2 py-1 text-[11px] font-mono-spec transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#182B21] text-[#F7F4ED] font-medium'
                        : 'text-[#5A564E] hover:text-[#1C1B18]'
                    }`}
                  >
                    {variant.weight}
                  </button>
                );
              })}
            </div>

            <Price
              amount={activeVariant.price}
              compareAt={activeVariant.compareAtPrice}
              size="md"
            />
          </div>

          <button
            type="button"
            onClick={(e) => handleAdd(e, false)}
            className={`w-full py-2.5 px-4 text-[11px] uppercase tracking-[0.16em] font-medium border transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              justAdded
                ? 'bg-[#2A5A3B] text-[#F7F4ED] border-[#2A5A3B]'
                : 'bg-transparent text-[#182B21] border-[#182B21] hover:bg-[#182B21] hover:text-[#F7F4ED]'
            }`}
          >
            {justAdded ? (
              <>
                <Check size={14} />
                <span>Added to Bag</span>
              </>
            ) : (
              <span>Add to Cart</span>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export const ProductGrid: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-7">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
