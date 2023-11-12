import React from 'react';
import { FormattedMessage } from 'react-intl';
import GoForwardIcon from 'assets/icons/Go-forward.svg'; // You would use an SVG loader or a React wrapper for SVGs
import './TrendingNow.css'; 
import { useTheme } from '../../store/themeContext';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '50%',
  plugins: {
    legend: {
      display: true,
      position: 'top' as const, 
    },
    tooltip: {
      enabled: true,
      mode: 'index' as any,
      intersect: false,
    },
  },
};
type TrendingNowProps = {
    name?: string;
    title: string ;
    positive: number;
    neutral: number;
    negative: number;
    onPress?: () => void;
    trendingWidget: boolean;
}
interface LegendItemProps {
    color: string;
    text: string;
    value: number;
  }
function TrendingNow({ name, title, positive, neutral, negative, onPress, trendingWidget }: TrendingNowProps) {
  
  const { TERTIARY, POSITIVE, NEGATIVE, LIGHT_HINT, NEUTRAL} = useTheme()

  const getPieChartData = () => ({
    datasets: [{
      data: [positive, neutral, negative],
      backgroundColor: [POSITIVE, NEUTRAL, NEGATIVE],
      hoverBackgroundColor: [POSITIVE, NEUTRAL, NEGATIVE],
      borderWidth: 0, 
    }]
  });

  const LegendItem = ({ color, text, value }: LegendItemProps) => (
    <div className="legendContainer">
      <span className="dot" style={{ backgroundColor: color }}></span>
      <div>
        <span className="percentage">{value}%</span>
        <span className="label">
          <FormattedMessage defaultMessage={text} id={`trendingNow.${text.toLowerCase()}`} />
        </span>
      </div>
    </div>
  );

  return (
    <div className="container" style={{ borderColor: LIGHT_HINT }}>
      <div className="topContainer">
        <span className="titleText" style={{ color: TERTIARY }}>
          {title}
        </span>
        {trendingWidget && (
          <button className="detailsButton" onClick={onPress} style={{ backgroundColor: LIGHT_HINT }}>
            <span className="buttonText">
              <FormattedMessage defaultMessage='Details' id='trendingNow.details' />
            </span>
            <GoForwardIcon />
          </button>
        )}
      </div>
      <div className="bottomContainer">
        <div className="chart">
    <Doughnut data={getPieChartData()} options={options } />
  </div>
        <div className="details">
          {trendingWidget && (
            <span className="name">{name}</span>
          )}
          <LegendItem color={POSITIVE} text="Positive" value={positive} />
          <LegendItem color={NEUTRAL} text="Neutral" value={neutral} />
          <LegendItem color={NEGATIVE} text="Negative" value={negative} />
        </div>
      </div>
    </div>
  );
};

export default TrendingNow;
