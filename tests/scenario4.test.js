const { createDriver } = require("../utils/driver");
const LoginPage = require("../pages/loginPage");
const config = require("../config/config");
const { By } = require("selenium-webdriver");

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

  it("Scenario 4: Add products ending with 'M'", async () => {
    await loginPage.open();
    await loginPage.clickLoginLink();
    await loginPage.login(config.username, config.password);

    const homeLink = await driver.findElement(By.xpath("//a[text()='Home']"));
    await homeLink.click();
    await driver.sleep(1500);

    const menLink = await driver.findElement(
      By.xpath('//*[@id="categorymenu"]/nav/ul/li[6]/a')
    );
    await menLink.click();
    await driver.sleep(2000);

    await driver.executeScript(`
      window.scrollBy({ top: 500, behavior: 'smooth' });
    `);
    await driver.sleep(1000);

    const products = await driver.findElements(
      By.xpath("//div[contains(@class,'thumbnails')]/div")
    );

    let foundMCount = 0;

    for (let i = 0; i < products.length; i++) {
      const productNameElem = await products[i].findElement(
        By.xpath(".//a[@class='prdocutname']")
      );
      const productName = await productNameElem.getText();

      if (productName.trim().endsWith("M")) {
        foundMCount++;
        console.log(`Found product ending with 'M': "${productName}"`);

        const outOfStockElems = await products[i].findElements(
          By.xpath(".//div[contains(@class, 'nostock')]")
        );

        if (outOfStockElems.length > 0) {
          console.log(`Status: OUT OF STOCK → Cannot add to cart\n`);
        } else {
          const addToCartElems = await products[i].findElements(
            By.xpath(
              ".//a[contains(@class, 'productcart') or contains(@class,'cart')]"
            )
          );

          if (addToCartElems.length > 0) {
            await driver
              .actions({ bridge: true })
              .move({ origin: products[i] })
              .perform();

            await driver.sleep(500);
            await addToCartElems[0].click();
            console.log(`✅ Status: Added to cart successfully\n`);
            await driver.sleep(1000);
          } else {
            console.log(`Status: OUT OF STOCK → Cannot add to cart\n`);
          }
        }
      }
    }

    if (foundMCount === 0) {
      console.log("ℹ No products found ending with 'M'");
    } else {
      console.log(`Total products ending with 'M': ${foundMCount}`);
    }
  });
});
