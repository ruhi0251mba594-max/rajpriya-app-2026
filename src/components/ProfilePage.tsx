import { FormEvent, useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  CalendarCheck,
  CheckCircle2,
  HelpCircle,
  MapPin,
  Phone,
  RotateCcw,
  User,
} from 'lucide-react';
import { HOSTEL_OPTIONS } from '../data/sampleServices';
import { ServiceProvider, StudentProfile, SupportTicket } from '../types';
import { ServiceImage } from './ServiceImage';

interface ProfilePageProps {
  profile: StudentProfile;
  onUpdateProfile: (next: StudentProfile) => void;
  savedServices: ServiceProvider[];
  onToggleSave: (serviceId: string) => void;
  onViewDetails: (serviceId: string) => void;
  onBookNow: (serviceId: string) => void;
  onGoToBookings: () => void;
  successfulBookingsCount: number;
  totalBookingsCount: number;
  supportTickets: SupportTicket[];
  onSubmitSupport: (topic: string, message: string) => void;
  onResetDemo: () => void;
}

export function ProfilePage({
  profile,
  onUpdateProfile,
  savedServices,
  onToggleSave,
  onViewDetails,
  onBookNow,
  onGoToBookings,
  successfulBookingsCount,
  totalBookingsCount,
  supportTickets,
  onSubmitSupport,
  onResetDemo,
}: ProfilePageProps) {
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [hostelLocation, setHostelLocation] = useState(profile.hostelLocation);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const [supportTopic, setSupportTopic] = useState('Booking or Pickup Timing');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSent, setSupportSent] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleProfileSave = (e: FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      name: name.trim() || profile.name,
      phone: phone.trim() || profile.phone,
      hostelLocation: hostelLocation.trim() || profile.hostelLocation,
    });
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  const handleSupportSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    onSubmitSupport(supportTopic, supportMessage.trim());
    setSupportMessage('');
    setSupportSent(true);
    setTimeout(() => setSupportSent(false), 3500);
  };

  return (
    <div className="pt-6 md:pt-8 space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold text-violet-700">Student Account</p>
        <h1 className="mt-1 font-display font-bold text-3xl text-[#171321] tracking-tight">
          Profile &amp; Preferences
        </h1>
        <p className="mt-1 text-sm text-[#5B536E]">
          Manage your hostel details for faster one-tap service bookings around Raipur Road.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Profile Form + Saved Services */}
        <div className="lg:col-span-7 space-y-8">
          {/* Student Details Card */}
          <section
            aria-labelledby="student-info-heading"
            className="bg-white rounded-2xl border border-[#EAE6F2] p-6 space-y-5"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F3F0FA] text-violet-700 flex items-center justify-center shrink-0">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 id="student-info-heading" className="font-display font-bold text-xl text-[#171321]">
                  {profile.name}
                </h2>
                <p className="text-xs text-[#6E6582] mt-0.5">{profile.program}</p>
              </div>
            </div>

            <form onSubmit={handleProfileSave} className="space-y-4 pt-2 border-t border-[#F1EEF7]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="profile-name" className="block text-xs font-semibold text-[#5B536E] mb-1.5">
                    Student Name
                  </label>
                  <input
                    id="profile-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF9FC] border border-[#DDD6EB] text-sm text-[#171321] focus:outline-none focus:ring-2 focus:ring-violet-600"
                  />
                </div>

                <div>
                  <label htmlFor="profile-phone" className="block text-xs font-semibold text-[#5B536E] mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#7C7293] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="profile-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full min-h-[42px] pl-9 pr-3.5 py-2 rounded-xl bg-[#FAF9FC] border border-[#DDD6EB] text-sm text-[#171321] tabular-nums focus:outline-none focus:ring-2 focus:ring-violet-600"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="profile-hostel" className="block text-xs font-semibold text-[#5B536E] mb-1.5">
                  Hostel / Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#7C7293] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="profile-hostel"
                    type="text"
                    list="profile-hostel-options"
                    value={hostelLocation}
                    onChange={(e) => setHostelLocation(e.target.value)}
                    className="w-full min-h-[42px] pl-9 pr-3.5 py-2 rounded-xl bg-[#FAF9FC] border border-[#DDD6EB] text-sm text-[#171321] focus:outline-none focus:ring-2 focus:ring-violet-600"
                  />
                  <datalist id="profile-hostel-options">
                    {HOSTEL_OPTIONS.map((h) => (
                      <option key={h} value={h} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                {savedFeedback ? (
                  <span className="text-xs font-semibold text-emerald-700 inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Profile details updated
                  </span>
                ) : (
                  <span className="text-xs text-[#6E6582]">
                    Auto-fills your name, phone &amp; hostel during booking.
                  </span>
                )}

                <button
                  type="submit"
                  className="min-h-[42px] px-5 py-2 rounded-xl bg-violet-700 hover:bg-violet-800 text-white text-sm font-semibold transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
                >
                  Save Details
                </button>
              </div>
            </form>
          </section>

          {/* Saved Services Section */}
          <section
            aria-labelledby="saved-services-heading"
            className="bg-white rounded-2xl border border-[#EAE6F2] p-6 space-y-5"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-5 h-5 text-violet-700" />
                <h2 id="saved-services-heading" className="font-display font-bold text-xl text-[#171321]">
                  Saved Services
                </h2>
              </div>
              <span className="text-xs font-medium text-[#6E6582] tabular-nums">
                {savedServices.length} saved
              </span>
            </div>

            {savedServices.length === 0 ? (
              <p className="text-sm text-[#5B536E] py-4">
                You haven&apos;t bookmarked any services yet. Tap the bookmark icon on any service card
                to keep your favorite laundry, tiffin, or print hub handy.
              </p>
            ) : (
              <div className="divide-y divide-[#F1EEF7]">
                {savedServices.map((service) => (
                  <div
                    key={service.id}
                    className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-16 h-12 rounded-xl overflow-hidden bg-[#F3F0FA] shrink-0">
                        <ServiceImage
                          src={service.image}
                          alt={service.name}
                          title={service.name}
                          category={service.category}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <button
                          type="button"
                          onClick={() => onViewDetails(service.id)}
                          className="font-semibold text-sm text-[#171321] hover:text-violet-700 truncate block text-left"
                        >
                          {service.name}
                        </button>
                        <p className="text-xs text-[#6E6582] truncate">
                          {service.category} · {service.distanceMeters}m · Starts ₹{service.startingPrice}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => onBookNow(service.id)}
                        className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white text-xs font-semibold whitespace-nowrap"
                      >
                        Book Now
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleSave(service.id)}
                        className="min-h-[38px] px-3 py-1.5 rounded-xl border border-[#DDD6EB] hover:bg-[#F5F3FF] text-[#5B536E] text-xs font-medium whitespace-nowrap"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right Column: My Bookings Shortcut + Help & Support + Demo Metric */}
        <div className="lg:col-span-5 space-y-6">
          {/* My Bookings Quick Card */}
          <section className="bg-white rounded-2xl border border-[#EAE6F2] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CalendarCheck className="w-5 h-5 text-violet-700" />
                <h2 className="font-display font-bold text-lg text-[#171321]">My Bookings</h2>
              </div>
              <span className="text-xs font-semibold text-violet-700 tabular-nums">
                {totalBookingsCount} total
              </span>
            </div>

            <p className="text-sm text-[#5B536E]">
              You have{' '}
              <strong className="text-[#171321] tabular-nums">{successfulBookingsCount}</strong>{' '}
              successful student bookings recorded on Rajpriya.
            </p>

            <button
              type="button"
              onClick={onGoToBookings}
              className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-[#F5F3FF] hover:bg-violet-100 text-violet-800 text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
            >
              <span>View Booking History</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </section>

          {/* Help & Support Card */}
          <section
            aria-labelledby="support-heading"
            className="bg-white rounded-2xl border border-[#EAE6F2] p-6 space-y-4"
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-5 h-5 text-violet-700" />
              <h2 id="support-heading" className="font-display font-bold text-lg text-[#171321]">
                Help &amp; Support
              </h2>
            </div>

            <div className="space-y-2.5 text-xs text-[#5B536E] leading-relaxed">
              <p>
                <strong className="text-[#171321]">How do payments work?</strong> Pay the local
                service partner directly via UPI or cash upon pickup, delivery, or completion.
              </p>
              <p>
                <strong className="text-[#171321]">Campus Desk Hours:</strong> 8:00 AM – 10:00 PM
                daily for Raipur Road hostel students.
              </p>
            </div>

            <form onSubmit={handleSupportSubmit} className="space-y-3 pt-3 border-t border-[#F1EEF7]">
              <div>
                <label htmlFor="support-topic" className="block text-xs font-semibold text-[#5B536E] mb-1">
                  Topic
                </label>
                <select
                  id="support-topic"
                  value={supportTopic}
                  onChange={(e) => setSupportTopic(e.target.value)}
                  className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-[#FAF9FC] border border-[#DDD6EB] text-xs text-[#171321] focus:outline-none focus:ring-2 focus:ring-violet-600"
                >
                  <option>Booking or Pickup Timing</option>
                  <option>Suggest a Raipur Road Vendor</option>
                  <option>Pricing or Quality Feedback</option>
                </select>
              </div>

              <div>
                <label htmlFor="support-message" className="block text-xs font-semibold text-[#5B536E] mb-1">
                  Message
                </label>
                <textarea
                  id="support-message"
                  rows={2}
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="Tell us how our campus team can help..."
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF9FC] border border-[#DDD6EB] text-xs text-[#171321] placeholder:text-[#867D9C] focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
              </div>

              <div className="flex items-center justify-between gap-2">
                {supportSent ? (
                  <span className="text-xs font-semibold text-emerald-700 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Request logged
                  </span>
                ) : (
                  <span className="text-[11px] text-[#6E6582]">
                    {supportTickets.length > 0
                      ? `${supportTickets.length} past inquiry logged`
                      : 'Avg. response under 30 mins'}
                  </span>
                )}
                <button
                  type="submit"
                  className="min-h-[38px] px-4 py-1.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white text-xs font-semibold whitespace-nowrap"
                >
                  Send Message
                </button>
              </div>
            </form>
          </section>

          {/* Prototype Reset Helper for Evaluation Demos */}
          <section className="bg-[#F3F0FA] rounded-2xl border border-[#E4DEF0] p-5 space-y-3">
            <p className="text-xs font-semibold text-[#171321]">
              MVP Prototype Controls
            </p>
            <p className="text-xs text-[#5B536E] leading-relaxed">
              Listings represent sample local businesses around Raipur Road for demonstration. Reset
              local demo data anytime between presentation walkthroughs.
            </p>

            {confirmReset ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onResetDemo();
                    setConfirmReset(false);
                  }}
                  className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white text-xs font-semibold whitespace-nowrap"
                >
                  Confirm Reset
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-white border border-[#DDD6EB] text-[#5B536E] text-xs font-medium whitespace-nowrap"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#FAF9FC] border border-[#DDD6EB] text-[#171321] text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5 text-violet-700" />
                <span>Reset Demo Data</span>
              </button>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
