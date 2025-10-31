import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
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
      const slides = document.querySelectorAll('.accommodation-swiper .swiper-slide');
      if (slides.length === 0) return;
      
      // Reset heights first
      slides.forEach((slide) => {
        (slide as HTMLElement).style.height = 'auto';
      });
      
      // Find the tallest
      let maxHeight = 0;
      slides.forEach((slide) => {
        const height = (slide as HTMLElement).offsetHeight;
        if (height > maxHeight) maxHeight = height;
      });
      
      // Set all to tallest
      slides.forEach((slide) => {
        (slide as HTMLElement).style.height = `${maxHeight}px`;
      });
    };

    // Run after a slight delay to ensure content is rendered
    const timer = setTimeout(equalizeHeights, 100);
    window.addEventListener('resize', equalizeHeights);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', equalizeHeights);
    };
  }, [accommodation]);

  const AccommodationCard = ({ hotel }: { hotel: AccommodationItem }) => (
    <div className="bg-white/70 dark:bg-stone-800/70 backdrop-blur-sm rounded-2xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_25px_-5px_rgba(0,0,0,0.15)] border border-stone-200/50 dark:border-stone-700/50 overflow-hidden transition-all duration-300 h-full flex flex-col">
      {hotel.image && (
        <img 
          src={hotel.image} 
          alt={hotel.name}
          className="w-full h-48 object-cover flex-shrink-0"
        />
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-medium text-emerald-800 dark:text-emerald-400 mb-3">{hotel.name}</h3>
        {hotel.description && (
          <p className="text-stone-600 dark:text-stone-400 mb-4 text-sm leading-relaxed flex-grow">{hotel.description}</p>
        )}
        {hotel.blockCode && (
          <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
            Block Code: <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-400">{hotel.blockCode}</span>
          </p>
        )}
        <a 
          href={hotel.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg self-start mt-auto"
        >
          Book Now
        </a>
      </div>
    </div>
  );

  return (
    <div className="pb-16">
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
          <SwiperSlide key={index}>
            <AccommodationCard hotel={hotel} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
