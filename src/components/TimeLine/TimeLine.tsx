// TimeLine.tsx
import React, { useState, useEffect, useRef, RefObject, createRef } from 'react';
import { Swiper as SwiperClass } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { gsap } from 'gsap';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './TimeLine.scss';
import { TimePeriod } from '../interfaces';
import CircleDot from '../CircleDot/CircleDot';
import AnimatedTimelineYears from '../AnimatedTimelineYears/AnimatedTimelineYears';



const data = [
    {
        id: 1,
        periods: [2010, 2012],
        color: '#6470E9',
        category: 'Космические исследования',
        categoryNumber: 1,
        events: [
            {
                id: 101,
                year: 2010,
                description: 'Запуск космического аппарата Solar Dynamics Observatory для наблюдения за Солнцем'
            },
            {
                id: 102,
                year: 2011,
                description: 'Завершение миссии космического челнока "Атлантис", последний полёт программы Space Shuttle'
            },
            {
                id: 103,
                year: 2012,
                description: 'Марсоход Curiosity успешно приземлился на поверхность Марса и начал исследования'
            }
        ]
    },
    {
        id: 2,
        periods: [2013, 2015],
        color: '#E9647C',
        category: 'Физика и материаловедение',
        categoryNumber: 2,
        events: [
            {
                id: 201,
                year: 2013,
                description: 'Создание первого квантового микроскопа, способного наблюдать отдельные атомы'
            },
            {
                id: 202,
                year: 2014,
                description: 'Синтез первого стабильного образца металлического водорода в лабораторных условиях'
            },
            {
                id: 203,
                year: 2015,
                description: 'Открытие графина - двумерного материала с уникальными электронными свойствами'
            }
        ]
    },
    {
        id: 3,
        periods: [2016, 2018],
        color: '#64E9A4',
        category: 'Биотехнологии',
        categoryNumber: 3,
        events: [
            {
                id: 301,
                year: 2016,
                description: 'Первое успешное редактирование генома эмбриона человека с помощью CRISPR-Cas9'
            },
            {
                id: 302,
                year: 2017,
                description: 'Создание синтетического организма с полностью искусственным геномом'
            },
            {
                id: 303,
                year: 2018,
                description: 'Разработка биопечатного органа с функциональной сосудистой системой'
            }
        ]
    },
    {
        id: 4,
        periods: [2019, 2021],
        color: '#E9D264',
        category: 'Квантовые технологии',
        categoryNumber: 4,
        events: [
            {
                id: 401,
                year: 2019,
                description: 'Google достигает квантового превосходства на 53-кубитном процессоре Sycamore'
            },
            {
                id: 402,
                year: 2020,
                description: 'Первая квантово-защищенная передача данных через коммерческую оптоволоконную сеть'
            },
            {
                id: 403,
                year: 2021,
                description: 'Создание топологического квантового компьютера, устойчивого к декогеренции'
            }
        ]
    },
    {
        id: 5,
        periods: [2022, 2024],
        color: '#64B5E9',
        category: 'Нейротехнологии',
        categoryNumber: 5,
        events: [
            {
                id: 501,
                year: 2022,
                description: 'Первый нейроинтерфейс, позволяющий парализованным пациентам управлять экзоскелетом силой мысли'
            },
            {
                id: 502,
                year: 2023,
                description: 'Создание искусственной нейронной сети, способной к автономному обучению без человеческого вмешательства'
            },
            {
                id: 503,
                year: 2024,
                description: 'Разработка имплантируемого устройства для лечения болезни Альцгеймера путем стимуляции нейрогенеза'
            }
        ]
    },
    {
        id: 6,
        periods: [2025, 2027],
        color: '#E97A64',
        category: 'Климатические технологии',
        categoryNumber: 6,
        events: [
            {
                id: 601,
                year: 2025,
                description: 'Запуск глобальной сети атмосферных скрубберов для удаления углекислого газа из атмосферы'
            },
            {
                id: 602,
                year: 2026,
                description: 'Создание искусственных коралловых рифов с повышенной устойчивостью к окислению океана'
            },
            {
                id: 603,
                year: 2027,
                description: 'Первая термоядерная электростанция, производящая больше энергии, чем потребляет'
            }
        ]
    }
]

