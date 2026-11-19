import { useEffect, useMemo, useState } from 'react';
import { BookingConfirmationPage } from './components/BookingConfirmationPage';
import { BookingPage } from './components/BookingPage';
import {
  AvailabilityFilter,
  DistanceFilter,
  ExplorePage,
  PriceFilter,
  RatingFilter,
  SortOption,
} from './components/ExplorePage';
import { HomePage } from './components/HomePage';
import { MyBookingsPage } from './components/MyBookingsPage';
import { Navbar } from './components/Navbar';
import { ProfilePage } from './components/ProfilePage';
import { ServiceDetailsPage } from './components/ServiceDetailsPage';
import {
  DEFAULT_PROFILE,
  INITIAL_BOOKINGS,
  INITIAL_SERVICES,
  LOCATION_OPTIONS,
} from './data/sampleServices';
import {
  Booking,
  BookingStatus,
  PageView,
  ServiceCategory,
  ServiceProvider,
  StudentProfile,
  SupportTicket,
} from './types';

const STORAGE_KEYS = {
  SERVICES: 'rajpriya_services_v1',
  BOOKINGS: 'rajpriya_bookings_v1',
  SAVED: 'rajpriya_saved_v1',
  PROFILE: 'rajpriya_profile_v1',
  SUPPORT: 'rajpriya_support_v1',
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activePage, setActivePage] = useState<PageView>('home');
  const [selectedLocation, setSelectedLocation] = useState<string>(LOCATION_OPTIONS[0]);

  // Persistent MVP State
  const [services, setServices] = useState<ServiceProvider[]>(() =>
    loadFromStorage(STORAGE_KEYS.SERVICES, INITIAL_SERVICES)
  );
  const [bookings, setBookings] = useState<Booking[]>(() =>
    loadFromStorage(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS)
  );
  const [savedServiceIds, setSavedServiceIds] = useState<string[]>(() =>
    loadFromStorage(STORAGE_KEYS.SAVED, ['quickwash-laundry', 'freshbite-tiffin'])
  );
  const [profile, setProfile] = useState<StudentProfile>(() =>
    loadFromStorage(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE)
  );
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() =>
    loadFromStorage(STORAGE_KEYS.SUPPORT, [])
  );

  // Explore Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'All'>('All');
  const [distanceFilter, setDistanceFilter] = useState<DistanceFilter>('any');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('any');
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>('any');
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');

  // Navigation Context State
  const [selectedServiceId, setSelectedServiceId] = useState<string>(INITIAL_SERVICES[0].id);
  const [selectedOfferingId, setSelectedOfferingId] = useState<string | undefined>(undefined);
  const [latestBooking, setLatestBooking] = useState<Booking | null>(null);
  const [highlightedBookingId, setHighlightedBookingId] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<PageView>('explore');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    } catch {
      // Ignore storage quota errors
    }
  }, [services]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch {
      // Ignore storage quota errors
    }
  }, [bookings]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(savedServiceIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [savedServiceIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch {
      // Ignore storage quota errors
    }
  }, [profile]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.SUPPORT, JSON.stringify(supportTickets));
    } catch {
      // Ignore storage quota errors
    }
  }, [supportTickets]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const navigateTo = (page: PageView) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setDistanceFilter('any');
    setPriceFilter('any');
    setRatingFilter('any');
    setAvailabilityFilter('all');
    setSortBy('recommended');
  };

  const handleToggleSave = (serviceId: string) => {
    setSavedServiceIds((prev) => {
      const exists = prev.includes(serviceId);
      const next = exists ? prev.filter((id) => id !== serviceId) : [...prev, serviceId];
      const service = services.find((s) => s.id === serviceId);
      if (service) {
        showToast(exists ? `Removed ${service.name} from saved` : `Saved ${service.name}`);
      }
      return next;
    });
  };

  const handleViewDetails = (serviceId: string, scrollToReviews = false) => {
    setPreviousPage(activePage === 'details' ? previousPage : activePage);
    setSelectedServiceId(serviceId);
    setActivePage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (scrollToReviews) {
      window.setTimeout(() => {
        const el = document.getElementById('reviews-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    }
  };

  const handleStartBooking = (serviceId: string, offeringId?: string) => {
    setPreviousPage(activePage);
    setSelectedServiceId(serviceId);
    setSelectedOfferingId(offeringId);
    navigateTo('booking');
  };

  const handleConfirmBooking = (data: {
    serviceId: string;
    offeringName: string;
    date: string;
    time: string;
    studentName: string;
    phone: string;
    hostelLocation: string;
    instructions: string;
    estimatedPrice: number;
  }) => {
    const provider = services.find((s) => s.id === data.serviceId) ?? services[0];
    const randomCode = Math.floor(2000 + Math.random() * 7999);
    const newBooking: Booking = {
      id: `RJP-2026-${randomCode}`,
      serviceId: provider.id,
      serviceName: provider.name,
      category: provider.category,
      offeringName: data.offeringName,
      date: data.date,
      time: data.time,
      studentName: data.studentName,
      phone: data.phone,
      hostelLocation: data.hostelLocation,
      instructions: data.instructions,
      estimatedPrice: data.estimatedPrice,
      status: BookingStatus.CONFIRMED,
      createdAt: 'Just now',
    };

    setBookings((prev) => [newBooking, ...prev]);
    setLatestBooking(newBooking);
    setHighlightedBookingId(newBooking.id);
    navigateTo('confirmation');
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: BookingStatus.CANCELLED } : b
      )
    );
    showToast(`Booking ${bookingId} cancelled`);
  };

  const handleMarkCompleted = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: BookingStatus.COMPLETED } : b
      )
    );
    showToast(`Booking ${bookingId} marked completed — you can leave a review now`);
  };

  const handleSubmitReview = (
    serviceId: string,
    rating: number,
    comment: string,
    studentName: string
  ) => {
    const hostelShort =
      profile.hostelLocation.split('—')[1]?.split('(')[0]?.trim() || 'Raipur Road Hostel';

    setServices((prev) =>
      prev.map((service) => {
        if (service.id !== serviceId) return service;
        const nextCount = service.reviewCount + 1;
        const nextRating = Number(
          ((service.rating * service.reviewCount + rating) / nextCount).toFixed(1)
        );
        return {
          ...service,
          rating: nextRating,
          reviewCount: nextCount,
          reviews: [
            {
              id: `rev-${Date.now()}`,
              studentName,
              hostel: hostelShort,
              rating,
              comment,
              date: 'Just now',
            },
            ...service.reviews,
          ],
        };
      })
    );
    showToast('Review submitted — thank you for helping fellow students');
  };

  const handleSubmitSupport = (topic: string, message: string) => {
    const ticket: SupportTicket = {
      id: `SUP-${Math.floor(100 + Math.random() * 899)}`,
      topic,
      message,
      createdAt: 'Just now',
    };
    setSupportTickets((prev) => [ticket, ...prev]);
    showToast('Support request received by campus desk');
  };

  const handleResetDemo = () => {
    setServices(INITIAL_SERVICES);
    setBookings(INITIAL_BOOKINGS);
    setSavedServiceIds(['quickwash-laundry', 'freshbite-tiffin']);
    setProfile(DEFAULT_PROFILE);
    setSupportTickets([]);
    setHighlightedBookingId(null);
    resetFilters();
    showToast('Prototype demo data reset');
  };

  const selectedService = useMemo(
    () => services.find((s) => s.id === selectedServiceId) ?? services[0],
    [services, selectedServiceId]
  );

  const savedServices = useMemo(
    () => services.filter((s) => savedServiceIds.includes(s.id)),
    [services, savedServiceIds]
  );

  const activeBookingsCount = useMemo(
    () =>
      bookings.filter(
        (b) =>
          b.status === BookingStatus.CONFIRMED ||
          b.status === BookingStatus.IN_PROGRESS
      ).length,
    [bookings]
  );

  const successfulBookingsCount = useMemo(
    () => bookings.filter((b) => b.status !== BookingStatus.CANCELLED).length,
    [bookings]
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9FC] text-[#171321]">
      <Navbar
        activePage={activePage}
        onNavigate={(page) => {
          if (page === 'explore') {
            setHighlightedBookingId(null);
          }
          navigateTo(page);
        }}
        activeBookingsCount={activeBookingsCount}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-16">
        {activePage === 'home' && (
          <HomePage
            services={services}
            selectedLocation={selectedLocation}
            onChangeLocation={setSelectedLocation}
            savedServiceIds={savedServiceIds}
            onToggleSave={handleToggleSave}
            onSearchSubmit={(query) => {
              setSearchQuery(query);
              setSelectedCategory('All');
              navigateTo('explore');
            }}
            onSelectCategory={(category) => {
              setSelectedCategory(category);
              setSearchQuery('');
              navigateTo('explore');
            }}
            onExploreAll={() => {
              resetFilters();
              navigateTo('explore');
            }}
            onViewDetails={(id) => handleViewDetails(id)}
            onBookNow={(id) => handleStartBooking(id)}
            successfulBookingsCount={successfulBookingsCount}
          />
        )}

        {activePage === 'explore' && (
          <ExplorePage
            services={services}
            selectedLocation={selectedLocation}
            searchQuery={searchQuery}
            onChangeSearch={setSearchQuery}
            selectedCategory={selectedCategory}
            onChangeCategory={setSelectedCategory}
            distanceFilter={distanceFilter}
            onChangeDistance={setDistanceFilter}
            priceFilter={priceFilter}
            onChangePrice={setPriceFilter}
            ratingFilter={ratingFilter}
            onChangeRating={setRatingFilter}
            availabilityFilter={availabilityFilter}
            onChangeAvailability={setAvailabilityFilter}
            sortBy={sortBy}
            onChangeSort={setSortBy}
            onResetFilters={resetFilters}
            savedServiceIds={savedServiceIds}
            onToggleSave={handleToggleSave}
            onViewDetails={(id) => handleViewDetails(id)}
            onBookNow={(id) => handleStartBooking(id)}
          />
        )}

        {activePage === 'details' && selectedService && (
          <ServiceDetailsPage
            service={selectedService}
            profile={profile}
            isSaved={savedServiceIds.includes(selectedService.id)}
            onToggleSave={handleToggleSave}
            onBack={() => navigateTo(previousPage === 'home' ? 'home' : 'explore')}
            onBookOffering={(serviceId, offeringId) =>
              handleStartBooking(serviceId, offeringId)
            }
            onSubmitReview={handleSubmitReview}
          />
        )}

        {activePage === 'booking' && (
          <BookingPage
            services={services}
            initialServiceId={selectedServiceId}
            initialOfferingId={selectedOfferingId}
            profile={profile}
            onBack={() =>
              navigateTo(previousPage === 'details' ? 'details' : 'explore')
            }
            onConfirmBooking={handleConfirmBooking}
          />
        )}

        {activePage === 'confirmation' && latestBooking && (
          <BookingConfirmationPage
            booking={latestBooking}
            onViewBookings={() => navigateTo('bookings')}
            onExploreServices={() => {
              resetFilters();
              navigateTo('explore');
            }}
            onBackHome={() => navigateTo('home')}
          />
        )}

        {activePage === 'bookings' && (
          <MyBookingsPage
            bookings={bookings}
            highlightedBookingId={highlightedBookingId}
            onCancelBooking={handleCancelBooking}
            onMarkCompleted={handleMarkCompleted}
            onReviewService={(serviceId) => handleViewDetails(serviceId, true)}
            onBookAgain={(serviceId) => handleStartBooking(serviceId)}
            onExploreServices={() => {
              resetFilters();
              navigateTo('explore');
            }}
          />
        )}

        {activePage === 'profile' && (
          <ProfilePage
            profile={profile}
            onUpdateProfile={(next) => {
              setProfile(next);
              showToast('Profile saved');
            }}
            savedServices={savedServices}
            onToggleSave={handleToggleSave}
            onViewDetails={(id) => handleViewDetails(id)}
            onBookNow={(id) => handleStartBooking(id)}
            onGoToBookings={() => navigateTo('bookings')}
            successfulBookingsCount={successfulBookingsCount}
            totalBookingsCount={bookings.length}
            supportTickets={supportTickets}
            onSubmitSupport={handleSubmitSupport}
            onResetDemo={handleResetDemo}
          />
        )}
      </main>

      {/* Clean Minimal Footer */}
      <footer className="border-t border-[#EAE6F2] bg-white pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#6E6582]">
          <div>
            <span className="font-display font-bold text-sm text-[#171321]">Rajpriya</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Nearby Services. Easy Booking. Student Friendly.</span>
            <p className="mt-1">
              Built for DGU / DBS Global University hostel students around Raipur Road, Dehradun.
              Listed service providers are sample businesses for MVP demonstration.
            </p>
          </div>
          <div className="flex items-center gap-5 shrink-0 font-medium text-[#4A425C]">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="hover:text-violet-700 transition-colors"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => navigateTo('explore')}
              className="hover:text-violet-700 transition-colors"
            >
              Explore
            </button>
            <button
              type="button"
              onClick={() => navigateTo('bookings')}
              className="hover:text-violet-700 transition-colors"
            >
              Bookings
            </button>
            <button
              type="button"
              onClick={() => navigateTo('profile')}
              className="hover:text-violet-700 transition-colors"
            >
              Profile
            </button>
          </div>
        </div>
      </footer>

      {/* Subtle Non-Blocking Toast Feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 bg-[#171321] text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg max-w-sm"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
