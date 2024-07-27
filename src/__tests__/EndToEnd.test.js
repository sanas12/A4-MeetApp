import puppeteer from "puppeteer";

jest.setTimeout(60000); // Increase timeout to 60 seconds

describe("show/hide an event details", () => {
  let browser;
  let page;

  beforeAll(async () => {
    console.log("Launching browser...");
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      timeout: 0,
    });

    console.log("Opening new page...");
    page = await browser.newPage();

    console.log("Navigating to localhost:3000...");
    await page.goto("http://localhost:3000/");

    console.log("Waiting for selector .event...");
    await page.waitForSelector(".event");
  });

  afterAll(async () => {
    console.log("Closing browser...");
    await browser.close();
  });

  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".event .details");
    expect(eventDetails).toBeNull();
  });

  test("User can expand an event to see details", async () => {
    await page.click(".event .details-btn");
    const eventDetails = await page.$(".event .details");
    expect(eventDetails).toBeDefined();
  });

  test("User can collapse an event to hide details", async () => {
    await page.click(".event .details-btn"); // Click to expand first
    await page.click(".event .details-btn"); // Click to collapse
    const eventDetails = await page.$(".event .details");
    expect(eventDetails).toBeNull();
  });
});
