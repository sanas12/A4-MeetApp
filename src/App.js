import React, { useState, useEffect } from "react";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import { extractLocations, getEvents } from "./api";
import "./App.css";
import { InfoAlert, ErrorAlert } from "./components/Alert";

const App = () => {
  const [events, setEvents] = useState([]);
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const allEvents = await getEvents();
      const filteredEvents =
        currentCity === "See all cities"
          ? allEvents
          : allEvents.filter((event) => event.location === currentCity);
      setEvents(filteredEvents.slice(0, numberOfEvents));
      setAllLocations(extractLocations(allEvents));
    };

    fetchData();
  }, [currentCity, numberOfEvents]);

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />
      <NumberOfEvents
        numberOfEvents={numberOfEvents}
        setNumberOfEvents={setNumberOfEvents}
        setErrorAlert={setErrorAlert}
      />
      <EventList events={events} />
    </div>
  );
};

export default App;
