import { gsap } from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import AnimatedTimelineYears from '../AnimatedTimelineYears/AnimatedTimelineYears';
import CircleDot from '../CircleDot/CircleDot';
import { TimePeriod } from '../../interfaces';
import { data } from '../../mock/data';
import variables from '../../scss/constants.module.scss';


const circeWidth = Number(variables.circleWidth);

const TimeLine: React.FC = () => {
  const [periods] = useState<TimePeriod[]>(data);

  const [activePeriodIndex, setActivePeriodIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(1);
  const circleRef = useRef<HTMLDivElement>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    if (circleRef.current) {
      gsap.to(circleRef.current, {
        rotation: '+=0',
        transformOrigin: 'center center',
        duration: 0,
      });
    }
  }, []);

  // Handle period change animation
  useEffect(() => {
    if (periods.length > 1 && circleRef.current) {
      const rotation = -(360 / periods.length) * activePeriodIndex;

      gsap.to(circleRef.current, {
        rotation: rotation,
        transformOrigin: 'center center',
        duration: 0.5,
        ease: 'power2.out',
      });
    }
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
      setCurrentSlide(1);
      setIsBeginning(true);
      setIsEnd(false);
    }
  }, [activePeriodIndex, periods.length]);

  const handlePeriodChange = (index: number) => {
    setActivePeriodIndex(index);
  };
  const test = periods.length - 1;
  const periodPrev = () => {
    if (activePeriodIndex === 0) {
      // если первый индекс
      setActivePeriodIndex(test); // переходим на последний
    } else {
      setActivePeriodIndex(activePeriodIndex - 1); // иначе -1
    }
  };
  const periodNext = () => {
    if (activePeriodIndex === test) {
      // если последний индекс
      setActivePeriodIndex(0); // начинаем с нуля
    } else {
      setActivePeriodIndex(activePeriodIndex + 1); // иначе +1
    }
  };

  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentSlide(swiper.activeIndex + 1);
    setTotalSlides(swiper.slides.length);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className='timeline'>
      <div className='timeline__header'>
        <div className='timeline__title'>Исторические даты</div>

        <div className='timeline__circle-container'>
          <AnimatedTimelineYears periods={periods} activePeriodIndex={activePeriodIndex} />

          <div className='timeline__circle' ref={circleRef}>
            {periods.map((period, index) => {
              const angle = (360 / periods.length) * index;
              return (
                <CircleDot
                  key={`dot-${period.id}`}
                  angle={angle}
                  circeWidth={circeWidth}
                  period={period}
                  activePeriodIndex={activePeriodIndex}
                  index={index}
                  handlePeriodChange={handlePeriodChange}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className='period__nav'>
        <div className='timeline__pagination-text'>
          {currentSlide.toString().padStart(2, '0')}/{totalSlides.toString().padStart(2, '0')}
        </div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', marginTop: '10px' }}>
          <div className='timeline__nav-btn2 ' onClick={() => periodPrev()}>
            <svg width='8' height='12' viewBox='0 0 8 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M7 1L2 6L7 11' stroke='currentColor' strokeWidth='2' />
            </svg>
          </div>
          <div className='timeline__nav-btn2 ' onClick={() => periodNext()}>
            <svg width='8' height='12' viewBox='0 0 8 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M1 1L6 6L1 11' stroke='currentColor' strokeWidth='2' />
            </svg>
          </div>
        </div>
      </div>
      <div>
        <p className='period__nav_mobile'> {periods[activePeriodIndex].category}</p>
        <div className='timeline__slider-container'>
          <div className='timeline__slider'>
            <div className={`timeline__nav-btn prev ${isBeginning ? 'disabled' : ''}`}>
              <svg width='8' height='12' viewBox='0 0 8 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M7 1L2 6L7 11' stroke='currentColor' strokeWidth='2' />
              </svg>
            </div>

            <Swiper
              key={`swiper-${activePeriodIndex}`}
              modules={[Navigation, Pagination]}
              // spaceBetween={20}
              slidesPerView={3}
              navigation={{
                prevEl: '.timeline__nav-btn.prev',
                nextEl: '.timeline__nav-btn.next',
              }}
              onSlideChange={handleSlideChange}
              onSwiper={(swiper: SwiperClass) => {
                swiperRef.current = swiper;
                setTotalSlides(swiper.slides.length);
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              breakpoints={{
                250: {
                  slidesPerView: 1,
                  pagination: true
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {periods[activePeriodIndex].events.map((event) => (
                <SwiperSlide key={`event-${event.id}`}>
                  <div className='timeline__event'>
                    <div className='timeline__event-year'>{event.year}</div>
                    <div className='timeline__event-description'>{event.description}</div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className={`timeline__nav-btn next ${isEnd ? 'disabled' : ''}`}>
              <svg width='8' height='12' viewBox='0 0 8 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M1 1L6 6L1 11' stroke='currentColor' strokeWidth='2' />
              </svg>
            </div>
          </div>
        </div>
        <div className='period__nav_mobile'>
          <div className='timeline__pagination-text'>
            {currentSlide.toString().padStart(2, '0')}/{totalSlides.toString().padStart(2, '0')}
          </div>
          <br />
          <div style={{ display: 'flex', gap: '10px' }}>
            <div className='timeline__nav-btn2 ' onClick={() => periodPrev()}>
              <svg width='8' height='12' viewBox='0 0 8 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M7 1L2 6L7 11' stroke='currentColor' strokeWidth='2' />
              </svg>
            </div>
            <div className='timeline__nav-btn2 ' onClick={() => periodNext()}>
              <svg width='8' height='12' viewBox='0 0 8 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M1 1L6 6L1 11' stroke='currentColor' strokeWidth='2' />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
