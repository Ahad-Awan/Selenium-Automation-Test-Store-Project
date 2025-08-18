const { By, until } = require("selenium-webdriver");
const config = require("../config/config");

class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  async open() {
    await this.driver.get(config.baseUrl);
  }

  async clickLoginLink() {
    await this.driver.findElement(By.linkText("Login")).click();
  }

  async login(username, password) {
    await this.driver
      .findElement(By.id("loginFrm_loginname"))
      .sendKeys(username);
    await this.driver
      .findElement(By.id("loginFrm_password"))
      .sendKeys(password);
    await this.driver.findElement(By.css("button[title='Login']")).click();
  }
}

module.exports = LoginPage;
