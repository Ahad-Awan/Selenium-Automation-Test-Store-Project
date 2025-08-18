const { Given, When, Then } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");
const { createDriver } = require("../utils/driver");
const LoginPage = require("../pages/loginPage");
const config = require("../config/config");

let driver;
let loginPage;

Given("the user is on the login page", async function () {
  driver = await createDriver();
  loginPage = new LoginPage(driver);
  await loginPage.open();
});

When("the user logs in with valid credentials", async function () {
  await loginPage.clickLoginLink();
  await loginPage.login(config.username, config.password);
  await driver.sleep(2000);
});

When("navigates back to the home page", async function () {
  const homeLink = await driver.findElement(By.xpath("//a[text()='Home']"));
  await homeLink.click();
  await driver.sleep(2000);
});

When("scrolls to the bottom of the page", async function () {
  await driver.executeScript(`
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  `);
  await driver.sleep(2000);
});

When("clicks on the Dove brand", async function () {
  const doveImage = await driver.wait(
    until.elementIsVisible(
      await driver.wait(
        until.elementLocated(
          By.xpath(
            "//ul[@id='brandcarousal']//img[contains(@alt, 'Dove') or contains(@src, 'dove')]"
          )
        ),
        10000
      )
    ),
    10000
  );
  await doveImage.click();
  await driver.sleep(2000);
});

When("sorts products by {string}", async function (sortOption) {
  const sortDropdown = await driver.wait(
    until.elementLocated(By.id("sort")),
    10000
  );
  await driver.wait(until.elementIsVisible(sortDropdown), 10000);
  await sortDropdown.click();
  await driver.sleep(500);

  const optionElement = await driver.wait(
    until.elementLocated(By.xpath(`//option[text()='${sortOption}']`)),
    10000
  );
  await optionElement.click();
  await driver.executeScript(
    `window.scrollBy({ top: 300, behavior: 'smooth' });`
  );
  await driver.sleep(1500);
});

When("adds the newest Dove product to the cart", async function () {
  const firstItem = await driver.wait(
    until.elementLocated(
      By.xpath("(//a[@class='productcart' and @title='Add to Cart'])[1]")
    ),
    10000
  );
  await driver.wait(until.elementIsVisible(firstItem), 10000);
  await firstItem.click();
  await driver.sleep(2000);
});

Then("the user should see the item in the shopping cart", async function () {
  const cartLink = await driver.wait(
    until.elementLocated(
      By.xpath("//ul[@id='main_menu_top']//a[contains(@href, 'cart')]/span")
    ),
    10000
  );
  await cartLink.click();
  await driver.sleep(2000);
  await driver.quit();
});
