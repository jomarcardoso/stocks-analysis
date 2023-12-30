import { getBrowser } from './browser.mjs';
import { getSiteByBrowser } from './page.mjs';

function start() {
  const browser = getBrowser();
  const site = getSiteByBrowser(browser);

  console.log(site);
}

start();
