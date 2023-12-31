/** @typedef {import('./browser.mjs').Browser} Browser */
/** @typedef {import('./website.mjs').Website} Website */

import {
  getAvailableStocks,
  getLogoUrl,
  getName,
  getNetProfits,
  getPrice,
  getTicker,
} from './dom.mjs';

function calculateLPA(availableStocks, netProfits) {
  return (
    (netProfits[0] + netProfits[1] + netProfits[2] + netProfits[3]) /
    availableStocks
  );
}

function calculatePL(lpa, price) {
  return price / lpa;
}

/**
 * @param {Browser} browser
 * @param {Website} website
 */
export async function getData(browser, website) {
  const ticker = await getTicker(browser, website);
  const name = await getName(browser, website);
  const logoUrl = await getLogoUrl(browser, website);
  const availableStocks = await getAvailableStocks(browser, website);
  const price = await getPrice(browser, website);
  const netProfits = await getNetProfits(browser, website);
  const lpa = calculateLPA(availableStocks, netProfits);
  const pl = calculatePL(lpa, price);

  return {
    ticker,
    name,
    logoUrl,
    availableStocks,
    netProfits,
    lpa,
    price,
    pl,
  };
}
