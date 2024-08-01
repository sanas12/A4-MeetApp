// src/__tests__/NumberOfEvents.test.js

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let handleNumberOfEventsChange;
  let mockSetErrorAlert;
  let mockSetNumberOfEvents;

  beforeEach(() => {
    handleNumberOfEventsChange = jest.fn();
    mockSetErrorAlert = jest.fn();
    mockSetNumberOfEvents = jest.fn();
  });

  test("renders default number of events as 32", () => {
    render(
      <NumberOfEvents
        numberOfEvents={32}
        onNumberOfEventsChange={handleNumberOfEventsChange}
        setNumberOfEvents={mockSetNumberOfEvents}
        setErrorAlert={mockSetErrorAlert}
      />
    );

    const input = screen.getByLabelText("Number of Events:");
    expect(input.value).toBe("32");
  });

  test("handles number of events input change", () => {
    render(
      <NumberOfEvents
        numberOfEvents={32}
        onNumberOfEventsChange={handleNumberOfEventsChange}
        setNumberOfEvents={mockSetNumberOfEvents}
        setErrorAlert={mockSetErrorAlert}
      />
    );

    const input = screen.getByLabelText("Number of Events:");
    fireEvent.change(input, { target: { value: "5" } });

    expect(mockSetNumberOfEvents).toHaveBeenCalledWith("5");
    expect(mockSetErrorAlert).toHaveBeenCalledWith("");
  });

  test("shows error alert for invalid input", () => {
    render(
      <NumberOfEvents
        numberOfEvents={32}
        onNumberOfEventsChange={handleNumberOfEventsChange}
        setNumberOfEvents={mockSetNumberOfEvents}
        setErrorAlert={mockSetErrorAlert}
      />
    );

    const input = screen.getByLabelText("Number of Events:");
    fireEvent.change(input, { target: { value: "-1" } });

    expect(mockSetErrorAlert).toHaveBeenCalledWith(
      "Please enter a valid number of events (between 1 and 100)."
    );
  });

  test("clears error alert for valid input", () => {
    render(
      <NumberOfEvents
        numberOfEvents={32}
        onNumberOfEventsChange={handleNumberOfEventsChange}
        setNumberOfEvents={mockSetNumberOfEvents}
        setErrorAlert={mockSetErrorAlert}
      />
    );

    const input = screen.getByLabelText("Number of Events:");
    fireEvent.change(input, { target: { value: "10" } });

    expect(mockSetErrorAlert).toHaveBeenCalledWith("");
    expect(mockSetNumberOfEvents).toHaveBeenCalledWith("10");
  });
});
