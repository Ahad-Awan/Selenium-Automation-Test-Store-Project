const { createDriver } = require("../utils/driver");
const LoginPage = require("../pages/loginPage");
const config = require("../config/config");
const { By, until } = require("selenium-webdriver");

describe("Task 4 - Automation Test Store", function () {
  let driver;
  let loginPage;

  before(async () => {
    try {
      driver = await createDriver();
      loginPage = new LoginPage(driver);
      console.log("Driver created successfully");
    } catch (error) {
      console.error("Failed to create driver in before hook:", error.message);
      throw error;
    }
  });

  after(async () => {
    try {
      if (driver) {
        await driver.quit();
        console.log("Driver closed successfully");
      }
    } catch (error) {
      console.error("Error closing driver:", error.message);
    }
  });

  it("Scenario 1: Login, select Dove newest item, add to cart, verify", async () => {
    try {
      // Verify driver is still active
      if (!driver) {
        throw new Error("Driver is not available");
      }

      // Open the page
      console.log("Opening page...");
      await loginPage.open();
      await driver.sleep(3000);

      // Click login link
      console.log("Clicking login link...");
      await loginPage.clickLoginLink();
      await driver.sleep(3000);

      // Perform login
      console.log("Performing login...");
      await loginPage.login(config.username, config.password);
      await driver.sleep(4000);

      // Navigate to home
      console.log("Navigating to home...");
      const homeLink = await driver.wait(
        until.elementLocated(By.xpath("//a[text()='Home']")),
        15000
      );
      await homeLink.click();
      await driver.sleep(3000);

      // Scroll down to brands section
      console.log("Scrolling to brands section...");
      await driver.executeScript(`
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      `);
      await driver.sleep(3000);

      // Locate and click on Dove brand
      console.log("Looking for Dove brand...");
      const doveImage = await driver.wait(
        until.elementLocated(
          By.xpath(
            "//ul[@id='brandcarousal']//img[contains(@alt, 'Dove') or contains(@src, 'dove')]"
          )
        ),
        20000
      );

      // Scroll into view and wait until clickable
      await driver.executeScript("arguments[0].scrollIntoView(true);", doveImage);
      await driver.wait(until.elementIsVisible(doveImage), 15000);
      await driver.wait(until.elementIsEnabled(doveImage), 15000);
      await doveImage.click();
      await driver.sleep(4000);

      // Sort by Date New > Old
      console.log("Sorting by date...");
      const sortDropdown = await driver.wait(
        until.elementLocated(By.id("sort")),
        20000
      );
      await driver.wait(until.elementIsVisible(sortDropdown), 15000);
      await driver.executeScript(
        "arguments[0].scrollIntoView(true);",
        sortDropdown
      );
      await sortDropdown.click();
      await driver.sleep(2000);

      const dateNewOption = await driver.wait(
        until.elementLocated(By.xpath("//option[text()='Date New > Old']")),
        20000
      );
      await driver.executeScript(
        "arguments[0].scrollIntoView(true);",
        dateNewOption
      );
      await dateNewOption.click();
      await driver.sleep(3000);

      // Scroll down to see products
      console.log("Scrolling to products...");
      await driver.executeScript(
        "window.scrollBy({ top: 500, behavior: 'smooth' });"
      );
      await driver.sleep(3000);

      // Click first Add to Cart button
      console.log("Adding first item to cart...");
      const firstItem = await driver.wait(
        until.elementLocated(
          By.xpath("(//a[@class='productcart' and @title='Add to Cart'])[1]")
        ),
        20000
      );
      await driver.executeScript("arguments[0].scrollIntoView(true);", firstItem);
      await driver.wait(until.elementIsVisible(firstItem), 15000);
      await driver.wait(until.elementIsEnabled(firstItem), 15000);
      await firstItem.click();
      await driver.sleep(4000);

      // Go to cart
      console.log("Going to cart...");
      const cartLink = await driver.wait(
        until.elementLocated(
          By.xpath("//ul[@id='main_menu_top']//a[contains(@href, 'cart')]/span")
        ),
        20000
      );
      await driver.executeScript("arguments[0].scrollIntoView(true);", cartLink);
      await driver.wait(until.elementIsVisible(cartLink), 15000);
      await driver.wait(until.elementIsEnabled(cartLink), 15000);
      await cartLink.click();
      await driver.sleep(4000);

      console.log("Test completed successfully!");
    } catch (error) {
      console.error("Test failed with error:", error.message);
      
      // Take a screenshot on failure if driver is still available
      try {
        if (driver) {
          const screenshot = await driver.takeScreenshot();
          require('fs').writeFileSync('error-screenshot.png', screenshot, 'base64');
          console.log("Screenshot saved as error-screenshot.png");
        }
      } catch (screenshotError) {
        console.error("Failed to take screenshot:", screenshotError.message);
      }
      
      throw error;
    }
  });
});
