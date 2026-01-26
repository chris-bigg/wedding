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
        <div className="relative h-96 md:h-[500px] overflow-hidden">
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
              />
            </div>
          ))}
          
          {/* Overlay gradient for text readability - stronger gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
          <div className="text-center px-6 md:px-12 pt-4 pb-8 pointer-events-auto">
            {/* Logo above heading */}
            <div className="flex justify-center mb-8">
              <img
                src="/images/KH/KingsHead_Insignia_no-bg_white.png"
                alt="Kings Head Hotel"
                className="h-24 md:h-32 w-auto drop-shadow-lg"
              />
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 drop-shadow-lg" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Your home for the weekend.
            </h3>
            <p className="text-lg md:text-xl text-white/95 mb-10 max-w-2xl mx-auto drop-shadow-md">
              We've made the Kings Head our home for the wedding. It's a wonderful old building with 66 rooms, and because it's so historic, no two are exactly the same. We hope you find a cozy corner you love and enjoy being right in the heart of town with us.
            </p>
            <a
              href="https://kingshead-hotel-brakspear.rezcontrol.com/?startDate=2026-07-31&endDate=2026-08-02&promoCode=Feleena+%26+Christopher&selectedBooking=1&booking=%5B%7B%22bookingId%22%3A1%2C%22guests%22%3A%7B%22adults%22%3A2%2C%22children%22%3A0%2C%22infants%22%3A0%2C%22pets%22%3A0%7D%7D%5D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-900 dark:bg-stone-200/30 dark:hover:bg-stone-300/40 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
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
