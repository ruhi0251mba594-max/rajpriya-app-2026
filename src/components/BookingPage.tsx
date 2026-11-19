import { FormEvent, useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react';
import { HOSTEL_OPTIONS } from '../data/sampleServices';
import { ServiceProvider, StudentProfile } from '../types';

interface BookingPageProps {
  services: ServiceProvider[];
  initialServiceId: string;
  initialOfferingId?: string;
  profile: StudentProfile;
  onBack: () => void;
  onConfirmBooking: (data: {
    serviceId: string;
    offeringName: string;
    date: string;
    time: string;
    studentName: string;
    phone: string;
    hostelLocation: string;
    instructions: string;
    estimatedPrice: number;
  }) => void;
}

const TIME_SLOTS = [
  '9:00 AM',
  '11:00 AM',
  '2:00 PM',
  '5:00 PM',
  '7:30 PM',
  '8:30 PM',
];

function getDatePresets(): { label: string; value: string }[] {
  const format = (offsetDays: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const iso = d.toISOString().split('T')[0];
    const display =
      offsetDays === 0
        ? 'Today'
        : offsetDays === 1
        ? 'Tomorrow'
        : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    return { label: display, value: iso };
  };
  return [format(0), format(1), format(2)];
}

export function BookingPage({
  services,
  initialServiceId,
  initialOfferingId,
  profile,
  onBack,
  onConfirmBooking,
}: BookingPageProps) {
  const datePresets = getDatePresets();

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || services[0]?.id || ''
  );

  const selectedService =
    services.find((s) => s.id === selectedServiceId) ?? services[0];

  const [selectedOfferingId, setSelectedOfferingId] = useState<string>(
    initialOfferingId &&
      selectedService?.offerings.some((o) => o.id === initialOfferingId)
      ? initialOfferingId
      : selectedService?.offerings[0]?.id ?? ''
  );

  const selectedOffering =
    selectedService?.offerings.find((o) => o.id === selectedOfferingId) ??
    selectedService?.offerings[0];

  const [date, setDate] = useState<string>(datePresets[0].value);
  const [time, setTime] = useState<string>(TIME_SLOTS[2]);
  const [studentName, setStudentName] = useState<string>(profile.name);
  const [phone, setPhone] = useState<string>(profile.phone);
  const [hostelLocation, setHostelLocation] = useState<string>(profile.hostelLocation);
  const [instructions, setInstructions] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleServiceChange = (newId: string) => {
    setSelectedServiceId(newId);
    const nextService = services.find((s) => s.id === newId);
    if (nextService && nextService.offerings[0]) {
      setSelectedOfferingId(nextService.offerings[0].id);
    }
  };

  const formatDisplayDate = (isoDate: string) => {
    const preset = datePresets.find((p) => p.value === isoDate);
    if (preset && (preset.label === 'Today' || preset.label === 'Tomorrow')) {
      return preset.label;
    }
    const parsed = new Date(isoDate + 'T00:00:00');
    if (Number.isNaN(parsed.getTime())) return isoDate;
    return parsed.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!hostelLocation.trim()) {
      setErrorMessage('Please provide your hostel or Raipur Road location.');
      return;
    }

    setErrorMessage('');
    onConfirmBooking({
      serviceId: selectedService.id,
      offeringName: selectedOffering?.name ?? selectedService.name,
      date: formatDisplayDate(date),
      time,
      studentName: studentName.trim(),
      phone: phone.trim(),
      hostelLocation: hostelLocation.trim(),
      instructions: instructions.trim(),
      estimatedPrice: selectedOffering?.price ?? selectedService.startingPrice,
    });
  };

  return (
    <div className="pt-6 md:pt-8 space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="min-h-[40px] inline-flex items-center gap-2 text-sm font-medium text-[#5B536E] hover:text-[#171321] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded-lg pr-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      <div>
        <p className="text-xs font-semibold text-violet-700">Quick Student Booking</p>
        <h1 className="mt-1 font-display font-bold text-3xl text-[#171321] tracking-tight">
          Book Your Service
        </h1>
        <p className="mt-1 text-sm text-[#5B536E]">
          Confirm your preferred slot in under 30 seconds. Pay directly after service completion.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Fields */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#EAE6F2] p-6 md:p-7 space-y-6">
          {/* 1. Service & Package Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="booking-provider" className="block text-sm font-semibold text-[#171321] mb-1.5">
                Select Service Provider
              </label>
              <select
                id="booking-provider"
                value={selectedServiceId}
                onChange={(e) => handleServiceChange(e.target.value)}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#FAF9FC] border border-[#DDD6EB] text-sm text-[#171321] focus:outline-none focus:ring-2 focus:ring-violet-600"
              >
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.category})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="booking-offering" className="block text-sm font-semibold text-[#171321] mb-1.5">
                Select Service / Package
              </label>
              <select
                id="booking-offering"
                value={selectedOffering?.id ?? ''}
                onChange={(e) => setSelectedOfferingId(e.target.value)}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#FAF9FC] border border-[#DDD6EB] text-sm text-[#171321] focus:outline-none focus:ring-2 focus:ring-violet-600"
              >
                {selectedService.offerings.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name} — ₹{o.price}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 2. Date Selection */}
          <div>
            <label htmlFor="booking-date" className="block text-sm font-semibold text-[#171321] mb-2">
              Select Date
            </label>
            <div className="flex flex-wrap items-center gap-2.5">
              {datePresets.map((preset) => {
                const active = date === preset.value;
                return (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setDate(preset.value)}
                    className={`min-h-[42px] px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 ${
                      active
                        ? 'bg-violet-700 text-white'
                        : 'bg-[#FAF9FC] border border-[#DDD6EB] text-[#171321] hover:bg-[#F5F3FF]'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}

              <div className="relative flex-1 min-w-[160px]">
                <Calendar className="w-4 h-4 text-[#7C7293] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="booking-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full min-h-[42px] pl-9 pr-3 py-2 rounded-xl bg-[#FAF9FC] border border-[#DDD6EB] text-sm text-[#171321] focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
              </div>
            </div>
          </div>

          {/* 3. Time Slot Selection */}
          <div>
            <p className="text-sm font-semibold text-[#171321] mb-2">Select Preferred Time</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {TIME_SLOTS.map((slot) => {
                const active = time === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className={`min-h-[42px] px-2 py-2 rounded-xl text-xs sm:text-sm font-medium tabular-nums transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 ${
                      active
                        ? 'bg-violet-700 text-white'
                        : 'bg-[#FAF9FC] border border-[#DDD6EB] text-[#171321] hover:bg-[#F5F3FF]'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Student Details */}
          <div className="pt-2 border-t border-[#F1EEF7] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="booking-name" className="block text-sm font-semibold text-[#171321] mb-1.5">
                Student Name
              </label>
              <input
                id="booking-name"
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#FAF9FC] border border-[#DDD6EB] text-sm text-[#171321] focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>

            <div>
              <label htmlFor="booking-phone" className="block text-sm font-semibold text-[#171321] mb-1.5">
                Phone Number
              </label>
              <input
                id="booking-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#FAF9FC] border border-[#DDD6EB] text-sm text-[#171321] tabular-nums focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>
          </div>

          {/* 5. Hostel / Location */}
          <div>
            <label htmlFor="booking-hostel" className="block text-sm font-semibold text-[#171321] mb-1.5">
              Hostel / Raipur Road Location
            </label>
            <input
              id="booking-hostel"
              type="text"
              required
              list="raipur-hostel-list"
              value={hostelLocation}
              onChange={(e) => setHostelLocation(e.target.value)}
              placeholder="e.g. Raipur Road — Scholar Residency, Room 204"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#FAF9FC] border border-[#DDD6EB] text-sm text-[#171321] focus:outline-none focus:ring-2 focus:ring-violet-600"
            />
            <datalist id="raipur-hostel-list">
              {HOSTEL_OPTIONS.map((hostel) => (
                <option key={hostel} value={hostel} />
              ))}
            </datalist>
            <p className="mt-1.5 text-xs text-[#6E6582]">
              Include block or room number so pickup/delivery partners can reach your gate smoothly.
            </p>
          </div>

          {/* 6. Special Instructions */}
          <div>
            <label htmlFor="booking-instructions" className="block text-sm font-semibold text-[#171321] mb-1.5">
              Special Instructions <span className="font-normal text-[#6E6582]">(Optional)</span>
            </label>
            <textarea
              id="booking-instructions"
              rows={3}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Call on arrival at hostel gate, separate white shirts, urgent 2 spiral copies..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9FC] border border-[#DDD6EB] text-sm text-[#171321] placeholder:text-[#867D9C] focus:outline-none focus:ring-2 focus:ring-violet-600 resize-y"
            />
          </div>

          {errorMessage && (
            <p className="text-sm font-medium text-rose-700" role="alert">
              {errorMessage}
            </p>
          )}
        </div>

        {/* Right Summary Sidebar */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="bg-white rounded-2xl border border-[#EAE6F2] p-6 space-y-5">
            <div>
              <p className="text-xs font-medium text-[#5B536E]">Booking Summary</p>
              <h2 className="mt-1 font-display font-bold text-xl text-[#171321]">
                {selectedService.name}
              </h2>
              <p className="text-sm text-[#5B536E] mt-0.5">{selectedOffering?.name}</p>
            </div>

            <div className="pt-4 border-t border-[#F1EEF7] space-y-3 text-sm">
              <div className="flex items-start gap-2.5 text-[#4A425C]">
                <Clock className="w-4 h-4 text-violet-700 shrink-0 mt-0.5" />
                <span>
                  {formatDisplayDate(date)} at <strong className="text-[#171321]">{time}</strong>
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-[#4A425C]">
                <MapPin className="w-4 h-4 text-violet-700 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{hostelLocation || 'Raipur Road Hostel'}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F1EEF7] space-y-2 text-sm">
              <div className="flex items-center justify-between text-[#5B536E]">
                <span>Service Estimate</span>
                <span className="tabular-nums font-medium text-[#171321]">
                  ₹{selectedOffering?.price ?? selectedService.startingPrice}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#5B536E]">
                <span>Student Booking Fee</span>
                <span className="text-emerald-700 font-medium">Free</span>
              </div>
              <div className="pt-3 border-t border-[#F1EEF7] flex items-baseline justify-between">
                <span className="font-semibold text-[#171321]">Estimated Total</span>
                <span className="font-display font-bold text-2xl text-violet-700 tabular-nums">
                  ₹{selectedOffering?.price ?? selectedService.startingPrice}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-violet-700 hover:bg-violet-800 active:scale-[0.98] text-white text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
            >
              Confirm Booking
            </button>

            <p className="text-xs text-[#6E6582] text-center leading-relaxed">
              No online payment gateway required in this MVP. Pay by UPI or cash when your service is delivered.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}
