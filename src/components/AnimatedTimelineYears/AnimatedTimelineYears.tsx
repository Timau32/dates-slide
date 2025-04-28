import { FC, useEffect, useState } from 'react';
import { TimePeriod } from '../../interfaces';
interface Props {
    periods: TimePeriod[]
    activePeriodIndex: number
}
const AnimatedTimelineYears: FC<Props> = ({ periods, activePeriodIndex }) => {
    const [displayYears, setDisplayYears] = useState(periods[activePeriodIndex].periods);
    const [prevActivePeriodIndex, setPrevActivePeriodIndex] = useState(activePeriodIndex);

    useEffect(() => {
        if (activePeriodIndex !== prevActivePeriodIndex) {
            const currentYears = periods[prevActivePeriodIndex].periods;
            const targetYears = periods[activePeriodIndex].periods;

            const animateYearChange = async () => {

                for (let i = 0; i < currentYears.length; i++) {
                    const start = currentYears[i];
                    const end = targetYears[i];

                    if (start !== end) {
                        const increment = start < end ? 1 : -1;
                        let currentValue = start;

                        while (currentValue !== end) {
                            currentValue += increment;

                            setDisplayYears(prev => {
                                const newYears = [...prev];
                                newYears[i] = currentValue;
                                return newYears;
                            });

                            await new Promise(resolve => setTimeout(resolve, 100));
                        }
                    }
                }

                setPrevActivePeriodIndex(activePeriodIndex);
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