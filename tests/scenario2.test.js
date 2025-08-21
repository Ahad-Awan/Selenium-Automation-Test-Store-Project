const { createDriver } = require("../utils/driver");
const LoginPage = require("../pages/loginPage");
const CategoryPage = require("../pages/categoryPage");
const ProductListPage = require("../pages/productListPage");
const ProductDetailPage = require("../pages/productDetailPage");
const config = require("../config/config");
const wait = require("../utils/wait");

describe("Task 4 - Automation Test Store", function () {
  let driver, loginPage, categoryPage, productListPage, productDetailPage;

  before(async () => {
    driver = await createDriver();
    loginPage = new LoginPage(driver);
    categoryPage = new CategoryPage(driver);
    productListPage = new ProductListPage(driver);
    productDetailPage = new ProductDetailPage(driver);
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it("Scenario 2: Add products from T-shirts and Shoes with correct qty and size, then verify cart", async () => {
    await loginPage.open();
    await loginPage.clickLoginLink();
    await loginPage.login(config.username, config.password);

    await categoryPage.openApparel();
    await wait(2000);
    await categoryPage.openTshirts();
    await wait(2000);
    await productListPage.sortByLowToHigh();
    await wait(2000);
    await productListPage.selectProductById("121");
    await wait(2000);
    await productDetailPage.addToCart();
    await wait(2000);

    await categoryPage.openApparel();
    await wait(2000);
    await categoryPage.openShoes();
    await wait(2000);
    await productListPage.sortByHighToLow();
    await wait(2000);
    await productListPage.selectProductById("115");
    await wait(2000);
    await productDetailPage.setQuantity("2");
    await wait(2000);
    await productDetailPage.addToCart();
    await wait(2000);
  });
});
