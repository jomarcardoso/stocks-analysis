import { getBrowser } from './browser.mjs';
import { getData } from './data.mjs';
import {
  getAvailableStocks,
  getLogoUrl,
  getName,
  getNetProfits,
  getPrice,
  getTicker,
} from './dom.mjs';
import { render } from './render.mjs';
import { getWebsite } from './website.mjs';

async function start() {
  const browser = getBrowser();
  const website = await getWebsite(browser);
  const data = await getData(browser, website);

  render(data);
}

start();
