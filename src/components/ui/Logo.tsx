import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  className = ''
}) => {
  const textColor = variant === 'light' ? 'text-[#F7F4ED]' : 'text-[#182B21]';
  const subColor = variant === 'light' ? 'text-[#C89236]' : 'text-[#6D4C38]';

  const mainSize =
    size === 'lg'
      ? 'text-2xl md:text-3xl tracking-[0.26em]'
      : size === 'sm'
      ? 'text-lg tracking-[0.22em]'
      : 'text-xl md:text-2xl tracking-[0.24em]';

  const subSize =
    size === 'lg'
      ? 'text-[10px] tracking-[0.42em]'
      : 'text-[9px] tracking-[0.38em]';

  return (
    <Link
      to="/"
      aria-label="Aaranya Spices Home"
      className={`inline-flex flex-col items-center select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89236] ${className}`}
    >
      <span
        className={`font-serif-editorial font-semibold uppercase leading-none transition-colors duration-300 ${textColor} ${mainSize}`}
      >
        AARANYA
      </span>
      <span
        className={`font-sans-ui font-medium uppercase mt-1 leading-none transition-colors duration-300 ${subColor} ${subSize}`}
      >
        SPICES
      </span>
    </Link>
  );
};
