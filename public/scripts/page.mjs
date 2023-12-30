/** @typedef {'statusInvest'|'investidor10'} Site */
/** @typedef {import('./browser.mjs').Browser} Browser */

/**
 * @type {}
 */
const GET_SITES = {
  chrome: () => {
    console.log(chrome, window);
  },
  firefox: () => {},
};

/**
 * @param {Browser} browser
 * @returns {Site}
 */
export function getSiteByBrowser(browser) {
  return GET_SITES[browser]();
}
