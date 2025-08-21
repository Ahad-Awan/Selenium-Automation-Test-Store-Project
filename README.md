## Selenium Task 4 — Automation Test Store

A Mocha + Selenium WebDriver test suite (with optional Cucumber BDD) that automates common user flows on `https://automationteststore.com/` using a Page Object Model (POM) approach and generates Mochawesome HTML reports.

### Contents
- Project structure
- Setup and prerequisites
- Configuration
- How to run (Mocha and Cucumber)
- Scenarios covered
- Test design and approach (POM, waits, selectors, reporting)
- Reports
- Troubleshooting and tips

## Project structure

```
selenium-task4/
  config/
    config.js                 # baseUrl and credentials
  features/
    dove_add_to_cart.feature  # BDD feature example
  pages/                      # Page Objects
    BrandPage.js
    CartPage.js
    HomePage.js
    ProductPage.js
    categoryPage.js
    loginPage.js
    productDetailPage.js
    productListPage.js
    productListingPage.js
    ProductPage.js
    skincarePage.js
  reports/                    # Mochawesome output (HTML/JSON)
  step_definitions/
    dove.steps.js             # BDD steps for the feature
  support/
    world.js                  # Cucumber world (driver binding)
  tests/                      # Mocha tests (Scenarios 1–4)
    scenario.test.js
    scenario2.test.js
    scenario3.test.js
    scenario4.test.js
  utils/
    driver.js                 # Selenium driver factory/options
    wait.js                   # Simple async delay helper
  cucumber.js                 # Cucumber runner config
  package.json                # Scripts and dependencies
```

## Setup and prerequisites

- Node.js 18+ recommended (tested with Node 22)
- Google Chrome installed
- Windows PowerShell or any terminal

Install dependencies:

```bash
cd selenium-task4
npm install
```

## Configuration

Edit `config/config.js` to set your test base URL and credentials:

```js
module.exports = {
  baseUrl: "https://automationteststore.com/",
  username: "<your-username>",
  password: "<your-password>",
};
```

Credentials must be valid on the target site for the login scenarios.

## How to run

### Run with Mocha (Mochawesome reports)

- Run all tests:
```bash
npm test
```

- Run a specific scenario:
```bash
npm run test1   # runs tests/scenario.test.js (Scenario 1)
npm run test2   # runs tests/scenario2.test.js (Scenario 2)
npm run test3   # runs tests/scenario3.test.js (Scenario 3)
npm run test4   # runs tests/scenario4.test.js (Scenario 4)
```

Reports are saved under `reports/` (see Reports section).

### Run with Cucumber (BDD)

```bash
npm run bdd
```

The BDD flow uses `features/dove_add_to_cart.feature` with steps in `step_definitions/dove.steps.js`.

## Scenarios covered

- Scenario 1 (`tests/scenario.test.js`)
  - Login, navigate Home → Brands, open Dove, sort by newest, add first item to cart, open cart.

- Scenario 2 (`tests/scenario2.test.js`)
  - Login, Apparel → T‑shirts (sort low→high) add product, Apparel → Shoes (sort high→low) add product with quantity/size, verify via cart navigation.

- Scenario 3 (`tests/scenario3.test.js`)
  - Login, navigate to a category (Skincare), scroll, scan product cards and log:
    - Whether items are on sale
    - Whether items are out of stock
    - If “Add to Cart” button is present (without clicking to avoid DOM churn)

- Scenario 4 (`tests/scenario4.test.js`)
  - Login, go to Men category, find products whose names end with "M" and if in stock, add to cart (logs results).

- BDD Feature (`features/dove_add_to_cart.feature`)
  - End‑to‑end: Login → select Dove brand item → add to cart.

## Test design and approach

- Page Object Model (POM)
  - Each page has a dedicated class in `pages/` encapsulating locators and actions.
  - Example: `HomePage` exposes `goHome()` and `scrollToBrands()`; `BrandPage` exposes `clickDoveBrand()` and `sortByNewest()`; `ProductPage` and `CartPage` wrap product/cart actions.

- WebDriver setup
  - `utils/driver.js` builds a Chrome driver with stability options and timeouts. Selenium Manager resolves ChromeDriver automatically.
  - If you need headless runs (e.g., CI), add `--headless=new` to the Chrome options in `utils/driver.js`.

- Wait strategy
  - Prefer explicit waits with `until.elementLocated` and `until.elementIsVisible` where appropriate (see `BrandPage`, `ProductPage`, `CartPage`, `productListingPage`).
  - Short `sleep` delays are used sparingly to allow UI transitions; replace with explicit waits when element invariants are available.

- Selectors
  - Uses a mix of `By.css` and `By.xpath` depending on element structure and dynamic attributes.
  - Normalized text matching is used for robust status checks (e.g., Out of Stock).

- Reporting
  - Mocha runs use `mochawesome` and produce both JSON and HTML reports.

## Reports

- Default all-tests report:
  - HTML: `reports/index.html`
  - JSON: `reports/index.json`

- Per‑scenario scripts output to `reports/scenario2.html` and `reports/scenario2.json` (script names reuse the same filename for simplicity).

Open the HTML file(s) in a browser after a run.

