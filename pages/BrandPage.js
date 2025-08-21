const { By, until } = require("selenium-webdriver");

class BrandPage {
  constructor(driver) {
    this.driver = driver;
    this.doveImage = By.xpath(
      "//ul[@id='brandcarousal']//img[contains(@alt, 'Dove') or contains(@src, 'dove')]"
    );
    this.sortDropdown = By.id("sort");
    this.dateNewOption = By.xpath("//option[text()='Date New > Old']");
  }

  async clickDoveBrand() {
    const dove = await this.driver.wait(
      until.elementLocated(this.doveImage),
      20000
    );
    await this.driver.executeScript("arguments[0].scrollIntoView(true);", dove);
    await dove.click();
  }

  async sortByNewest() {
    const dropdown = await this.driver.wait(
      until.elementLocated(this.sortDropdown),
      20000
    );
    await dropdown.click();
    const option = await this.driver.wait(
      until.elementLocated(this.dateNewOption),
      20000
    );
    await option.click();
  }
}

module.exports = BrandPage;
