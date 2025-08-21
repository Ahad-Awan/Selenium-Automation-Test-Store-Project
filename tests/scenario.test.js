const { createDriver } = require("../utils/driver");
const LoginPage = require("../pages/loginPage");
const HomePage = require("../pages/homePage");
const BrandPage = require("../pages/BrandPage");
const ProductPage = require("../pages/ProductPage");
const CartPage = require("../pages/CartPage");
const config = require("../config/config");

const pause = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Task 4 - Automation Test Store", function () {
  let driver, loginPage, homePage, brandPage, productPage, cartPage;

  before(async () => {
    driver = await createDriver();
    loginPage = new LoginPage(driver);
    homePage = new HomePage(driver);
    brandPage = new BrandPage(driver);
    productPage = new ProductPage(driver);
    cartPage = new CartPage(driver);
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it("Scenario 1: Login, select Dove newest item, add to cart, verify", async () => {
    await loginPage.open();
    await pause();
    await loginPage.clickLoginLink();
    await pause();
    await loginPage.login(config.username, config.password);
    await pause();

    await homePage.goHome();
    await pause();
    await homePage.scrollToBrands();
    await pause();

    await brandPage.clickDoveBrand();
    await pause();
    await brandPage.sortByNewest();
    await pause();

    await productPage.addFirstItemToCart();
    await pause();
    await cartPage.goToCart();
  });
});
