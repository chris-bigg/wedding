import { useEffect, useState } from 'react';

const roomImages = [
  '/images/KH/rooms/0JEP0077-scaled.jpg',
  '/images/KH/rooms/0JEP0100-scaled.jpg',
  '/images/KH/rooms/0JEP0668-scaled.jpg',
  '/images/KH/rooms/JAA_0365-scaled.jpg',
  '/images/KH/rooms/JAA_0426-scaled.jpg',
  '/images/KH/rooms/JAA_0456-scaled.jpg',
];

export default function AccommodationHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'fade-in' | 'fade-out'>('fade-in');

  // Use encodeURIComponent to handle the special characters safely
  // Replace %20 with + for query parameters as some systems prefer + for spaces
  const promoCode = encodeURIComponent("Feleena & Christopher").replace(/%20/g, '+');
  const bookingUrl = `https://kingshead-hotel-brakspear.rezcontrol.com/rooms?startDate=2026-07-31&endDate=2026-08-02&promoCode=${promoCode}&selectedBooking=1&booking=%5B%7B%22bookingId%22%3A1%2C%22guests%22%3A%7B%22adults%22%3A2%2C%22children%22%3A0%2C%22infants%22%3A0%2C%22pets%22%3A0%7D%7D%5D`;

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
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-8 drop-shadow-lg" style={{ fontFamily: "'Mon de Tresor', serif" }}>
              Your home for the weekend.
            </h3>
            <p className="text-base md:text-xl text-white/95 mb-6 md:mb-10 max-w-2xl mx-auto drop-shadow-md">
              We've made the Kings Head our home for the wedding. It's a wonderful old building with 66 rooms, and because it's so historic, no two are exactly the same. We hope you find a cozy corner you love and enjoy being right in the heart of town with us. Book your room through the link below and a promo code will be automatically applied for 20% off your stay.
            </p>
            <a
              href={bookingUrl}
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
          </div>
        </div>
      </div>
    </div>
  );
}
