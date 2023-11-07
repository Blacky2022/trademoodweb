import React from 'react';
import './ActivityCompare.css'; // Assume the CSS is in a separate file
import Arrow from 'assets/icons/Go-forward.svg';
import { useTheme } from '../../store/themeContext';

type ActivityCompareProps = {
    name: string;
    activity: number;
}
function ActivityCompare({ name, activity }: ActivityCompareProps) {

    
    const { TERTIARY, POSITIVE, NEGATIVE, HINT,LIGHT_HINT} = useTheme()
    const getArrowRotation = () => {
        if (activity > 0) return '-90deg'; // Arrow pointing up
        if (activity < 0) return '90deg';  // Arrow pointing down
        return '0deg'; // Arrow neutral
    };

    const getActivityColor = () => {
        if (activity > 0) return POSITIVE;
        if (activity < 0) return NEGATIVE;
        return HINT;
    };

    return (
        <div className="container" style={{ borderColor: LIGHT_HINT }}>
            <div className="text" style={{ color: TERTIARY }}>{name}</div>
            <div className="activityContainer">
                <div
                    className="arrowContainer"
                    style={{
                        transform: `rotate(${getArrowRotation()})`,
                    }}>
                    <img src={Arrow} alt="Arrow" style={{ color: getActivityColor() }} />
                </div>
                <div
                    className="activityText"
                    style={{
                        color: getActivityColor(),
                    }}>
                    {activity}%
                </div>
            </div>
        </div>
    );
}

export default ActivityCompare;