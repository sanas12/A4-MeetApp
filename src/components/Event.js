// src/components/Event.js
import React, { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!event) {
    return null;
  }
  return (
    <li className="event">
      <div>{event.summary}</div>
      <div>{event.created}</div>
      <div>{event.location}</div>
      <button
        className="details-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "hide details" : "show details"}
      </button>
      {showDetails && (
        <div className="details">
          <p>Event Details Here</p>
        </div>
      )}
    </li>
  );
};

export default Event;
