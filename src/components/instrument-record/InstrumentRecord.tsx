import React from 'react';
import './InstrumentRecord.css'; 
import { FormattedMessage } from 'react-intl';
import { ReactComponent as Placeholder } from 'assets/icons/crypto-placeholder.svg';
import Arrow from 'assets/icons/Go-forward.svg';
import { useTheme } from '../../store/themeContext';

type InstrumentRecordProps = {
    crypto: string;
    overallSentiment: string;
    sentimentDirection: string;
    photoUrl: string;
    onPress: () => void;
}

function InstrumentRecord({ crypto, overallSentiment, sentimentDirection, photoUrl, onPress }: InstrumentRecordProps) {
  
    const { TERTIARY, POSITIVE, NEGATIVE, HINT,LIGHT_HINT} = useTheme()
    return (
        <button
            className="instrument-container"
            style={{ borderColor: LIGHT_HINT }}
            onClick={onPress}
        >
            {photoUrl ? (
                
                <img
                    src={photoUrl}
                    className="crypto-photo"
                    alt={`${crypto}`}
                />
            ) : (
                <Placeholder 
                className="crypto-photo" />
            )}
            <div className="middle-container">
                <div className={`title-text ${overallSentiment.toLowerCase()}`} >
                    {crypto}
                </div>
                <span className={`sentiment-text ${overallSentiment.toLowerCase()}`}>
                  <FormattedMessage
                      defaultMessage={overallSentiment}
                      id={`views.home.overview.trending-now.${overallSentiment.toLowerCase()}`}
                  />
                </span>
            </div>
            <div className={`arrow-container ${sentimentDirection}`}>
                {/* @ts-ignore */}
                <Arrow className={`sentiment-arrow ${sentimentDirection}`} />
            </div>
        </button>
    );
}
export default InstrumentRecord;
