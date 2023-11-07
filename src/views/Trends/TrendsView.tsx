import React, { useState, useEffect } from 'react';
import { InstrumentProps, useInstrument } from '../../store/InstrumentProvider';
import './TrendsView.css'
const TrendsView = () => {
  const instruments = useInstrument();
  const [search, setSearch] = useState('');
  const [filteredInstruments, setFilteredInstruments] = useState(instruments);
  const [selectedInstrument, setSelectedInstrument] = useState<InstrumentProps | null>(null);


  useEffect(() => {
    if (search) {
      const filtered = instruments?.filter((instrument) =>
        instrument.crypto.toLowerCase().includes(search.toLowerCase()) ||
        instrument.cryptoSymbol.toLowerCase().includes(search.toLowerCase()) ||
        instrument.overallSentiment.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredInstruments(filtered);
    } else {
      setFilteredInstruments(instruments);
    }
  }, [search, instruments]);

  return (
    <div className="trends-view">
      <div className="search-list">
        <input
          type="text"
          placeholder="ex. Bitcoin"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="instrument-list">
          {filteredInstruments?.map((instrument) => (
            <div
              key={instrument.id}
              className={`instrument ${selectedInstrument?.id === instrument.id ? 'selected' : ''}`}
              onClick={() => setSelectedInstrument(instrument)}
            >
              {instrument.crypto}
            </div>
          ))}
        </div>
      </div>
      <div className="instrument-details">
        {selectedInstrument ? (
          <div>
            {/* Display the details of the selected instrument */}
            <h2>{selectedInstrument.crypto}</h2>
            {/* ... other details ... */}
          </div>
        ) : (
          <div>Select an instrument to see the details</div>
        )}
      </div>
    </div>
  );
};

export default TrendsView;