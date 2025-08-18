const { createDriver } = require("../utils/driver");
const LoginPage = require("../pages/loginPage");
const config = require("../config/config");
const { By, until } = require("selenium-webdriver");

describe("Task 4 - Automation Test Store", function () {
  let driver;
  let loginPage;

  before(async () => {
    driver = await createDriver();
    loginPage = new LoginPage(driver);
  });

  after(async () => {
    await driver.quit();
  });

  it("Scenario 2: Add products from Tshirts and Shoes with correct qty and size, then verify cart", async () => {
    await loginPage.open();
    await loginPage.clickLoginLink();
    await loginPage.login(config.username, config.password);
    await driver.sleep(2000);

    const apparelLink = await driver.findElement(
      By.xpath(
        "//*[@id='categorymenu']//a[contains(text(), 'Apparel') and contains(text(), 'accessories')]"
      )
    );
    await apparelLink.click();
    await driver.sleep(1000);

    const tshirtsLink = await driver.findElement(
      By.xpath("//a[text()='T-shirts']")
    );
    await tshirtsLink.click();
    await driver.sleep(2000);

    const sortDropdown = await driver.wait(
      until.elementLocated(By.id("sort")),
      10000
    );
    await driver.wait(until.elementIsVisible(sortDropdown), 10000);

    await sortDropdown.click();
    await driver.sleep(500);

    const priceNewOption = await driver.wait(
      until.elementLocated(By.xpath("//option[text()='Price Low > High']")),
      10000
    );
    await priceNewOption.click();

    await driver.executeScript(`
  window.scrollBy({ top: 300, behavior: 'smooth' });
`);
    await driver.sleep(1500);

    const specificItem = await driver.wait(
      until.elementLocated(By.xpath("//a[@data-id='121']")),
      10000
    );
    await driver.wait(until.elementIsVisible(specificItem), 10000);
    await specificItem.click();
    await driver.sleep(1000);

    await driver.executeScript(`
  window.scrollBy({ top: 300, behavior: 'smooth' });
`);
    await driver.sleep(1500);

    const addToCartBtn = await driver.wait(
      until.elementLocated(By.xpath("//a[contains(@class, 'cart')]")),
      10000
    );
    await driver.wait(until.elementIsVisible(addToCartBtn), 10000);
    await addToCartBtn.click();
    await driver.sleep(2000);

    const apparel = await driver.findElement(
      By.xpath(
        "//*[@id='categorymenu']//a[contains(text(), 'Apparel') and contains(text(), 'accessories')]"
      )
    );
    await apparel.click();
    await driver.sleep(1000);

    const shoesLink = await driver.wait(
      until.elementLocated(By.xpath("//a[text()='Shoes']")),
      10000
    );
    await driver.wait(until.elementIsVisible(shoesLink), 10000);
    await shoesLink.click();
    await driver.sleep(2000);

    const sortDropdownOpen = await driver.wait(
      until.elementLocated(By.id("sort")),
      10000
    );
    await driver.wait(until.elementIsVisible(sortDropdownOpen), 10000);

    await sortDropdownOpen.click();
    await driver.sleep(500);

    const priceOption = await driver.wait(
      until.elementLocated(By.xpath("//option[text()='Price High > Low']")),
      10000
    );
    await priceOption.click();

    await driver.executeScript(`
  window.scrollBy({ top: 300, behavior: 'smooth' });
`);
    await driver.sleep(1500);

    const addShoe = await driver.wait(
      until.elementLocated(By.xpath("//a[@data-id='115']")),
      10000
    );
    await driver.wait(until.elementIsVisible(addShoe), 10000);
    await addShoe.click();
    await driver.sleep(2000);

    await driver.executeScript(`
  window.scrollBy({ top: 300, behavior: 'smooth' });
`);
    await driver.sleep(100);

    const quantityInput = await driver.wait(
      until.elementLocated(By.id("product_quantity")),
      10000
    );
    await driver.wait(until.elementIsVisible(quantityInput), 10000);
    await quantityInput.clear();
    await quantityInput.sendKeys("2");
    await driver.sleep(1000);

    const addToCart = await driver.wait(
      until.elementLocated(By.xpath("//a[contains(@class, 'cart')]")),
      10000
    );
    await driver.wait(until.elementIsVisible(addToCart), 10000);
    await addToCart.click();
    await driver.sleep(4000);
  });
});
