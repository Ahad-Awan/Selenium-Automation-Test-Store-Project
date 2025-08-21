const { By, until } = require("selenium-webdriver");

class SkincarePage {
  constructor(driver) {
    this.driver = driver;
  }

  async waitForGrid() {
    const gridLocator = By.xpath(
      "//div[@class='thumbnails grid row list-inline']"
    );
    const grid = await this.driver.wait(
      until.elementLocated(gridLocator),
      10000
    );
    await this.driver.wait(until.elementIsVisible(grid), 10000);
    await this.driver.sleep(1000);
  }

  async scrollDown() {
    await this.driver.executeScript(`
      window.scrollBy({ top: 600, behavior: 'smooth' });
    `);
    await this.driver.sleep(2000); // delay for smooth scroll
  }

  async checkProducts() {
    const allProducts = await this.driver.findElements(
      By.xpath(
        "//div[@class='thumbnails grid row list-inline']/div[contains(@class,'col-md')]"
      )
    );

    let saleCount = 0;
    let saleOutOfStockCount = 0;
    let totalOutOfStockCount = 0;

    for (let i = 0; i < allProducts.length; i++) {
      const card = allProducts[i];

      const isOnSale =
        (await card.findElements(By.xpath(".//span[contains(@class,'sale')]")))
          .length > 0;

      const isOutOfStock =
        (
          await card.findElements(
            By.css(".outofstock, .out-of-stock, .nostock, .soldout, .sold-out")
          )
        ).length > 0 ||
        (
          await card.findElements(
            By.xpath(".//*[contains(normalize-space(.), 'Out of Stock')]")
          )
        ).length > 0;

      if (isOnSale) {
        saleCount++;
        if (isOutOfStock) {
          saleOutOfStockCount++;
          totalOutOfStockCount++;
          console.log(`Product ${i + 1}: On sale but out of stock.`);
        } else {
          let added = false;
          try {
            let addButtons = await card.findElements(
              By.xpath(".//a[@title='Add to Cart']")
            );
            if (addButtons.length === 0) {
              addButtons = await card.findElements(
                By.xpath(
                  ".//a[contains(@class,'productcart') or contains(@class,'cart') or contains(@title,'Cart')]"
                )
              );
            }
            if (addButtons.length > 0) {
              await addButtons[0].click();
              added = true;
              await this.driver.sleep(1000); // delay after add
            }
          } catch (_) {}

          if (added) {
            console.log(`Product ${i + 1}: On sale, Add to cart.`);
          } else {
            console.log(
              `Product ${i + 1}: On sale, Add to cart (button not found).`
            );
          }
        }
      } else {
        if (isOutOfStock) {
          totalOutOfStockCount++;
          console.log(`Product ${i + 1}: Not on sale but out of stock.`);
        } else {
          console.log(`Product ${i + 1}: Not on sale and in stock.`);
        }
      }

      await this.driver.sleep(800);
    }

    console.log(`On sale items: ${saleCount}`);
    console.log(`On sale but out of stock: ${saleOutOfStockCount}`);
    console.log(`Total out of stock products: ${totalOutOfStockCount}`);
    console.log(`Total products: ${allProducts.length}`);
  }
}

module.exports = SkincarePage;
