import { getBrowser } from './browser.mjs';
import { getLogo } from './dom.mjs';
import { getWebsite } from './website.mjs';

async function start() {
  const browser = getBrowser();
  const website = await getWebsite(browser);

  getLogo(browser);

  // configPopup();

  console.log(browser, website);
}

start();
