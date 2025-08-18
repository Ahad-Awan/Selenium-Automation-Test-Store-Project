const { Builder } = require("selenium-webdriver");

async function createDriver() {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.manage().window().maximize();
  return driver;
}

module.exports = { createDriver };
