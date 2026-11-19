import { Home, Compass, CalendarCheck, User } from 'lucide-react';
import { PageView } from '../types';

interface NavbarProps {
  activePage: PageView;
  onNavigate: (page: PageView) => void;
  activeBookingsCount: number;
}

export function Navbar({ activePage, onNavigate, activeBookingsCount }: NavbarProps) {
  const navItems: { id: PageView; label: string; icon: typeof Home }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const isNavActive = (id: PageView) => {
    if (id === 'explore' && (activePage === 'explore' || activePage === 'details')) return true;
    if (id === 'bookings' && (activePage === 'bookings' || activePage === 'booking' || activePage === 'confirmation')) {
      return activePage === 'bookings';
    }
    return activePage === id;
  };

  return (
    <>
      {/* Desktop & Mobile Top Navigation Bar — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAE6F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded-lg py-1"
          >
            <span className="w-8 h-8 rounded-xl bg-violet-700 text-white flex items-center justify-center font-display font-bold text-base tracking-tight">
              R
            </span>
            <span className="font-display font-bold text-xl tracking-tight text-[#171321] whitespace-nowrap">
              Rajpriya
            </span>
          </button>

          {/* Zone 2: 4 Clean Single-Line Nav Links (Desktop) */}
          <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
            {navItems.map((item) => {
              const active = isNavActive(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`relative py-1.5 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded ${
                    active
                      ? 'text-violet-700'
                      : 'text-[#5B536E] hover:text-[#171321]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.id === 'bookings' && activeBookingsCount > 0 && (
                    <span className="ml-1.5 text-xs font-semibold tabular-nums text-violet-700">
                      ({activeBookingsCount})
                    </span>
                  )}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 right-0 -bottom-[17px] h-0.5 bg-violet-700 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('explore')}
              className="px-4 py-2 min-h-[40px] rounded-xl bg-violet-700 hover:bg-violet-800 active:scale-[0.98] text-white text-sm font-semibold transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
            >
              Explore Services
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fixed Bottom Tab Bar */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EAE6F2]"
      >
        <div className="grid grid-cols-4 h-15">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isNavActive(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center min-h-[44px] gap-0.5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-600 ${
                  active ? 'text-violet-700' : 'text-[#5B536E]'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" strokeWidth={active ? 2.25 : 1.75} />
                  {item.id === 'bookings' && activeBookingsCount > 0 && (
                    <span className="absolute -top-1 -right-2.5 text-[10px] font-bold tabular-nums text-violet-700">
                      {activeBookingsCount}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-medium whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
