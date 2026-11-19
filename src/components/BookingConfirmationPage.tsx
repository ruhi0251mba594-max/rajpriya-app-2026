import { ArrowRight, Calendar, CheckCircle2, MapPin, Receipt } from 'lucide-react';
import { Booking } from '../types';

interface BookingConfirmationPageProps {
  booking: Booking;
  onViewBookings: () => void;
  onExploreServices: () => void;
  onBackHome: () => void;
}

export function BookingConfirmationPage({
  booking,
  onViewBookings,
  onExploreServices,
  onBackHome,
}: BookingConfirmationPageProps) {
  return (
    <div className="pt-8 md:pt-12 max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl border border-[#EAE6F2] p-6 sm:p-9 space-y-7">
        {/* Confirmation Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="font-display font-bold text-3xl text-[#171321] tracking-tight">
            Booking Confirmed!
          </h1>
          <p className="text-sm text-[#5B536E] max-w-md mx-auto">
            Your request with <strong className="text-[#171321]">{booking.serviceName}</strong> is
            confirmed. Pay directly via UPI or cash once completed.
          </p>
        </div>

        {/* Receipt Details Grid */}
        <div className="bg-[#FAF9FC] rounded-2xl border border-[#EAE6F2] p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#EAE6F2]">
            <div>
              <p className="text-xs text-[#6E6582]">Booking ID</p>
              <p className="font-mono font-semibold text-base text-[#171321] tabular-nums mt-0.5">
                {booking.id}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs text-[#6E6582]">Booking Status</p>
              <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{booking.status}</span>
              </p>
            </div>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-xs text-[#6E6582]">Service</dt>
              <dd className="font-semibold text-[#171321] mt-0.5">{booking.serviceName}</dd>
              <dd className="text-xs text-[#5B536E] mt-0.5">{booking.offeringName}</dd>
            </div>

            <div>
              <dt className="text-xs text-[#6E6582] inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-violet-700" />
                <span>Date &amp; Time</span>
              </dt>
              <dd className="font-semibold text-[#171321] mt-0.5 tabular-nums">
                {booking.date} · {booking.time}
              </dd>
            </div>

            <div>
              <dt className="text-xs text-[#6E6582] inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-violet-700" />
                <span>Hostel / Location</span>
              </dt>
              <dd className="font-medium text-[#171321] mt-0.5">{booking.hostelLocation}</dd>
            </div>

            <div>
              <dt className="text-xs text-[#6E6582] inline-flex items-center gap-1">
                <Receipt className="w-3.5 h-3.5 text-violet-700" />
                <span>Estimated Price</span>
              </dt>
              <dd className="font-display font-bold text-xl text-violet-700 tabular-nums mt-0.5">
                ₹{booking.estimatedPrice}
              </dd>
            </div>
          </dl>

          {booking.instructions && (
            <div className="pt-3 border-t border-[#EAE6F2] text-xs text-[#5B536E]">
              <span className="font-semibold text-[#171321]">Instructions: </span>
              {booking.instructions}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <button
            type="button"
            onClick={onViewBookings}
            className="min-h-[48px] px-6 py-3 rounded-xl bg-violet-700 hover:bg-violet-800 active:scale-[0.98] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
          >
            <span>View Booking</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onExploreServices}
            className="min-h-[48px] px-6 py-3 rounded-xl border border-[#DDD6EB] bg-white hover:bg-[#F5F3FF] text-[#171321] text-sm font-semibold transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
          >
            Explore Services
          </button>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={onBackHome}
            className="text-xs font-medium text-[#6E6582] hover:text-violet-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
