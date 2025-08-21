const { By } = require("selenium-webdriver");

class HomePage {
  constructor(driver) {
    this.driver = driver;
    this.homeLink = By.xpath("//a[text()='Home']");
    this.brandCarousel = By.id("brandcarousal");
  }

  async goHome() {
    await this.driver.findElement(this.homeLink).click();
  }

  async scrollToBrands() {
    await this.driver.executeScript(`
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    `);
  }
}

module.exports = HomePage;
