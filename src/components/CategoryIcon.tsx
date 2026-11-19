import {
  Shirt,
  Scissors,
  UtensilsCrossed,
  Pill,
  ShoppingBasket,
  Wrench,
  Printer,
  Sparkles,
} from 'lucide-react';
import { ServiceCategory } from '../types';

interface CategoryIconProps {
  category: ServiceCategory;
  className?: string;
}

export function CategoryIcon({ category, className = 'w-5 h-5' }: CategoryIconProps) {
  switch (category) {
    case ServiceCategory.LAUNDRY:
      return <Shirt className={className} />;
    case ServiceCategory.SALON:
      return <Scissors className={className} />;
    case ServiceCategory.FOOD:
      return <UtensilsCrossed className={className} />;
    case ServiceCategory.PHARMACY:
      return <Pill className={className} />;
    case ServiceCategory.GROCERY:
      return <ShoppingBasket className={className} />;
    case ServiceCategory.REPAIR:
      return <Wrench className={className} />;
    case ServiceCategory.PRINTING:
      return <Printer className={className} />;
    case ServiceCategory.CLEANING:
      return <Sparkles className={className} />;
    default:
      return <ShoppingBasket className={className} />;
  }
}
