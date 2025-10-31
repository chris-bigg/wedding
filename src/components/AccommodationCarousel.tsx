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
      // Target the card elements inside slides, not the slides themselves
      const cards = document.querySelectorAll('.accommodation-swiper .swiper-slide > div');
      if (cards.length === 0) return;
      
      // Reset heights first
      cards.forEach((card) => {
        (card as HTMLElement).style.height = 'auto';
      });
      
      // Wait for layout to settle
      setTimeout(() => {
        // Find the tallest card
        let maxHeight = 0;
        cards.forEach((card) => {
          const height = (card as HTMLElement).offsetHeight;
          if (height > maxHeight) maxHeight = height;
        });
        
        // Set all cards to the tallest height
        if (maxHeight > 0) {
          cards.forEach((card) => {
            (card as HTMLElement).style.height = `${maxHeight}px`;
          });
        }
      }, 50);
    };

    // Initial equalization after mount
    const timer1 = setTimeout(equalizeHeights, 200);
    
    // Equalize on resize
    window.addEventListener('resize', equalizeHeights);
    
    // Equalize when swiper updates (after slide changes)
    if (swiperInstance) {
      swiperInstance.on('slideChange', equalizeHeights);
      swiperInstance.on('resize', equalizeHeights);
    }

    return () => {
      clearTimeout(timer1);
      window.removeEventListener('resize', equalizeHeights);
      if (swiperInstance) {
        swiperInstance.off('slideChange', equalizeHeights);
        swiperInstance.off('resize', equalizeHeights);
      }
    };
  }, [accommodation, swiperInstance]);

  const AccommodationCard = ({ hotel }: { hotel: AccommodationItem }) => (
    <div className="bg-white/70 dark:bg-stone-800/70 backdrop-blur-sm rounded-2xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_25px_-5px_rgba(0,0,0,0.15)] border border-stone-200/50 dark:border-stone-700/50 overflow-hidden transition-all duration-300 h-full flex flex-col">
      {hotel.image && (
        <img 
          src={hotel.image} 
          alt={hotel.name}
          className="w-full h-48 object-cover flex-shrink-0"
        />
      )}
      <div className="p-6 flex flex-col flex-grow min-h-0">
        <h3 className="text-xl font-medium text-emerald-800 dark:text-emerald-400 mb-3 flex-shrink-0">{hotel.name}</h3>
        {hotel.description && (
          <p className="text-stone-600 dark:text-stone-400 mb-4 text-sm leading-relaxed flex-grow overflow-auto">{hotel.description}</p>
        )}
        {hotel.blockCode && (
          <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 flex-shrink-0">
            Block Code: <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-400">{hotel.blockCode}</span>
          </p>
        )}
        <a 
          href={hotel.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg self-start mt-auto flex-shrink-0"
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
