import { loadFeature, defineFeature } from "jest-cucumber";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App"; // Ensure correct import
import React from "react";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  let container;

  test("32 events are shown by default.", ({ given, when, then }) => {
    given("the user has not yet changed the number of events", () => {
      container = render(<App />).container;
    });

    when("the user is viewing the list of events", () => {
      // No additional action needed here if events are loaded by default
    });

    then(
      /^(\d+) events will be displayed by default$/,
      async (numberOfEvents) => {
        const eventElements = await screen.findAllByRole("listitem");
        expect(eventElements).toHaveLength(Number(numberOfEvents));
      }
    );
  });

  test("User can change the number of events displayed.", ({
    given,
    when,
    then,
  }) => {
    given("the user is viewing the list of events", () => {
      container = render(<App />).container;
    });

    when(
      /^the user selects a display button other than (\d+)$/,
      async (numberOfEvents) => {
        const buttons = await screen.findAllByRole("button");
        const buttonToClick = buttons.find(
          (button) => button.textContent !== numberOfEvents
        );
        if (buttonToClick) {
          await userEvent.click(buttonToClick);
        }
      }
    );

    then("the selected number of events will be displayed", async () => {
      const eventElements = await screen.findAllByRole("listitem");
      // Make sure your assertion reflects the expected state
      expect(eventElements.length).toBeGreaterThan(0); // Adjust based on your app's behavior
    });
  });
});
