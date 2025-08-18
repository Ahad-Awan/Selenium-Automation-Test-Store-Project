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

  it("Scenario 1: Login, select Dove newest item, add to cart, verify", async () => {
    await loginPage.open();
    await loginPage.clickLoginLink();
    await loginPage.login(config.username, config.password);
    await driver.sleep(2000);

    const homeLink = await driver.findElement(By.xpath("//a[text()='Home']"));
    await homeLink.click();
    await driver.sleep(2000);

    await driver.executeScript(`
      window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
      });
    `);
    await driver.sleep(2000);

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

    const sortDropdown = await driver.wait(
      until.elementLocated(By.id("sort")),
      10000
    );
    await driver.wait(until.elementIsVisible(sortDropdown), 10000);

    await sortDropdown.click();
    await driver.sleep(500);

    const dateNewOption = await driver.wait(
      until.elementLocated(By.xpath("//option[text()='Date New > Old']")),
      10000
    );
    await dateNewOption.click();

    await driver.executeScript(`
  window.scrollBy({ top: 300, behavior: 'smooth' });
`);
    await driver.sleep(1500);

    const firstItem = await driver.wait(
      until.elementLocated(
        By.xpath("(//a[@class='productcart' and @title='Add to Cart'])[1]")
      ),
      10000
    );
    await driver.wait(until.elementIsVisible(firstItem), 10000);
    await firstItem.click();
    await driver.sleep(2000);

    const cartLink = await driver.wait(
      until.elementLocated(
        By.xpath("//ul[@id='main_menu_top']//a[contains(@href, 'cart')]/span")
      ),
      10000
    );
    await cartLink.click();
    await driver.sleep(2000);
  });
});
