import { useEffect, useState } from 'react';

const roomImages = [
  '/images/KH/rooms/0JEP0077-scaled.jpg',
  '/images/KH/rooms/0JEP0100-scaled.jpg',
  '/images/KH/rooms/0JEP0668-scaled.jpg',
  '/images/KH/rooms/JAA_0365-scaled.jpg',
  '/images/KH/rooms/JAA_0426-scaled.jpg',
  '/images/KH/rooms/JAA_0456-scaled.jpg',
];

import { KINGS_HEAD_BOOKING_URL } from '../config/booking';

const VOUCHER_CODE = 'Feleena and Christopher';

export default function AccommodationHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'fade-in' | 'fade-out'>('fade-in');
  const [linkReady, setLinkReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLinkReady(true);
  }, []);

  const handleCopyVoucher = async () => {
    try {
      await navigator.clipboard.writeText(VOUCHER_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      try {
        const ta = document.createElement('textarea');
        ta.value = VOUCHER_CODE;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // ignore
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('fade-out');
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % roomImages.length);
        setFadeState('fade-in');
      }, 1500); // Half of transition duration (3000ms / 2)
    }, 8000); // Change image every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-12">
      <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200/50 dark:border-stone-700/50 bg-white/70 dark:bg-stone-800/70 backdrop-blur-sm">
        {/* Image Slideshow */}
        <div className="absolute inset-0 min-h-[500px] md:min-h-[500px]">
          {roomImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${
                index === currentIndex
                  ? fadeState === 'fade-in'
                    ? 'opacity-100'
                    : 'opacity-0'
                  : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Kings Head Hotel Room ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
          
          {/* Overlay gradient for text readability - stronger gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        </div>

        {/* Content Overlay - This will determine the container height */}
        <div className="relative flex items-center justify-center min-h-[500px] md:min-h-[500px] pointer-events-none">
          <div className="text-center px-6 md:px-12 py-6 md:py-8 pointer-events-auto w-full">
            {/* Logo above heading */}
            <div className="flex justify-center mb-4 md:mb-8">
              <img
                src="/images/KH/KingsHead_Insignia_no-bg_white_padding.png"
                alt="Kings Head Hotel"
                className="h-20 md:h-32 w-auto drop-shadow-lg"
                loading="lazy"
              />
            </div>
            <h3 className="text-3xl md:text-5xl text-white mb-4 md:mb-8 drop-shadow-lg" style={{ fontFamily: "'Mon de Tresor', serif" }}>
              Your home for the weekend.
            </h3>
            <p className="text-base md:text-xl text-white/95 mb-6 md:mb-10 max-w-2xl mx-auto drop-shadow-md">
              We've made the Kings Head our home for the wedding. It's a wonderful old building with 66 rooms, and because it's so historic, no two are exactly the same. We hope you find a cozy corner you love and enjoy being right in the heart of town with us.
            </p>
            {linkReady ? (
              <a
                href={KINGS_HEAD_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-800 to-green-900 hover:from-green-900 hover:to-green-950 dark:from-stone-200/30 dark:to-stone-300/40 dark:hover:from-stone-300/40 dark:hover:to-stone-200/30 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <span>View Rooms & Book</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            ) : (
              <span
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-800 to-green-900 dark:from-stone-200/30 dark:to-stone-300/40 text-white font-medium px-8 py-4 rounded-full shadow-lg opacity-90"
                aria-hidden
              >
                <span>View Rooms & Book</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Rates & Voucher Code Card */}
      <div className="mt-6 bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-stone-200/50 dark:border-stone-700/50 shadow-lg">
        <div className="max-w-4xl mx-auto">
          {/* Voucher Code - Prominent, click to copy */}
          <div className="text-center mb-6 pb-6 border-b border-stone-200 dark:border-stone-700">
            <p className="text-sm md:text-base text-stone-600 dark:text-stone-400 mb-3 font-medium">
              Use voucher code for 20% discount:
            </p>
            <button
              type="button"
              onClick={handleCopyVoucher}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-800 to-green-900 dark:from-green-700 dark:to-green-800 text-white px-6 py-3 rounded-lg shadow-md hover:from-green-900 hover:to-green-950 dark:hover:from-green-800 dark:hover:to-green-900 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 dark:focus:ring-offset-stone-800"
              aria-label={`Copy voucher code: ${VOUCHER_CODE}. ${copied ? 'Copied to clipboard.' : 'Click to copy.'}`}
            >
              <span className="text-2xl md:text-3xl tracking-wide" style={{ fontFamily: "'Mon de Tresor', serif" }}>
                {VOUCHER_CODE}
              </span>
              {copied ? (
                <span className="text-sm font-medium opacity-90">Copied!</span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/80 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              )}
            </button>
          </div>

          {/* Rates & Upgrades - Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Rates Column */}
            <div>
              <h4 className="text-lg md:text-xl text-green-950 dark:text-white mb-4" style={{ fontFamily: "'Mon de Tresor', serif" }}>
                Room Rates
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-stone-100 dark:border-stone-700">
                  <span className="text-stone-700 dark:text-stone-300">31st July</span>
                  <span className="font-semibold text-green-900 dark:text-green-300">£158</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-stone-100 dark:border-stone-700">
                  <span className="text-stone-700 dark:text-stone-300">1st August</span>
                  <span className="font-semibold text-green-900 dark:text-green-300">£168</span>
                </div>
                <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 italic">
                  Classic Room (per night)
                </p>
              </div>
            </div>

            {/* Upgrades Column */}
            <div>
              <h4 className="text-lg md:text-xl text-green-950 dark:text-white mb-4" style={{ fontFamily: "'Mon de Tresor', serif" }}>
                Room Upgrades
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-stone-100 dark:border-stone-700">
                  <span className="text-stone-700 dark:text-stone-300">Superior</span>
                  <span className="font-semibold text-green-900 dark:text-green-300">+£30</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-stone-100 dark:border-stone-700">
                  <span className="text-stone-700 dark:text-stone-300">Feature</span>
                  <span className="font-semibold text-green-900 dark:text-green-300">+£75</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-stone-100 dark:border-stone-700">
                  <span className="text-stone-700 dark:text-stone-300">Family Room</span>
                  <span className="font-semibold text-green-900 dark:text-green-300">+£120</span>
                </div>
                <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 italic">
                  Additional cost per night
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
