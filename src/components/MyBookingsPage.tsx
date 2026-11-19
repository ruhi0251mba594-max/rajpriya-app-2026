import { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  RefreshCw,
  Star,
  XCircle,
} from 'lucide-react';
import { Booking, BookingStatus } from '../types';

interface MyBookingsPageProps {
  bookings: Booking[];
  highlightedBookingId?: string | null;
  onCancelBooking: (bookingId: string) => void;
  onMarkCompleted: (bookingId: string) => void;
  onReviewService: (serviceId: string) => void;
  onBookAgain: (serviceId: string) => void;
  onExploreServices: () => void;
}

type StatusFilter = 'All' | BookingStatus;

export function MyBookingsPage({
  bookings,
  highlightedBookingId,
  onCancelBooking,
  onMarkCompleted,
  onReviewService,
  onBookAgain,
  onExploreServices,
}: MyBookingsPageProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);

  const filterTabs: { id: StatusFilter; label: string }[] = [
    { id: 'All', label: 'All' },
    { id: BookingStatus.CONFIRMED, label: 'Confirmed' },
    { id: BookingStatus.IN_PROGRESS, label: 'In Progress' },
    { id: BookingStatus.COMPLETED, label: 'Completed' },
    { id: BookingStatus.CANCELLED, label: 'Cancelled' },
  ];

  const filteredBookings =
    statusFilter === 'All'
      ? bookings
      : bookings.filter((b) => b.status === statusFilter);

  const successfulCount = bookings.filter((b) => b.status !== BookingStatus.CANCELLED).length;

  const renderStatus = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.CONFIRMED:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-700">
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirmed</span>
          </span>
        );
      case BookingStatus.IN_PROGRESS:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700">
            <Clock className="w-4 h-4" />
            <span>In Progress</span>
          </span>
        );
      case BookingStatus.COMPLETED:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
            <CheckCircle2 className="w-4 h-4" />
            <span>Completed</span>
          </span>
        );
      case BookingStatus.CANCELLED:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700">
            <XCircle className="w-4 h-4" />
            <span>Cancelled</span>
          </span>
        );
    }
  };

  return (
    <div className="pt-6 md:pt-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-violet-700 tabular-nums">
            {successfulCount} Successful Bookings Tracked
          </p>
          <h1 className="mt-1 font-display font-bold text-3xl text-[#171321] tracking-tight">
            My Bookings
          </h1>
          <p className="mt-1 text-sm text-[#5B536E]">
            Track active pickups, past hostel services, and leave reviews for local partners.
          </p>
        </div>

        <button
          type="button"
          onClick={onExploreServices}
          className="self-start sm:self-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white text-sm font-semibold transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
        >
          Book a New Service
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
        {filterTabs.map((tab) => {
          const active = statusFilter === tab.id;
          const count =
            tab.id === 'All'
              ? bookings.length
              : bookings.filter((b) => b.status === tab.id).length;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`min-h-[40px] px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 ${
                active
                  ? 'bg-violet-700 text-white'
                  : 'bg-white border border-[#EAE6F2] text-[#4A425C] hover:bg-[#F5F3FF]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`ml-1.5 text-xs tabular-nums ${
                  active ? 'text-violet-200' : 'text-[#7C7293]'
                }`}
              >
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EAE6F2] p-10 text-center">
          <p className="font-display font-semibold text-xl text-[#171321]">
            No bookings in this view
          </p>
          <p className="mt-2 text-sm text-[#5B536E]">
            Explore affordable student services around Raipur Road and confirm your first slot.
          </p>
          <button
            type="button"
            onClick={onExploreServices}
            className="mt-5 min-h-[44px] px-5 py-2.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white text-sm font-semibold transition-colors whitespace-nowrap"
          >
            Explore Services
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => {
            const isHighlighted = booking.id === highlightedBookingId;
            const isActive =
              booking.status === BookingStatus.CONFIRMED ||
              booking.status === BookingStatus.IN_PROGRESS;

            return (
              <article
                key={booking.id}
                className={`bg-white rounded-2xl border p-5 sm:p-6 transition-colors ${
                  isHighlighted
                    ? 'border-violet-400 ring-2 ring-violet-100'
                    : 'border-[#EAE6F2]'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Left Booking Info */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#6E6582]">
                      <span className="font-mono font-semibold text-[#171321] tabular-nums">
                        {booking.id}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{booking.category}</span>
                      <span aria-hidden="true">·</span>
                      {renderStatus(booking.status)}
                    </div>

                    <h2 className="font-display font-bold text-xl text-[#171321]">
                      {booking.serviceName}
                    </h2>
                    <p className="text-sm font-medium text-[#4A425C]">{booking.offeringName}</p>

                    <div className="pt-1 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-[#5B536E]">
                      <span className="inline-flex items-center gap-1.5 tabular-nums">
                        <Calendar className="w-3.5 h-3.5 text-violet-700" />
                        {booking.date} · {booking.time}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-violet-700" />
                        {booking.hostelLocation}
                      </span>
                    </div>

                    {booking.instructions && (
                      <p className="text-xs text-[#6E6582] pt-1">
                        Note: {booking.instructions}
                      </p>
                    )}
                  </div>

                  {/* Right Price & Actions */}
                  <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#F1EEF7] shrink-0">
                    <div className="md:text-right">
                      <p className="text-xs text-[#6E6582]">Estimated Total</p>
                      <p className="font-display font-bold text-2xl text-[#171321] tabular-nums">
                        ₹{booking.estimatedPrice}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {isActive && (
                        <>
                          <button
                            type="button"
                            onClick={() => onMarkCompleted(booking.id)}
                            className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-[#F5F3FF] hover:bg-violet-100 text-violet-800 text-xs font-semibold transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
                          >
                            Mark Completed
                          </button>

                          {confirmCancelId === booking.id ? (
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  onCancelBooking(booking.id);
                                  setConfirmCancelId(null);
                                }}
                                className="min-h-[38px] px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold whitespace-nowrap"
                              >
                                Confirm Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmCancelId(null)}
                                className="min-h-[38px] px-3 py-1.5 rounded-xl border border-[#DDD6EB] text-xs font-medium text-[#5B536E] whitespace-nowrap"
                              >
                                Keep
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setConfirmCancelId(booking.id)}
                              className="min-h-[38px] px-3.5 py-1.5 rounded-xl border border-[#E4DEF0] hover:border-rose-300 hover:text-rose-700 text-[#5B536E] text-xs font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
                            >
                              Cancel Booking
                            </button>
                          )}
                        </>
                      )}

                      {booking.status === BookingStatus.COMPLETED && (
                        <>
                          <button
                            type="button"
                            onClick={() => onReviewService(booking.serviceId)}
                            className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
                          >
                            <Star className="w-3.5 h-3.5" />
                            <span>Rate &amp; Review</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onBookAgain(booking.serviceId)}
                            className="min-h-[38px] px-3.5 py-1.5 rounded-xl border border-[#DDD6EB] hover:bg-[#F5F3FF] text-[#171321] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Book Again</span>
                          </button>
                        </>
                      )}

                      {booking.status === BookingStatus.CANCELLED && (
                        <button
                          type="button"
                          onClick={() => onBookAgain(booking.serviceId)}
                          className="min-h-[38px] px-3.5 py-1.5 rounded-xl border border-[#DDD6EB] hover:bg-[#F5F3FF] text-[#171321] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Book Again</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
