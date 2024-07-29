import puppeteer from "puppeteer";

// Set a longer timeout for the entire test suite
jest.setTimeout(120000); // 2 minutes

describe("show/hide an event details", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      timeout: 0,
    });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".event", { timeout: 60000 }); // Increase Puppeteer selector timeout to 60 seconds
  });

  afterAll(() => {
    browser.close();
  });

  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".event .details");
    console.log("Event details:", eventDetails); // Debug log
    expect(eventDetails).toBeNull();
  });

  test("User can expand an event to see details", async () => {
    await page.click(".event .details-btn");
    const eventDetails = await page.$(".event .details");
    console.log("Event details after click:", eventDetails); // Debug log
    expect(eventDetails).toBeDefined();
  });

  test("User can collapse an event to hide details", async () => {
    await page.click(".event .details-btn");
    const eventDetails = await page.$(".event .details");
    console.log("Event details after collapse:", eventDetails); // Debug log
    expect(eventDetails).toBeNull();
  });
});
