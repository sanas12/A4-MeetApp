import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("<App /> Component", () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test("renders list of events", () => {
    expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
  });

  test("render CitySearch", () => {
    expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
  });

  test("renders NumberOfEvents component", () => {
    expect(screen.getByText("5 events")).toBeInTheDocument();
    expect(screen.getByText("10 events")).toBeInTheDocument();
    expect(screen.getByText("20 events")).toBeInTheDocument();
    expect(screen.getByText("32 events")).toBeInTheDocument();
  });
});
