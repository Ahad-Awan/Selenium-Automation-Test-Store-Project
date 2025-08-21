const { By, until } = require("selenium-webdriver");

class CartPage {
  constructor(driver) {
    this.driver = driver;
    this.cartLink = By.xpath(
      "//ul[@id='main_menu_top']//a[contains(@href, 'cart')]/span"
    );
  }

  async goToCart() {
    const cart = await this.driver.wait(
      until.elementLocated(this.cartLink),
      20000
    );
    await this.driver.executeScript("arguments[0].scrollIntoView(true);", cart);
    await cart.click();
  }
}

module.exports = CartPage;
