import { Bookmark, Star } from 'lucide-react';
import { ServiceProvider } from '../types';
import { ServiceImage } from './ServiceImage';

interface ServiceCardProps {
  service: ServiceProvider;
  isSaved: boolean;
  onToggleSave: (serviceId: string) => void;
  onViewDetails: (serviceId: string) => void;
  onBookNow: (serviceId: string) => void;
}

export function ServiceCard({
  service,
  isSaved,
  onToggleSave,
  onViewDetails,
  onBookNow,
}: ServiceCardProps) {
  return (
    <article className="group bg-white rounded-2xl border border-[#EAE6F2] overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-violet-950/5">
      {/* 4:3 Image Header */}
      <div className="relative aspect-[4/3] bg-[#F3F0FA] overflow-hidden">
        <button
          type="button"
          onClick={() => onViewDetails(service.id)}
          className="block w-full h-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-600"
          aria-label={`View details for ${service.name}`}
        >
          <ServiceImage
            src={service.image}
            alt={`${service.name} — ${service.category} near Raipur Road`}
            title={service.name}
            category={service.category}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </button>

        <button
          type="button"
          onClick={() => onToggleSave(service.id)}
          aria-label={isSaved ? `Remove ${service.name} from saved services` : `Save ${service.name}`}
          className={`absolute top-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 ${
            isSaved
              ? 'bg-violet-700 text-white shadow-sm'
              : 'bg-white/92 backdrop-blur-sm text-[#171321] hover:bg-white shadow-sm'
          }`}
        >
          <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Card Body — Clean Unboxed Metadata & Consistent Field Order */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Quiet 1-line category + distance + rating metadata */}
        <div className="flex items-center justify-between gap-2 text-xs text-[#5B536E] mb-1.5">
          <div className="flex items-center gap-1.5 min-w-0 truncate">
            <span className="font-medium text-violet-700 truncate">{service.category}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums whitespace-nowrap">{service.distanceMeters}m away</span>
          </div>
          <div className="flex items-center gap-1 shrink-0 text-[#171321] font-semibold tabular-nums">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{service.rating.toFixed(1)}</span>
            <span className="text-[#5B536E] font-normal">({service.reviewCount})</span>
          </div>
        </div>

        {/* Service Name */}
        <h3 className="font-display font-semibold text-lg text-[#171321] leading-snug">
          <button
            type="button"
            onClick={() => onViewDetails(service.id)}
            className="text-left hover:text-violet-700 transition-colors focus-visible:outline-none focus-visible:underline"
          >
            {service.name}
          </button>
        </h3>

        {/* Short Description */}
        <p className="mt-1.5 text-sm text-[#5B536E] leading-relaxed line-clamp-2 flex-1">
          {service.shortDescription}
        </p>

        {/* Price + Availability Baseline */}
        <div className="mt-4 pt-4 border-t border-[#F1EEF7] flex items-baseline justify-between gap-2">
          <div>
            <span className="text-xs text-[#5B536E]">Starts at </span>
            <span className="text-base font-bold text-[#171321] tabular-nums">
              ₹{service.startingPrice}
            </span>
            <span className="text-xs text-[#5B536E]"> {service.priceUnit}</span>
          </div>
          <span
            className={`text-xs font-medium whitespace-nowrap ${
              service.availableNow ? 'text-emerald-700' : 'text-amber-700'
            }`}
          >
            {service.availableNow ? 'Open now' : 'Opens 9:00 AM'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onViewDetails(service.id)}
            className="min-h-[42px] px-3 py-2 rounded-xl border border-[#DDD6EB] bg-white hover:bg-[#F5F3FF] hover:border-violet-300 text-[#171321] text-sm font-medium transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
          >
            View Details
          </button>
          <button
            type="button"
            onClick={() => onBookNow(service.id)}
            className="min-h-[42px] px-3 py-2 rounded-xl bg-violet-700 hover:bg-violet-800 active:scale-[0.98] text-white text-sm font-semibold transition-all duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-1"
          >
            Book Now
          </button>
        </div>
      </div>
    </article>
  );
}
