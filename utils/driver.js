const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function createDriver() {
  let options = new chrome.Options();

  // Jenkins / CI ke liye recommended flags
  options.addArguments("--disable-gpu"); // GPU disable (headless stability)
  options.addArguments("--no-sandbox"); // sandbox issue avoid
  options.addArguments("--disable-dev-shm-usage"); // shared memory issue avoid
  options.addArguments("--window-size=1920,1080"); // full HD screen size

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  return driver;
}

module.exports = { createDriver };
