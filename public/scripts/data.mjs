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

function calculateLPA(availableStocks, netProfits = []) {
  return (
    ((netProfits?.[0] || 0) +
      (netProfits?.[1] || 0) +
      (netProfits?.[2] || 0) +
      (netProfits?.[3] || 0)) /
    availableStocks
  );
}

function calculateLastLPA(availableStocks, lastProfit = 0) {
  return ((lastProfit || 0) * 4) / availableStocks;
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
  const lastLPA = calculateLastLPA(availableStocks, netProfits[0]);
  const pl = calculatePL(lpa, price);
  const previewPL = calculatePL(lastLPA, price);

  console.log(availableStocks, netProfits);

  return {
    ticker,
    name,
    logoUrl,
    availableStocks,
    netProfits,
    lpa,
    price,
    pl,
    previewPL,
  };
}
