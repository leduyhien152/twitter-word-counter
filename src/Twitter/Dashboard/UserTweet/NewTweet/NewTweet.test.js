const puppeteer = require("puppeteer");

describe("Word count", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, // headless mode set to false so browser opens up with visual feedback
      slowMo: 250, // how slow actions should be
    });
  });

  test("when user inputs less than 40 characters", async () => {
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");

    await page.waitForSelector("#new-tweet-text-editor");
    await page.click("#new-tweet-text-editor");
    await page.type("#new-tweet-text-editor", "hello");

    const textEditor = await page.$eval(
      "#new-tweet-text-editor",
      (el) => el.textContent
    );
    expect(textEditor).toEqual("hello");

    const textCount = await page.$("#new-tweet-text-count");
    expect(textCount).not.toBeInTheDocument();
  }, 9000000);

  test("when user inputs between 40 and 50 characters", async () => {
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");

    await page.waitForSelector("#new-tweet-text-editor");
    await page.click("#new-tweet-text-editor");
    await page.type(
      "#new-tweet-text-editor",
      "hello, this is a forty-four-character tweet."
    );

    const textEditor = await page.$eval(
      "#new-tweet-text-editor",
      (el) => el.textContent
    );
    expect(textEditor).toEqual("hello, this is a forty-four-character tweet.");

    const textCount = await page.$eval(
      "#new-tweet-text-count",
      (el) => el.textContent
    );
    expect(textCount).toEqual("6");
  }, 9000000);

  test("when user inputs more than 50 characters", async () => {
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");

    await page.waitForSelector("#new-tweet-text-editor");
    await page.click("#new-tweet-text-editor");
    await page.type(
      "#new-tweet-text-editor",
      "oops, this is an over-typed tweet. you should input less than 50 characters."
    );

    const textEditor = await page.$eval(
      "#new-tweet-text-editor",
      (el) => el.textContent
    );
    expect(textEditor).toEqual(
      "oops, this is an over-typed tweet. you should input less than 50 characters."
    );

    const textCount = await page.$eval(
      "#new-tweet-text-count",
      (el) => el.textContent
    );
    expect(textCount).toEqual("-26");
  }, 9000000);

  afterAll(() => {
    browser.close();
  });
});
