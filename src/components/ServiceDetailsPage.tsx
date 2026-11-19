import { FormEvent, useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Star,
  Truck,
} from 'lucide-react';
import { ServiceOffering, ServiceProvider, StudentProfile } from '../types';
import { ServiceImage } from './ServiceImage';

interface ServiceDetailsPageProps {
  service: ServiceProvider;
  profile: StudentProfile;
  isSaved: boolean;
  onToggleSave: (serviceId: string) => void;
  onBack: () => void;
  onBookOffering: (serviceId: string, offeringId?: string) => void;
  onSubmitReview: (serviceId: string, rating: number, comment: string, studentName: string) => void;
}

export function ServiceDetailsPage({
  service,
  profile,
  isSaved,
  onToggleSave,
  onBack,
  onBookOffering,
  onSubmitReview,
}: ServiceDetailsPageProps) {
  const [selectedOfferingId, setSelectedOfferingId] = useState<string>(
    service.offerings[0]?.id ?? ''
  );

  // Review Form State
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [reviewerName, setReviewerName] = useState<string>(profile.name);
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);
  const [reviewError, setReviewError] = useState<string>('');

  const selectedOffering: ServiceOffering | undefined =
    service.offerings.find((o) => o.id === selectedOfferingId) ?? service.offerings[0];

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      setReviewError('Please write a brief review before submitting.');
      return;
    }
    setReviewError('');
    onSubmitReview(
      service.id,
      reviewRating,
      reviewComment.trim(),
      reviewerName.trim() || profile.name
    );
    setReviewComment('');
    setReviewRating(5);
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  return (
    <div className="pt-6 md:pt-8 space-y-8">
      {/* Back Breadcrumb */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="min-h-[40px] inline-flex items-center gap-2 text-sm font-medium text-[#5B536E] hover:text-[#171321] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded-lg pr-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </button>

        <button
          type="button"
          onClick={() => onToggleSave(service.id)}
          className={`min-h-[40px] px-3.5 py-2 rounded-xl border text-sm font-medium inline-flex items-center gap-2 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 ${
            isSaved
              ? 'bg-violet-50 border-violet-300 text-violet-800'
              : 'bg-white border-[#DDD6EB] text-[#171321] hover:bg-[#F5F3FF]'
          }`}
        >
          <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
          <span>{isSaved ? 'Saved' : 'Save Service'}</span>
        </button>
      </div>

      {/* Main 2-Column Sticky Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Photo, Overview, Services Offered, Reviews */}
        <div className="lg:col-span-8 space-y-8">
          {/* Hero Media + Core Header */}
          <div className="bg-white rounded-2xl border border-[#EAE6F2] overflow-hidden">
            <div className="aspect-[16/9] bg-[#F3F0FA] overflow-hidden">
              <ServiceImage
                src={service.image}
                alt={service.name}
                title={service.name}
                category={service.category}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:p-7">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#5B536E]">
                <span className="font-semibold text-violet-700">{service.category}</span>
                <span aria-hidden="true">·</span>
                <span>Sample Local Partner</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  {service.distanceMeters}m away ({service.walkMinutes} min walk)
                </span>
              </div>

              <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
                <h1 className="font-display font-bold text-2xl md:text-3xl text-[#171321] tracking-tight">
                  {service.name}
                </h1>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-[#171321] tabular-nums">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>{service.rating.toFixed(1)}</span>
                  <span className="text-[#5B536E] font-normal">
                    ({service.reviewCount} student reviews)
                  </span>
                </div>
              </div>

              <p className="mt-3 text-sm md:text-base text-[#5B536E] leading-relaxed">
                {service.fullDescription}
              </p>

              {/* Key Logistics Grid */}
              <div className="mt-6 pt-6 border-t border-[#F1EEF7] grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-violet-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#171321]">{service.location}</p>
                    <p className="text-xs text-[#6E6582] mt-0.5">{service.landmark}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-violet-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#171321]">{service.estimatedTime}</p>
                    <p className="text-xs text-[#6E6582] mt-0.5">{service.availabilityHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Truck className="w-4 h-4 text-violet-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#171321]">
                      {service.doorstepService
                        ? 'Hostel Gate Pickup & Delivery Available'
                        : 'Walk-In Appointment Only (4 min walk)'}
                    </p>
                    <p className="text-xs text-[#6E6582] mt-0.5">{service.studentPerk}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-violet-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#171321] tabular-nums">{service.contactPhone}</p>
                    <p className="text-xs text-[#6E6582] mt-0.5">
                      Sample demo contact for Raipur Road prototype
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Offered Menu */}
          <section
            aria-labelledby="offerings-heading"
            className="bg-white rounded-2xl border border-[#EAE6F2] p-6 md:p-7"
          >
            <h2 id="offerings-heading" className="font-display font-bold text-xl text-[#171321]">
              Services Offered &amp; Student Pricing
            </h2>
            <p className="mt-1 text-sm text-[#5B536E]">
              Select an option to pre-fill your booking estimate.
            </p>

            <div className="mt-5 divide-y divide-[#F1EEF7]">
              {service.offerings.map((offering) => {
                const isSelected = offering.id === selectedOffering?.id;
                return (
                  <div
                    key={offering.id}
                    className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedOfferingId(offering.id)}
                      className="flex-1 text-left flex items-start gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded-lg"
                    >
                      <span
                        className={`mt-1 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-violet-700' : 'border-[#C9BFE0]'
                        }`}
                      >
                        {isSelected && <span className="w-2 h-2 rounded-full bg-violet-700" />}
                      </span>
                      <div>
                        <p className="font-semibold text-[15px] text-[#171321]">{offering.name}</p>
                        <p className="text-xs text-[#5B536E] mt-0.5 leading-relaxed">
                          {offering.description}
                        </p>
                      </div>
                    </button>

                    <div className="flex items-center justify-between sm:justify-end gap-4 pl-7 sm:pl-0 shrink-0">
                      <div className="text-left sm:text-right">
                        <p className="font-bold text-base text-[#171321] tabular-nums">
                          ₹{offering.price}
                        </p>
                        <p className="text-xs text-[#6E6582]">{offering.unit}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onBookOffering(service.id, offering.id)}
                        className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-[#F5F3FF] hover:bg-violet-700 text-violet-800 hover:text-white text-xs font-semibold transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
                      >
                        Book This
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Screen 8: Reviews & Ratings Section */}
          <section
            id="reviews-section"
            aria-labelledby="reviews-heading"
            className="bg-white rounded-2xl border border-[#EAE6F2] p-6 md:p-7 space-y-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h2 id="reviews-heading" className="font-display font-bold text-xl text-[#171321]">
                  Student Reviews &amp; Ratings
                </h2>
                <p className="mt-1 text-sm text-[#5B536E]">
                  Feedback from DGU / DBS Global University hostel residents.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-[#171321] tabular-nums">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{service.rating.toFixed(1)} out of 5</span>
                <span className="text-[#6E6582] font-normal">· {service.reviewCount} ratings</span>
              </div>
            </div>

            {/* Submit Review Form */}
            <form
              onSubmit={handleReviewSubmit}
              className="bg-[#FAF9FC] rounded-xl border border-[#EAE6F2] p-5 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[#171321]">Rate this service</p>
                  <p className="text-xs text-[#6E6582]">Share your experience to help fellow students.</p>
                </div>

                {/* 1-5 Star Picker */}
                <div className="flex items-center gap-1" role="radiogroup" aria-label="Star rating">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const active = star <= (hoverRating || reviewRating);
                    return (
                      <button
                        key={star}
                        type="button"
                        role="radio"
                        aria-checked={reviewRating === star}
                        aria-label={`${star} star${star > 1 ? 's' : ''}`}
                        onClick={() => setReviewRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-violet-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
                      >
                        <Star
                          className={`w-5 h-5 transition-colors ${
                            active ? 'text-amber-500 fill-amber-500' : 'text-[#C8C0DA]'
                          }`}
                        />
                      </button>
                    );
                  })}
                  <span className="ml-2 text-xs font-semibold text-[#171321] tabular-nums">
                    {reviewRating}.0 / 5
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label htmlFor="reviewer-name" className="block text-xs font-medium text-[#5B536E] mb-1">
                    Your Name
                  </label>
                  <input
                    id="reviewer-name"
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="Student name"
                    className="w-full min-h-[42px] px-3 py-2 rounded-xl bg-white border border-[#DDD6EB] text-sm text-[#171321] focus:outline-none focus:ring-2 focus:ring-violet-600"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="review-comment" className="block text-xs font-medium text-[#5B536E] mb-1">
                    Short Review
                  </label>
                  <input
                    id="review-comment"
                    type="text"
                    value={reviewComment}
                    onChange={(e) => {
                      setReviewComment(e.target.value);
                      if (reviewError) setReviewError('');
                    }}
                    placeholder="How was the quality, punctuality, and pricing?"
                    className="w-full min-h-[42px] px-3 py-2 rounded-xl bg-white border border-[#DDD6EB] text-sm text-[#171321] placeholder:text-[#867D9C] focus:outline-none focus:ring-2 focus:ring-violet-600"
                  />
                </div>
              </div>

              {reviewError && <p className="text-xs font-medium text-rose-700">{reviewError}</p>}

              <div className="flex flex-wrap items-center justify-between gap-3">
                {reviewSubmitted ? (
                  <p className="text-xs font-semibold text-emerald-700 inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Thank you! Your review has been added.</span>
                  </p>
                ) : (
                  <span className="text-xs text-[#6E6582]">
                    Posted as verified hostel resident ({profile.hostelLocation.split('—')[1]?.trim() || 'Raipur Road'})
                  </span>
                )}

                <button
                  type="submit"
                  className="min-h-[42px] px-5 py-2 rounded-xl bg-violet-700 hover:bg-violet-800 active:scale-[0.98] text-white text-sm font-semibold transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
                >
                  Submit Review
                </button>
              </div>
            </form>

            {/* Existing Reviews List */}
            <div className="divide-y divide-[#F1EEF7]">
              {service.reviews.map((review) => (
                <div key={review.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm">
                      <span className="font-semibold text-[#171321]">{review.studentName}</span>
                      <span className="text-[#867D9C] mx-1.5" aria-hidden="true">·</span>
                      <span className="text-xs text-[#6E6582]">{review.hostel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#6E6582]">
                      <span className="inline-flex items-center gap-0.5 font-semibold text-[#171321] tabular-nums">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        {review.rating.toFixed(1)}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-[#4A425C] leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Contiguous Sticky Booking Summary Module */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="bg-white rounded-2xl border border-[#EAE6F2] p-6 space-y-5">
            <div>
              <p className="text-xs font-medium text-[#5B536E]">Selected Option</p>
              <p className="mt-1 font-display font-semibold text-lg text-[#171321]">
                {selectedOffering?.name ?? service.name}
              </p>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="font-display font-bold text-3xl text-[#171321] tabular-nums">
                  ₹{selectedOffering?.price ?? service.startingPrice}
                </span>
                <span className="text-sm text-[#5B536E]">
                  {selectedOffering?.unit ?? service.priceUnit}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F1EEF7] space-y-2.5 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#5B536E]">Availability</span>
                <span
                  className={`font-semibold ${
                    service.availableNow ? 'text-emerald-700' : 'text-amber-700'
                  }`}
                >
                  {service.availableNow ? 'Available Today' : 'Next Slot: 9:00 AM'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#5B536E]">Turnaround</span>
                <span className="font-medium text-[#171321] text-right">
                  {service.estimatedTime.split('(')[0].trim()}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#5B536E]">Distance</span>
                <span className="font-medium text-[#171321] tabular-nums">
                  {service.distanceMeters}m from Raipur Rd
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#5B536E]">Payment</span>
                <span className="font-medium text-[#171321]">Pay on completion</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onBookOffering(service.id, selectedOffering?.id)}
              className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-violet-700 hover:bg-violet-800 active:scale-[0.98] text-white text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
            >
              Book Now
            </button>

            <p className="text-xs text-[#6E6582] text-center leading-relaxed">
              No prepayment required. Confirm your hostel slot and pay directly to the partner via UPI or cash.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