const circeWidth = 530

const TimeLine: React.FC = () => {
    const [periods] = useState<TimePeriod[]>(data
    );

    const [activePeriodIndex, setActivePeriodIndex] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(1);
    const circleRef = useRef<HTMLDivElement>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef<SwiperClass | null>(null);


    // Initialize gsap animations
    useEffect(() => {
        if (circleRef.current) {
            gsap.to(circleRef.current, {
                rotation: '+=0',
                transformOrigin: 'center center',
                duration: 0
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
                ease: 'power2.out'
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
    const test = periods.length - 1
    const periodPrev = () => {
        if (activePeriodIndex === 0) { // если первый индекс
            setActivePeriodIndex(test); // переходим на последний
        } else {
            setActivePeriodIndex(activePeriodIndex - 1); // иначе -1
        }
    };
    const periodNext = () => {
        if (activePeriodIndex === test) { // если последний индекс
            setActivePeriodIndex(0); // начинаем с нуля
        } else {
            setActivePeriodIndex(activePeriodIndex + 1); // иначе +1
        }
    };


    // Fixed: Properly type the swiper parameter
    const handleSlideChange = (swiper: SwiperClass) => {
        setCurrentSlide(swiper.activeIndex + 1);
        setTotalSlides(swiper.slides.length);
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    return (
        <div className="timeline">
            <div></div>
            <div className="timeline__header">
                <div className="timeline__title">Исторические даты</div>

                <div className="timeline__circle-container">
                    <AnimatedTimelineYears
                        periods={periods}
                        activePeriodIndex={activePeriodIndex}
                    />

                    <div className="timeline__circle" ref={circleRef}>
                        {periods.map((period, index) => {
                            const angle = (360 / periods.length) * index;
                            return <CircleDot
                                key={`dot-${period.id}`}
                                angle={angle}
                                circeWidth={circeWidth}
                                period={period}
                                activePeriodIndex={activePeriodIndex}
                                index={index}
                                handlePeriodChange={handlePeriodChange}
                            />;
                        })}
                    </div>
                </div>

            </div>
            <div className="period__nav">
                <div className="timeline__pagination-text">
                    {currentSlide.toString().padStart(2, '0')}/{totalSlides.toString().padStart(2, '0')}
                </div>
                <br />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div className="timeline__nav-btn2 " onClick={() => periodPrev()}>
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 1L2 6L7 11" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="timeline__nav-btn2 " onClick={() => periodNext()}>
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                </div>
            </div>
            <div>
                <p className='period__nav_mobile'> {
                    periods[activePeriodIndex].category
                }
                </p>
                <div className="timeline__slider-container">


                    <div className="timeline__slider">

                        <div className={`timeline__nav-btn prev ${isBeginning ? 'disabled' : ''}`}>
                            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L2 6L7 11" stroke="currentColor" strokeWidth="2" />
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
                                320: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 3,
                                },
                            }}
                        >
                            {periods[activePeriodIndex].events.map(event => (
                                <SwiperSlide key={`event-${event.id}`}>
                                    <div className="timeline__event">
                                        <div className="timeline__event-year">{event.year}</div>
                                        <div className="timeline__event-description">{event.description}</div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className={`timeline__nav-btn next ${isEnd ? 'disabled' : ''}`}>
                            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="period__nav_mobile">
                    <div className="timeline__pagination-text">
                        {currentSlide.toString().padStart(2, '0')}/{totalSlides.toString().padStart(2, '0')}
                    </div>
                    <br />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <div className="timeline__nav-btn2 " onClick={() => periodPrev()}>
                            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L2 6L7 11" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                        <div className="timeline__nav-btn2 " onClick={() => periodNext()}>
                            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeLine;