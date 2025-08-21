const { By, until } = require("selenium-webdriver");

class ProductListingPage {
  constructor(driver) {
    this.driver = driver;
    this.categoryLink = By.xpath(
      "//*[@id='categorymenu']//a[contains(text(), 'Skincare')]"
    );
    this.gridLocator = By.xpath(
      "//div[@class='thumbnails grid row list-inline']"
    );
  }

  async openCategory() {
    const link = await this.driver.findElement(this.categoryLink);
    await link.click();

    const grid = await this.driver.wait(
      until.elementLocated(this.gridLocator),
      10000
    );
    await this.driver.wait(until.elementIsVisible(grid), 10000);
    await this.driver.sleep(500);
  }

  async getAllProducts() {
    return await this.driver.findElements(
      By.xpath(
        "//div[@class='thumbnails grid row list-inline']/div[contains(@class,'col-md')]"
      )
    );
  }

  async scrollPage() {
    await this.driver.executeScript(
      `window.scrollBy({ top: 600, behavior: 'smooth' });`
    );
    await this.driver.sleep(400);
  }
}

module.exports = ProductListingPage;
