const { By, until } = require("selenium-webdriver");

class ProductDetailPage {
  constructor(driver) {
    this.driver = driver;
    this.quantityInput = By.id("product_quantity");
    this.addToCartBtn = By.xpath("//a[contains(@class, 'cart')]");
  }

  async setQuantity(qty) {
    const qtyInput = await this.driver.wait(
      until.elementLocated(this.quantityInput),
      10000
    );
    await qtyInput.clear();
    await qtyInput.sendKeys(qty);
  }

  async addToCart() {
    const addBtn = await this.driver.wait(
      until.elementLocated(this.addToCartBtn),
      10000
    );
    await addBtn.click();
  }
}

module.exports = ProductDetailPage;
