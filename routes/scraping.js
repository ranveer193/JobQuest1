const express = require("express");
const puppeteer = require("puppeteer")
const router = express.Router();

const getQuotes = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - open the "http://quotes.toscrape.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("https://www.naukri.com/jobs-in-india?functionAreaIdGid=3&functionAreaIdGid=4&functionAreaIdGid=5&functionAreaIdGid=8&functionAreaIdGid=12&functionAreaIdGid=15&clusters=functionalAreaGid", {
    waitUntil: "domcontentloaded",
  });

  // Get page data
  const quotes = await page.evaluate(() => {
    // Fetch the first element with class "quote"
    const quote = document.querySelector(".cust-job-tuple layout-wrapper lay-2 sjw__tuple");

    // Fetch the sub-elements from the previously fetched quote element
    // Get the displayed text and return it (`.innerText`)
    const job_role = quote.querySelector(".title").innerText;
    const comp_name = quote.querySelector(".comp-name mw-25").innerText;

    return { job_role, comp_name };
  });

  // Display the quotes
  console.log(quotes);

  // Close the browser
  await browser.close();
};

router.get('/scrap-jobs', (req, res) => {
    getQuotes();
    return res.end();
});

module.exports = router;