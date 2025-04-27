import React, { useState, useEffect, FC } from 'react';
import { TimePeriod } from '../interfaces';
interface Props {
    periods: TimePeriod[]
    activePeriodIndex: number
}
const AnimatedTimelineYears: FC<Props> = ({ periods, activePeriodIndex }) => {
    // State for the current displayed years
    const [displayYears, setDisplayYears] = useState(periods[activePeriodIndex].periods);
    // To track the previous activePeriodIndex
    const [prevActivePeriodIndex, setPrevActivePeriodIndex] = useState(activePeriodIndex);
    // Animation in progress flag
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // If period has changed
        if (activePeriodIndex !== prevActivePeriodIndex) {
            const currentYears = periods[prevActivePeriodIndex].periods;
            const targetYears = periods[activePeriodIndex].periods;

            // Animation function
            const animateYearChange = async () => {
                setIsAnimating(true);

                // For each year position (assuming both arrays have the same length)
                for (let i = 0; i < currentYears.length; i++) {
                    const start = currentYears[i];
                    const end = targetYears[i];

                    // If the years are different
                    if (start !== end) {
                        // Determine direction (increase/decrease)
                        const increment = start < end ? 1 : -1;
                        let currentValue = start;

                        // Animation loop for this position
                        while (currentValue !== end) {
                            currentValue += increment;

                            // Update the display years with the new value
                            setDisplayYears(prev => {
                                const newYears = [...prev];
                                newYears[i] = currentValue;
                                return newYears;
                            });

                            // Wait for a short time to create animation effect
                            await new Promise(resolve => setTimeout(resolve, 100));
                        }
                    }
                }

                setPrevActivePeriodIndex(activePeriodIndex);
                setIsAnimating(false);
            };

            animateYearChange();
        }
    }, [activePeriodIndex, periods, prevActivePeriodIndex]);

    return (
        <div className="timeline__years">
            {displayYears.map((year, index) => (
                <div
                    key={`year-${year}-${index}`}
                    className={`timeline__year active`}
                    style={{ color: index === 0 ? '#5d5fef' : '#ef5ca7' }}
                >
                    {year}
                </div>
            ))}
        </div>
    );
};

export default AnimatedTimelineYears;