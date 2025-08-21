const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function createDriver() {
  let options = new chrome.Options();
  
  // Add Chrome options for better stability and compatibility
  options.addArguments("--no-sandbox");
  options.addArguments("--disable-dev-shm-usage");
  options.addArguments("--disable-gpu");
  options.addArguments("--disable-extensions");
  options.addArguments("--disable-web-security");
  options.addArguments("--allow-running-insecure-content");
  options.addArguments("--disable-blink-features=AutomationControlled");
  options.addArguments("--disable-infobars");
  options.addArguments("--start-maximized");
  options.addArguments("--remote-debugging-port=0");
  options.addArguments("--disable-background-timer-throttling");
  options.addArguments("--disable-backgrounding-occluded-windows");
  options.addArguments("--disable-renderer-backgrounding");
  
  // Set user agent to avoid detection
  options.addArguments("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36");

  try {
    let driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    // Set window size to full screen
    await driver.manage().window().setRect({ x: 0, y: 0, width: 1920, height: 1080 });
    
    // Set page load timeout
    await driver.manage().setTimeouts({ pageLoad: 30000, implicit: 10000 });
    
    return driver;
  } catch (error) {
    console.error("Failed to create driver:", error.message);
    throw error;
  }
}

module.exports = { createDriver };
