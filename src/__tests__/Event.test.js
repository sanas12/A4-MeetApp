import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Event from "../components/Event";
import allEvents from "../mock-data";

const formattedDate = new Date(allEvents[0].created).toUTCString();

describe("<Event /> component", () => {
  test("renders event title", () => {
    const EventComponent = render(<Event event={allEvents[0]} />);
    expect(
      EventComponent.queryByText(allEvents[0].summary)
    ).toBeInTheDocument();
  });

  test("renders event start time", () => {
    const { getByText } = render(<Event event={allEvents[0]} />);
    expect(getByText("2020-05-19T19:17:46.000Z")).toBeInTheDocument(); // Use exact date string
  });

  test("renders event location", () => {
    const EventComponent = render(<Event event={allEvents[0]} />);
    expect(
      EventComponent.queryByText(allEvents[0].location)
    ).toBeInTheDocument();
  });

  test("renders event details button with the title (show details)", () => {
    const EventComponent = render(<Event event={allEvents[0]} />);
    expect(EventComponent.queryByText("show details")).toBeInTheDocument(); // Use lowercase for button text
  });

  test("event details section hidden by default", () => {
    const EventComponent = render(<Event event={allEvents[0]} />);
    expect(
      EventComponent.queryByText("Event Details Here")
    ).not.toBeInTheDocument();
  });

  test("hides details section when show details button is clicked", async () => {
    const { getByText, queryByText } = render(<Event event={allEvents[0]} />);
    fireEvent.click(getByText("show details"));
    fireEvent.click(getByText("hide details"));
    expect(
      queryByText("A great event to learn JavaScript.")
    ).not.toBeInTheDocument();
  });

  test("shows details section when hide details button is clicked", async () => {
    const { getByText, queryByText } = render(<Event event={allEvents[0]} />);
    fireEvent.click(getByText("show details"));
    const hideDetailsButton = getByText("hide details");
    fireEvent.click(hideDetailsButton);
    expect(queryByText("Event Details Here")).not.toBeInTheDocument();
  });
});
