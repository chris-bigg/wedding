import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface AccommodationItem {
  name: string;
  description: string;
  link: string;
  blockCode: string | null;
  image: string;
  distance?: number; // miles from venue
}

interface AccommodationCarouselProps {
  accommodation: AccommodationItem[];
}

export default function AccommodationCarousel({ accommodation }: AccommodationCarouselProps) {
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);

    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  useEffect(() => {
    const equalizeHeights = () => {
      if (!swiperInstance) return;
      
      // Get all slides (both visible and those that need equalizing)
      const allSlides = Array.from(swiperInstance.slides);
      if (allSlides.length === 0) return;
      
      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(() => {
        // First pass: measure natural heights without resetting to avoid visual jump
        let maxHeight = 0;
        const cards: HTMLElement[] = [];
        
        allSlides.forEach((slide) => {
          const card = slide.querySelector('div') as HTMLElement;
          if (card) {
            // Measure natural height by temporarily setting to auto
            const currentHeight = card.style.height;
            card.style.height = 'auto';
            // Force a reflow
            void card.offsetHeight;
            const naturalHeight = card.offsetHeight;
            // Restore original height immediately to prevent visual jump
            card.style.height = currentHeight || '';
            
            if (naturalHeight > maxHeight) maxHeight = naturalHeight;
            cards.push(card);
          }
        });
        
        // Second pass: apply height in next frame for smooth update
        requestAnimationFrame(() => {
          cards.forEach((card) => {
            if (maxHeight > 0) {
              card.style.height = `${maxHeight}px`;
            }
          });
        });
      });
    };

    // Initial equalization after mount
    const timer1 = setTimeout(equalizeHeights, 200);
    
    // Equalize on resize
    window.addEventListener('resize', equalizeHeights);
    
    // Equalize when swiper finishes transitioning (prevents jump during animation)
    if (swiperInstance) {
      swiperInstance.on('slideChangeTransitionEnd', equalizeHeights);
      swiperInstance.on('resize', equalizeHeights);
    }

    return () => {
      clearTimeout(timer1);
      window.removeEventListener('resize', equalizeHeights);
      if (swiperInstance) {
        swiperInstance.off('slideChangeTransitionEnd', equalizeHeights);
        swiperInstance.off('resize', equalizeHeights);
      }
    };
  }, [accommodation, swiperInstance]);

  const AccommodationCard = ({ hotel }: { hotel: AccommodationItem }) => (
    <div className="bg-white/70 dark:bg-stone-800/70 backdrop-blur-sm rounded-2xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_25px_-5px_rgba(0,0,0,0.15)] border border-stone-200/50 dark:border-stone-700/50 overflow-hidden transition-[shadow,transform] duration-300 h-full flex flex-col relative" style={{ transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}>
      {hotel.image && (
        <div className="relative">
          <img 
            src={hotel.image} 
            alt={hotel.name}
            className="w-full h-48 object-cover flex-shrink-0"
          />
          {hotel.distance !== undefined && (
            <div className="absolute top-3 right-3 bg-green-800/95 dark:bg-white/20 backdrop-blur-sm text-white dark:text-stone-900 px-3 py-1.5 rounded-full text-sm font-medium shadow-lg flex items-center gap-1.5">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{hotel.distance.toFixed(1)} mi</span>
            </div>
          )}
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow min-h-0">
        <h3 className="text-xl font-medium text-green-950 dark:text-white mb-3 flex-shrink-0">{hotel.name}</h3>
        {hotel.description && (
          <p className="text-stone-600 dark:text-stone-400 mb-4 text-sm leading-relaxed flex-grow overflow-auto">{hotel.description}</p>
        )}
        {hotel.blockCode && (
          <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 flex-shrink-0">
            Block Code: <span className="font-mono font-semibold text-green-900 dark:text-white">{hotel.blockCode}</span>
          </p>
        )}
        <a 
          href={hotel.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-green-800 to-green-900 hover:from-green-900 hover:to-green-950 dark:from-stone-200/30 dark:to-stone-300/40 dark:hover:from-stone-300/40 dark:hover:to-stone-200/30 text-white font-medium px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg self-start mt-auto flex-shrink-0"
        >
          Book Now
        </a>
      </div>
    </div>
  );

  return (
    <div className="pb-20 md:pb-16">
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={slidesPerView}
        pagination={{ 
          clickable: true,
          dynamicBullets: false
        }}
        navigation
        simulateTouch={true}
        touchStartPreventDefault={false}
        touchRatio={1}
        touchAngle={45}
        grabCursor={true}
        className="accommodation-swiper"
        onSwiper={setSwiperInstance}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 15
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20
          }
        }}
      >
        {accommodation.map((hotel, index) => (
          <SwiperSlide key={index} className="!h-auto">
            <AccommodationCard hotel={hotel} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
