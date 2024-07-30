// src/components/NumberOfEvents.js
import React, { useState } from "react";
import PropTypes from "prop-types";

const NumberOfEvents = ({
  numberOfEvents,
  setNumberOfEvents,
  setErrorAlert,
}) => {
  const [inputValue, setInputValue] = useState(numberOfEvents);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (isNaN(value) || value <= 0 || value > 100) {
      setErrorAlert(
        "Please enter a valid number of events (between 1 and 100)."
      );
    } else {
      setErrorAlert("");
      setNumberOfEvents(value);
    }
  };

  return (
    <div>
      <label htmlFor="event-number-input">Number of Events:</label>
      <div className="number-of-events">
        <input
          type="text"
          className="number-input"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

NumberOfEvents.propTypes = {
  numberOfEvents: PropTypes.number.isRequired,
  setNumberOfEvents: PropTypes.func.isRequired,
  setErrorAlert: PropTypes.func.isRequired,
};

export default NumberOfEvents;
