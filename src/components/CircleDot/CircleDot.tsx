import { FC } from 'react';
import { TimePeriod } from '../../interfaces';

interface Props {
    period: TimePeriod
    activePeriodIndex: number;
    index: number;
    angle: number;
    circeWidth: number;

    handlePeriodChange: (index: number) => void;
}

const CircleDot: FC<Props> = ({ period, index, activePeriodIndex, handlePeriodChange, angle, circeWidth }) => {
    const counterRotation = -angle + ((360 / 6) * activePeriodIndex);

    return (
        <div
            key={`dot-${period.id}`}
            className={`timeline__dot ${activePeriodIndex === index ? 'active' : ''}`}
            style={{
                transform: `rotate(${angle}deg) translateY(-${circeWidth / 2}px)`,
            }}
            onClick={() => handlePeriodChange(index)}
        >
            <div
                style={{
                    transform: `rotate(${counterRotation}deg)`,
                    display: activePeriodIndex === index ? 'flex' : undefined
                }}
                className="timeline__category"
            >
                <div className="timeline__category-number">{period.id}</div>
                <div className="timeline__category-text">{period.category}</div>
            </div>
        </div>
    );
};
export default CircleDot
