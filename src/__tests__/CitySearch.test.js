import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";

// Mock functions to simulate fetching events and extracting locations
const getEvents = async () => {
  // Mock implementation for testing purposes
  return [
    { location: "Berlin, Germany" },
    { location: "New York, USA" },
    { location: "London, UK" },
  ];
};

const extractLocations = (events) => {
  return events.map((event) => event.location);
};

describe("<CitySearch /> component", () => {
  let CitySearchComponent;

  beforeEach(() => {
    CitySearchComponent = render(<CitySearch allLocations={[]} />);
  });

  test("renders text input", () => {
    const cityTextBox = screen.getByRole("textbox");
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });

  test("suggestions list is hidden by default", () => {
    const suggestionList = screen.queryByRole("list");
    expect(suggestionList).not.toBeInTheDocument();
  });

  test("renders the suggestion text in the textbox upon clicking on the suggestion", async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

    const cityTextBox = screen.getByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    // Find the suggestion by text content
    const suggestionText = "Berlin, Germany";
    const suggestionItem = screen.getByText(suggestionText);
    expect(suggestionItem).toBeInTheDocument();

    // Click on the suggestion
    user.click(suggestionItem);

    // Assert that the textbox value updates correctly
    expect(cityTextBox).toHaveValue(suggestionText);
  });

  test("renders a list of suggestions when city textbox gains focus", async () => {
    const user = userEvent.setup();
    const cityTextBox = screen.getByRole("textbox");
    await user.click(cityTextBox);

    const suggestionList = screen.getByRole("list");
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass("suggestions");
  });

  test("updates list of suggestions correctly when user types in city textbox", async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

    // User types "Berlin" in city textbox
    const cityTextBox = screen.getByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    // Filter allLocations to locations matching "Berlin"
    const filteredLocations = allLocations.filter((location) =>
      location.toLowerCase().includes("berlin")
    );

    // Get all suggestion items
    const suggestionItems = screen.getAllByRole("listitem");

    // Assert number of suggestion items
    expect(suggestionItems.length).toEqual(filteredLocations.length + 1); // +1 for "See all cities" item
  });
});
