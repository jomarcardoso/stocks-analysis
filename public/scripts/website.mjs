/** @typedef {'statusInvest'|'investidor10'} Website */
/** @typedef {import('./browser.mjs').Browser} Browser */

import { getChromeTab } from './extension.mjs';

/**
 * @type {Object<Browser, Function>}
 */
const GET_WEBSITES = {
  /**
   * @returns {Promise<Website>}
   */
  chrome: async () => {
    const tab = await getChromeTab();

    if (tab.url?.includes('statusinvest.com.br')) {
      return 'statusInvest';
    }

    return 'investidor10';
  },
  firefox: () => {},
};

/**
 * @param {Browser} browser
 * @returns {Promise<Website>}
 */
export async function getWebsite(browser) {
  return GET_WEBSITES[browser]();
}
