const { By, until } = require("selenium-webdriver");

class ProductListPage {
  constructor(driver) {
    this.driver = driver;
    this.sortDropdown = By.id("sort");
    this.lowToHigh = By.xpath("//option[text()='Price Low > High']");
    this.highToLow = By.xpath("//option[text()='Price High > Low']");
  }

  async sortByLowToHigh() {
    const dropdown = await this.driver.wait(
      until.elementLocated(this.sortDropdown),
      10000
    );
    await dropdown.click();
    const option = await this.driver.findElement(this.lowToHigh);
    await option.click();
  }

  async sortByHighToLow() {
    const dropdown = await this.driver.wait(
      until.elementLocated(this.sortDropdown),
      10000
    );
    await dropdown.click();
    const option = await this.driver.findElement(this.highToLow);
    await option.click();
  }

  async selectProductById(dataId) {
    const product = await this.driver.wait(
      until.elementLocated(By.xpath(`//a[@data-id='${dataId}']`)),
      10000
    );
    await product.click();
  }
}

module.exports = ProductListPage;
