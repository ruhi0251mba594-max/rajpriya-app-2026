import { FormEvent, useState } from 'react';
import { ArrowRight, MapPin, Search } from 'lucide-react';
import { CATEGORY_LIST, LOCATION_OPTIONS } from '../data/sampleServices';
import { ServiceCategory, ServiceProvider } from '../types';
import { CategoryIcon } from './CategoryIcon';
import { ServiceCard } from './ServiceCard';
import { ServiceImage } from './ServiceImage';

interface HomePageProps {
  services: ServiceProvider[];
  selectedLocation: string;
  onChangeLocation: (location: string) => void;
  savedServiceIds: string[];
  onToggleSave: (serviceId: string) => void;
  onSearchSubmit: (query: string) => void;
  onSelectCategory: (category: ServiceCategory) => void;
  onExploreAll: () => void;
  onViewDetails: (serviceId: string) => void;
  onBookNow: (serviceId: string) => void;
  successfulBookingsCount: number;
}

export function HomePage({
  services,
  selectedLocation,
  onChangeLocation,
  savedServiceIds,
  onToggleSave,
  onSearchSubmit,
  onSelectCategory,
  onExploreAll,
  onViewDetails,
  onBookNow,
  successfulBookingsCount,
}: HomePageProps) {
  const [searchInput, setSearchInput] = useState('');

  const popularServices = services.filter((s) => s.popular).slice(0, 3);
  const recommendedServices = services.filter((s) => s.recommended).slice(0, 3);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchInput.trim());
  };

  return (
    <div className="space-y-14 md:space-y-20">
      {/* Section 1: Hero Split + Search & Location */}
      <section className="pt-6 md:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Value Prop, Location, Search & Primary CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-sm font-semibold text-violet-700 tracking-tight mb-3">
              Nearby Services. Easy Booking. Student Friendly.
            </p>

            <h1 className="font-display font-bold text-[clamp(2.15rem,4vw,3.35rem)] leading-[1.1] tracking-tight text-[#171321] text-balance max-w-2xl">
              Reliable hostel services around Raipur Road, no vehicle needed.
            </h1>

            <p className="mt-4 text-base md:text-lg text-[#5B536E] leading-relaxed max-w-xl">
              Built for DGU &amp; DBS Global University MBA students. Compare transparent local prices
              for laundry, homestyle tiffins, printing, and repairs—and book directly to your hostel gate.
            </p>

            {/* Location Selector + Search Bar */}
            <form
              onSubmit={handleSubmit}
              className="mt-7 bg-white rounded-2xl border border-[#E4DEF0] p-2 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-2xl"
            >
              {/* Location Selector */}
              <div className="relative flex items-center sm:w-52 shrink-0 border-b sm:border-b-0 sm:border-r border-[#EAE6F2] pb-2 sm:pb-0 sm:pr-2">
                <MapPin className="w-4 h-4 text-violet-700 shrink-0 ml-2.5 mr-2" aria-hidden="true" />
                <label htmlFor="home-location" className="sr-only">
                  Select Location
                </label>
                <select
                  id="home-location"
                  value={selectedLocation}
                  onChange={(e) => onChangeLocation(e.target.value)}
                  className="w-full min-h-[40px] bg-transparent text-sm font-medium text-[#171321] pr-2 focus:outline-none cursor-pointer truncate"
                >
                  {LOCATION_OPTIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Input */}
              <div className="relative flex-1 flex items-center">
                <Search className="w-4 h-4 text-[#7C7293] shrink-0 ml-2.5 mr-2" aria-hidden="true" />
                <label htmlFor="home-search" className="sr-only">
                  What service do you need?
                </label>
                <input
                  id="home-search"
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="What service do you need?"
                  className="w-full min-h-[42px] bg-transparent text-sm text-[#171321] placeholder:text-[#867D9C] focus:outline-none pr-2"
                />
              </div>

              <button
                type="submit"
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-violet-700 hover:bg-violet-800 active:scale-[0.98] text-white text-sm font-semibold transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-1"
              >
                Search
              </button>
            </form>

            {/* Primary & Secondary CTAs */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onExploreAll}
                className="min-h-[48px] px-6 py-3 rounded-xl bg-violet-700 hover:bg-violet-800 active:scale-[0.98] text-white text-sm font-semibold inline-flex items-center gap-2 transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
              >
                <span>Find a Service Near You</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onSelectCategory(ServiceCategory.LAUNDRY)}
                className="min-h-[48px] px-5 py-3 rounded-xl border border-[#DDD6EB] bg-white hover:bg-[#F5F3FF] text-[#171321] text-sm font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
              >
                Explore Services
              </button>
            </div>

            <p className="mt-4 text-xs text-[#6E6582]">
              Prototype MVP for Raipur Road, Dehradun · Listings represent sample local partner businesses.
            </p>
          </div>

          {/* Right Column: Full-Height Editorial Student Photo */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden bg-[#F3F0FA] border border-[#EAE6F2] aspect-[16/10] lg:aspect-auto lg:h-full min-h-[260px]">
              <ServiceImage
                src="/src/assets/images/hero_raipur_campus_1795060990206.jpg"
                alt="MBA students living in hostels around Raipur Road, Dehradun using Rajpriya nearby services"
                title="Rajpriya Student Community"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#171321]/85 via-[#171321]/45 to-transparent p-6 pt-16 text-white">
                <p className="text-xs font-medium text-violet-200">
                  Raipur Road Hostel Corridor · Within 500m
                </p>
                <p className="font-display font-semibold text-lg leading-snug mt-1">
                  Pay on delivery or completion — zero upfront hassle.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column MVP Metric & Trust Strip */}
        <div className="mt-8 bg-white rounded-2xl border border-[#EAE6F2] grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x-0 sm:divide-x divide-[#EAE6F2]">
          <div className="p-5">
            <p className="text-xs text-[#5B536E]">Successful Bookings Tracked</p>
            <p className="mt-1 font-display font-bold text-2xl text-violet-700 tabular-nums">
              {successfulBookingsCount}
            </p>
            <p className="mt-0.5 text-xs text-[#6E6582]">Core MVP validation metric</p>
          </div>
          <div className="p-5">
            <p className="text-xs text-[#5B536E]">Sample Local Providers</p>
            <p className="mt-1 font-display font-bold text-2xl text-[#171321] tabular-nums">
              {services.length}
            </p>
            <p className="mt-0.5 text-xs text-[#6E6582]">Across 8 daily student needs</p>
          </div>
          <div className="p-5">
            <p className="text-xs text-[#5B536E]">Average Distance</p>
            <p className="mt-1 font-display font-bold text-2xl text-[#171321] tabular-nums">
              275m
            </p>
            <p className="mt-0.5 text-xs text-[#6E6582]">3–5 min walk or gate pickup</p>
          </div>
          <div className="p-5">
            <p className="text-xs text-[#5B536E]">Student Starting Prices</p>
            <p className="mt-1 font-display font-bold text-2xl text-[#171321] tabular-nums">
              ₹30+
            </p>
            <p className="mt-0.5 text-xs text-[#6E6582]">Upfront rates before booking</p>
          </div>
        </div>
      </section>

      {/* Section 2: Browse by Category (8 Categories) */}
      <section aria-labelledby="categories-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <h2 id="categories-heading" className="font-display font-bold text-2xl md:text-3xl text-[#171321] tracking-tight">
              Browse by Category
            </h2>
            <p className="mt-1 text-sm text-[#5B536E]">
              Everything MBA hostel students need along {selectedLocation}.
            </p>
          </div>
          <button
            type="button"
            onClick={onExploreAll}
            className="self-start sm:self-auto text-sm font-semibold text-violet-700 hover:text-violet-900 inline-flex items-center gap-1.5 whitespace-nowrap focus-visible:outline-none focus-visible:underline"
          >
            <span>Explore Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 md:gap-4">
          {CATEGORY_LIST.map(({ category, shortLabel, subtitle }) => (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className="group bg-white hover:bg-[#F5F3FF] rounded-2xl border border-[#EAE6F2] hover:border-violet-300 p-4 md:p-5 text-left transition-all duration-150 flex flex-col justify-between min-h-[112px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F3F0FA] group-hover:bg-violet-700 text-violet-700 group-hover:text-white flex items-center justify-center transition-colors duration-150">
                <CategoryIcon category={category} className="w-5 h-5" />
              </div>
              <div className="mt-3.5">
                <p className="font-semibold text-sm md:text-[15px] text-[#171321] leading-snug">
                  {shortLabel}
                </p>
                <p className="text-xs text-[#6E6582] mt-0.5">{subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Section 3: Popular Near You */}
      <section aria-labelledby="popular-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <h2 id="popular-heading" className="font-display font-bold text-2xl md:text-3xl text-[#171321] tracking-tight">
              Popular Near You
            </h2>
            <p className="mt-1 text-sm text-[#5B536E]">
              Most booked sample services around Raipur Road hostels this week.
            </p>
          </div>
          <button
            type="button"
            onClick={onExploreAll}
            className="self-start sm:self-auto text-sm font-semibold text-violet-700 hover:text-violet-900 inline-flex items-center gap-1.5 whitespace-nowrap focus-visible:outline-none focus-visible:underline"
          >
            <span>See all nearby</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularServices.map((service) => (
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
      </section>

      {/* Section 4: Recommended for Students */}
      <section aria-labelledby="recommended-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <h2 id="recommended-heading" className="font-display font-bold text-2xl md:text-3xl text-[#171321] tracking-tight">
              Recommended for Students
            </h2>
            <p className="mt-1 text-sm text-[#5B536E]">
              Budget-friendly picks with fast hostel gate pickup or delivery.
            </p>
          </div>
          <button
            type="button"
            onClick={onExploreAll}
            className="self-start sm:self-auto px-4 py-2 rounded-xl border border-[#DDD6EB] bg-white hover:bg-[#F5F3FF] text-sm font-semibold text-[#171321] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
          >
            Explore Services
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedServices.map((service) => (
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
      </section>
    </div>
  );
}
