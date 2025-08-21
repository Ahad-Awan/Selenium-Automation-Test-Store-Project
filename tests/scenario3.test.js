const { createDriver } = require("../utils/driver");
const LoginPage = require("../pages/loginPage");
const ProductListingPage = require("../pages/productListingPage");
const config = require("../config/config");
const { By } = require("selenium-webdriver");

describe("Task 4 - Automation Test Store", function () {
  let driver, loginPage, productListingPage;

  before(async () => {
    driver = await createDriver();
    loginPage = new LoginPage(driver);
    productListingPage = new ProductListingPage(driver);
  });

  after(async () => {
    await driver.quit();
  });

  it("Scenario 3: Check sale & stock in category", async function () {
    this.timeout(180000);
    await loginPage.open();
    await loginPage.clickLoginLink();
    await loginPage.login(config.username, config.password);

    // ✅ Navigate to category
    await productListingPage.openCategory();
    await productListingPage.scrollPage();

    const allProducts = await productListingPage.getAllProducts();

    let saleCount = 0,
      saleOutOfStockCount = 0,
      totalOutOfStockCount = 0;

    for (let i = 0; i < allProducts.length; i++) {
      const card = allProducts[i];

      const isOnSale =
        (await card.findElements(By.xpath(".//span[contains(@class,'sale')]")))
          .length > 0;

      const isOutOfStock =
        (
          await card.findElements(
            By.css(".outofstock, .out-of-stock, .nostock, .soldout, .sold-out")
          )
        ).length > 0 ||
        (
          await card.findElements(
            By.xpath(".//*[contains(normalize-space(.), 'Out of Stock')]")
          )
        ).length > 0;

      if (isOnSale) {
        saleCount++;
        if (isOutOfStock) {
          saleOutOfStockCount++;
          totalOutOfStockCount++;
          console.log(`Product ${i + 1}: On sale but out of stock.`);
        } else {
          const hasAddButton =
            (
              await card.findElements(
                By.xpath(".//a[@title='Add to Cart']")
              )
            ).length > 0;
          console.log(
            `Product ${i + 1}: On sale ${
              hasAddButton ? "and can be added" : "(no add button)"
            }`
          );
        }
      } else {
        if (isOutOfStock) {
          totalOutOfStockCount++;
          console.log(`Product ${i + 1}: Not on sale but out of stock.`);
        } else {
          console.log(`Product ${i + 1}: Not on sale and in stock.`);
        }
      }
    }

    console.log(`On sale items: ${saleCount}`);
    console.log(`On sale but out of stock: ${saleOutOfStockCount}`);
    console.log(`Total out of stock products: ${totalOutOfStockCount}`);
    console.log(`Total products: ${allProducts.length}`);
  });
});
