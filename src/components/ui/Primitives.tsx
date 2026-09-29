import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronDown, ChevronRight, X } from 'lucide-react';

/* 1. BUTTON */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'ochre';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center font-sans-ui uppercase tracking-[0.14em] font-medium transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89236] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary:
      'bg-[#182B21] text-[#F7F4ED] hover:bg-[#0F1D16] border border-[#182B21]',
    secondary:
      'bg-[#EFECE3] text-[#1C1B18] hover:bg-[#E2DDD2] border border-[#D5CFC2]',
    outline:
      'bg-transparent text-[#182B21] border border-[#182B21] hover:bg-[#182B21] hover:text-[#F7F4ED]',
    ghost:
      'bg-transparent text-[#1C1B18] hover:text-[#6D4C38] underline-offset-8 hover:underline',
    ochre:
      'bg-[#C89236] text-[#182B21] hover:bg-[#b5812b] border border-[#C89236] font-semibold'
  };

  const sizes = {
    sm: 'text-[11px] px-4 py-2.5',
    md: 'text-xs px-6 py-3.5',
    lg: 'text-xs md:text-[13px] px-8 py-4'
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

/* 2. BADGE */
interface BadgeProps {
  children: React.ReactNode;
  tone?: 'forest' | 'ochre' | 'earth' | 'ivory';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  tone = 'ivory',
  className = ''
}) => {
  const tones = {
    forest: 'bg-[#182B21] text-[#F7F4ED]',
    ochre: 'bg-[#C89236]/15 text-[#6D4C38] border border-[#C89236]/40',
    earth: 'bg-[#6D4C38] text-[#F7F4ED]',
    ivory: 'bg-[#F7F4ED]/95 text-[#1C1B18] border border-[#E2DDD2]'
  };

  return (
    <span
      className={`inline-block font-sans-ui text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
};

/* 3. PRICE */
interface PriceProps {
  amount: number;
  compareAt?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Price: React.FC<PriceProps> = ({
  amount,
  compareAt,
  size = 'md',
  className = ''
}) => {
  const sizeClass =
    size === 'lg'
      ? 'text-xl md:text-2xl font-medium'
      : size === 'sm'
      ? 'text-xs font-medium'
      : 'text-sm md:text-base font-medium';

  return (
    <div className={`inline-flex items-baseline gap-2 tabular-nums ${className}`}>
      <span className={`text-[#1C1B18] ${sizeClass}`}>₹{amount.toLocaleString('en-IN')}</span>
      {compareAt && compareAt > amount && (
        <span className="text-xs text-[#847E74] line-through">
          ₹{compareAt.toLocaleString('en-IN')}
        </span>
      )}
    </div>
  );
};

/* 4. RATING */
interface RatingProps {
  value: number;
  count?: number;
  size?: 'sm' | 'md';
  showText?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  count,
  size = 'sm',
  showText = true
}) => {
  const iconSize = size === 'sm' ? 13 : 15;
  return (
    <div
      className="inline-flex items-center gap-1.5"
      aria-label={`Rated ${value} out of 5 stars`}
    >
      <div className="flex items-center text-[#C89236]">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={iconSize}
            className={
              star <= Math.round(value)
                ? 'fill-[#C89236] text-[#C89236]'
                : 'text-[#D5CFC2]'
            }
          />
        ))}
      </div>
      {showText && (
        <span className="text-xs text-[#5A564E] tabular-nums">
          {value.toFixed(1)}
          {typeof count === 'number' && (
            <span className="text-[#847E74] ml-1">({count})</span>
          )}
        </span>
      )}
    </div>
  );
};

/* 5. SECTION HEADER */
interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
  className = ''
}) => {
  const alignClass = align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left max-w-2xl';
  return (
    <div className={`${alignClass} ${className}`}>
      {eyebrow && (
        <p
          className={`font-sans-ui text-[11px] uppercase tracking-[0.22em] mb-3 font-medium ${
            light ? 'text-[#C89236]' : 'text-[#6D4C38]'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-serif-editorial text-3xl md:text-4xl lg:text-[42px] leading-[1.15] tracking-[0.02em] font-normal ${
          light ? 'text-[#F7F4ED]' : 'text-[#1C1B18]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-sm md:text-base leading-relaxed ${
            light ? 'text-[#E2DDD2]/85' : 'text-[#5A564E]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

/* 6. BREADCRUMBS */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const Breadcrumbs: React.FC<{ items: BreadcrumbItem[]; className?: string }> = ({
  items,
  className = ''
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      item: item.href ? `https://aaranyaspices.com${item.href}` : undefined
    }))
  };

  return (
    <nav aria-label="Breadcrumb" className={`py-4 ${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#5A564E] tracking-wide">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="hover:text-[#182B21] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? 'text-[#1C1B18] font-medium' : ''}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight size={12} className="text-[#847E74]" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

/* 7. ACCORDION */
export interface AccordionItemData {
  question: string;
  answer: string;
}

export const Accordion: React.FC<{ items: AccordionItemData[]; defaultOpenIndex?: number }> = ({
  items,
  defaultOpenIndex = 0
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className="divide-y divide-[#E2DDD2] border-t border-b border-[#E2DDD2]">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="py-5">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer focus:outline-none"
            >
              <span className="font-serif-editorial text-xl md:text-2xl text-[#1C1B18] group-hover:text-[#6D4C38] transition-colors">
                {item.question}
              </span>
              <ChevronDown
                size={18}
                className={`text-[#6D4C38] shrink-0 transition-transform duration-500 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-500 ease-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-sm md:text-base text-[#5A564E] leading-relaxed pr-6">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* 8. MODAL */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1B18]/60 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="bg-[#F7F4ED] border border-[#E2DDD2] max-w-md w-full p-6 md:p-8 relative shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-[#E2DDD2]">
          <h3 className="font-serif-editorial text-2xl text-[#1C1B18]">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-[#5A564E] hover:text-[#1C1B18] cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
};
