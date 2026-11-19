import { MapPin, RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { CATEGORY_LIST } from '../data/sampleServices';
import { ServiceCategory, ServiceProvider } from '../types';
import { ServiceCard } from './ServiceCard';

export type DistanceFilter = 'any' | '250' | '350' | '500';
export type PriceFilter = 'any' | 'under100' | '100to200' | 'over200';
export type RatingFilter = 'any' | '4.5' | '4.7';
export type AvailabilityFilter = 'all' | 'openNow' | 'doorstep';
export type SortOption = 'recommended' | 'nearest' | 'priceLow' | 'ratingHigh';

interface ExplorePageProps {
  services: ServiceProvider[];
  selectedLocation: string;
  searchQuery: string;
  onChangeSearch: (value: string) => void;
  selectedCategory: ServiceCategory | 'All';
  onChangeCategory: (category: ServiceCategory | 'All') => void;
  distanceFilter: DistanceFilter;
  onChangeDistance: (val: DistanceFilter) => void;
  priceFilter: PriceFilter;
  onChangePrice: (val: PriceFilter) => void;
  ratingFilter: RatingFilter;
  onChangeRating: (val: RatingFilter) => void;
  availabilityFilter: AvailabilityFilter;
  onChangeAvailability: (val: AvailabilityFilter) => void;
  sortBy: SortOption;
  onChangeSort: (val: SortOption) => void;
  onResetFilters: () => void;
  savedServiceIds: string[];
  onToggleSave: (serviceId: string) => void;
  onViewDetails: (serviceId: string) => void;
  onBookNow: (serviceId: string) => void;
}

export function ExplorePage({
  services,
  selectedLocation,
  searchQuery,
  onChangeSearch,
  selectedCategory,
  onChangeCategory,
  distanceFilter,
  onChangeDistance,
  priceFilter,
  onChangePrice,
  ratingFilter,
  onChangeRating,
  availabilityFilter,
  onChangeAvailability,
  sortBy,
  onChangeSort,
  onResetFilters,
  savedServiceIds,
  onToggleSave,
  onViewDetails,
  onBookNow,
}: ExplorePageProps) {
  const filteredServices = services
    .filter((service) => {
      if (selectedCategory !== 'All' && service.category !== selectedCategory) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = service.name.toLowerCase().includes(q);
        const matchesCat = service.category.toLowerCase().includes(q);
        const matchesDesc = service.shortDescription.toLowerCase().includes(q);
        const matchesOfferings = service.offerings.some((o) =>
          o.name.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesCat && !matchesDesc && !matchesOfferings) return false;
      }

      if (distanceFilter !== 'any' && service.distanceMeters > Number(distanceFilter)) {
        return false;
      }

      if (priceFilter === 'under100' && service.startingPrice >= 100) return false;
      if (
        priceFilter === '100to200' &&
        (service.startingPrice < 100 || service.startingPrice > 200)
      ) {
        return false;
      }
      if (priceFilter === 'over200' && service.startingPrice <= 200) return false;

      if (ratingFilter !== 'any' && service.rating < Number(ratingFilter)) return false;

      if (availabilityFilter === 'openNow' && !service.availableNow) return false;
      if (availabilityFilter === 'doorstep' && !service.doorstepService) return false;

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'nearest':
          return a.distanceMeters - b.distanceMeters;
        case 'priceLow':
          return a.startingPrice - b.startingPrice;
        case 'ratingHigh':
          return b.rating - a.rating;
        default:
          return Number(b.popular) - Number(a.popular) || b.rating - a.rating;
      }
    });

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    distanceFilter !== 'any' ||
    priceFilter !== 'any' ||
    ratingFilter !== 'any' ||
    availabilityFilter !== 'all';

  return (
    <div className="pt-6 md:pt-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#5B536E] inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-violet-700" />
            <span>{selectedLocation}</span>
            <span aria-hidden="true">·</span>
            <span>Sample local businesses</span>
          </p>
          <h1 className="mt-1 font-display font-bold text-3xl text-[#171321] tracking-tight">
            Explore Nearby Services
          </h1>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search
            className="w-4 h-4 text-[#7C7293] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <label htmlFor="explore-search" className="sr-only">
            Search services
          </label>
          <input
            id="explore-search"
            type="text"
            value={searchQuery}
            onChange={(e) => onChangeSearch(e.target.value)}
            placeholder="Search laundry, tiffin, printing, salon..."
            className="w-full min-h-[44px] pl-10 pr-4 py-2 rounded-xl bg-white border border-[#DDD6EB] text-sm text-[#171321] placeholder:text-[#867D9C] focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600"
          />
        </div>
      </div>

      {/* Interactive Category Filter Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
        <button
          type="button"
          onClick={() => onChangeCategory('All')}
          className={`min-h-[40px] px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 ${
            selectedCategory === 'All'
              ? 'bg-violet-700 text-white'
              : 'bg-white border border-[#EAE6F2] text-[#4A425C] hover:bg-[#F5F3FF]'
          }`}
        >
          All Categories
        </button>
        {CATEGORY_LIST.map(({ category, shortLabel }) => {
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onChangeCategory(category)}
              className={`min-h-[40px] px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 ${
                active
                  ? 'bg-violet-700 text-white'
                  : 'bg-white border border-[#EAE6F2] text-[#4A425C] hover:bg-[#F5F3FF]'
              }`}
            >
              {shortLabel}
            </button>
          );
        })}
      </div>

      {/* Structured Filter Bar: Distance, Price, Rating, Availability, Sort */}
      <div className="bg-white rounded-2xl border border-[#EAE6F2] p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Distance Filter */}
          <div>
            <label htmlFor="filter-distance" className="block text-xs font-medium text-[#5B536E] mb-1">
              Distance
            </label>
            <select
              id="filter-distance"
              value={distanceFilter}
              onChange={(e) => onChangeDistance(e.target.value as DistanceFilter)}
              className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-[#FAF9FC] border border-[#E4DEF0] text-sm text-[#171321] focus:outline-none focus:ring-2 focus:ring-violet-600"
            >
              <option value="any">Any distance</option>
              <option value="250">Within 250m (3 min)</option>
              <option value="350">Within 350m (4 min)</option>
              <option value="500">Within 500m (6 min)</option>
            </select>
          </div>

          {/* Price Filter */}
          <div>
            <label htmlFor="filter-price" className="block text-xs font-medium text-[#5B536E] mb-1">
              Starting Price
            </label>
            <select
              id="filter-price"
              value={priceFilter}
              onChange={(e) => onChangePrice(e.target.value as PriceFilter)}
              className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-[#FAF9FC] border border-[#E4DEF0] text-sm text-[#171321] focus:outline-none focus:ring-2 focus:ring-violet-600"
            >
              <option value="any">Any budget</option>
              <option value="under100">Under ₹100</option>
              <option value="100to200">₹100 – ₹200</option>
              <option value="over200">Above ₹200</option>
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <label htmlFor="filter-rating" className="block text-xs font-medium text-[#5B536E] mb-1">
              Minimum Rating
            </label>
            <select
              id="filter-rating"
              value={ratingFilter}
              onChange={(e) => onChangeRating(e.target.value as RatingFilter)}
              className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-[#FAF9FC] border border-[#E4DEF0] text-sm text-[#171321] focus:outline-none focus:ring-2 focus:ring-violet-600"
            >
              <option value="any">All ratings</option>
              <option value="4.5">4.5★ &amp; above</option>
              <option value="4.7">4.7★ &amp; above</option>
            </select>
          </div>

          {/* Availability Filter */}
          <div>
            <label htmlFor="filter-availability" className="block text-xs font-medium text-[#5B536E] mb-1">
              Availability
            </label>
            <select
              id="filter-availability"
              value={availabilityFilter}
              onChange={(e) => onChangeAvailability(e.target.value as AvailabilityFilter)}
              className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-[#FAF9FC] border border-[#E4DEF0] text-sm text-[#171321] focus:outline-none focus:ring-2 focus:ring-violet-600"
            >
              <option value="all">All availability</option>
              <option value="openNow">Open now</option>
              <option value="doorstep">Hostel pickup / delivery</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label htmlFor="filter-sort" className="block text-xs font-medium text-[#5B536E] mb-1">
              Sort By
            </label>
            <select
              id="filter-sort"
              value={sortBy}
              onChange={(e) => onChangeSort(e.target.value as SortOption)}
              className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-[#FAF9FC] border border-[#E4DEF0] text-sm text-[#171321] focus:outline-none focus:ring-2 focus:ring-violet-600"
            >
              <option value="recommended">Recommended</option>
              <option value="nearest">Nearest First</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="ratingHigh">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Result Count & Reset Row */}
        <div className="mt-3.5 pt-3.5 border-t border-[#F1EEF7] flex flex-wrap items-center justify-between gap-2 text-xs text-[#5B536E]">
          <p className="inline-flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-violet-700" aria-hidden="true" />
            <span>
              Showing{' '}
              <strong className="text-[#171321] tabular-nums">{filteredServices.length}</strong> of{' '}
              <span className="tabular-nums">{services.length}</span> sample services near Raipur Road
            </span>
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 text-violet-700 hover:text-violet-900 font-semibold whitespace-nowrap focus-visible:outline-none focus-visible:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Grid or Empty State */}
      {filteredServices.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EAE6F2] p-10 text-center">
          <p className="font-display font-semibold text-xl text-[#171321]">
            No matching services found
          </p>
          <p className="mt-2 text-sm text-[#5B536E] max-w-md mx-auto">
            Try widening your distance or budget filter to view all sample local services around Raipur Road.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-5 min-h-[44px] px-5 py-2.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white text-sm font-semibold transition-colors whitespace-nowrap"
          >
            Show All Services
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isSaved={savedServiceIds.includes(service.id)}
              onToggleSave={onToggleSave}
              onViewDetails={onViewDetails}
              onBookNow={onBookNow}
            />
          ))}
        </div>
      )}
    </div>
  );
}
