const { By, until } = require("selenium-webdriver");

class CategoryPage {
  constructor(driver) {
    this.driver = driver;
    this.apparelLink = By.xpath(
      "//*[@id='categorymenu']//a[contains(text(), 'Apparel') and contains(text(), 'accessories')]"
    );
    this.tshirtsLink = By.xpath("//a[text()='T-shirts']");
    this.shoesLink = By.xpath("//a[text()='Shoes']");
  }

  async openApparel() {
    const apparel = await this.driver.findElement(this.apparelLink);
    await apparel.click();
  }

  async openTshirts() {
    const tshirts = await this.driver.findElement(this.tshirtsLink);
    await tshirts.click();
  }

  async openShoes() {
    const shoes = await this.driver.wait(
      until.elementLocated(this.shoesLink),
      10000
    );
    await shoes.click();
  }
}

module.exports = CategoryPage;
