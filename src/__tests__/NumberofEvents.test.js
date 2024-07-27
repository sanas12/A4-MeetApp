// src/__tests__/NumberOfEvents.test.js
import React from "react";

// src/__tests__/NumberOfEvents.test.js

import { render, screen, fireEvent } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let handleNumberOfEventsChange;
  let mockSetErrorAlert;

  beforeEach(() => {
    handleNumberOfEventsChange = jest.fn();
    mockSetErrorAlert = jest.fn();
  });

  test("renders default number of events as 32", () => {
    render(
      <NumberOfEvents
        numberOfEvents={32}
        onNumberOfEventsChange={handleNumberOfEventsChange}
        setErrorAlert={mockSetErrorAlert}
      />
    );

    const button32 = screen.getByText("32 events");
    expect(button32).toBeInTheDocument();
    fireEvent.click(button32);
    expect(handleNumberOfEventsChange).toHaveBeenCalledWith(32);
  });

  test("renders and handles 5 events button", () => {
    render(
      <NumberOfEvents
        numberOfEvents={32}
        onNumberOfEventsChange={handleNumberOfEventsChange}
        setErrorAlert={mockSetErrorAlert}
      />
    );

    const button5 = screen.getByText("5 events");
    expect(button5).toBeInTheDocument();
    fireEvent.click(button5);
    expect(handleNumberOfEventsChange).toHaveBeenCalledWith(5);
  });

  test("renders and handles 10 events button", () => {
    render(
      <NumberOfEvents
        numberOfEvents={32}
        onNumberOfEventsChange={handleNumberOfEventsChange}
        setErrorAlert={mockSetErrorAlert}
      />
    );

    const button10 = screen.getByText("10 events");
    expect(button10).toBeInTheDocument();
    fireEvent.click(button10);
    expect(handleNumberOfEventsChange).toHaveBeenCalledWith(10);
  });

  test("renders and handles 20 events button", () => {
    render(
      <NumberOfEvents
        numberOfEvents={32}
        onNumberOfEventsChange={handleNumberOfEventsChange}
        setErrorAlert={mockSetErrorAlert}
      />
    );

    const button20 = screen.getByText("20 events");
    expect(button20).toBeInTheDocument();
    fireEvent.click(button20);
    expect(handleNumberOfEventsChange).toHaveBeenCalledWith(20);
  });
});
