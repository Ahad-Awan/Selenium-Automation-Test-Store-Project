const { By, until } = require("selenium-webdriver");

class ProductPage {
  constructor(driver) {
    this.driver = driver;
    this.firstAddToCart = By.xpath(
      "(//a[@class='productcart' and @title='Add to Cart'])[1]"
    );
  }

  async addFirstItemToCart() {
    const item = await this.driver.wait(
      until.elementLocated(this.firstAddToCart),
      20000
    );
    await this.driver.executeScript("arguments[0].scrollIntoView(true);", item);
    await item.click();
  }
}

module.exports = ProductPage;
