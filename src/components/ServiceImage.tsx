import { useState } from 'react';
import { ServiceCategory } from '../types';
import { CategoryIcon } from './CategoryIcon';

interface ServiceImageProps {
  src: string;
  alt: string;
  title: string;
  category?: ServiceCategory;
  className?: string;
}

export function ServiceImage({
  src,
  alt,
  title,
  category = ServiceCategory.LAUNDRY,
  className = 'w-full h-full object-cover',
}: ServiceImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className="w-full h-full bg-[#F3F0FA] flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center mb-3">
          <CategoryIcon category={category} className="w-6 h-6" />
        </div>
        <p className="text-sm font-medium text-[#171321] line-clamp-1">{title}</p>
        <p className="text-xs text-[#5B536E] mt-0.5">{category}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
}
