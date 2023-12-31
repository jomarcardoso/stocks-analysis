/** @typedef {import('./browser.mjs').Browser} Browser */
/** @typedef {import('./website.mjs').Website} Website */

export async function getChromeTab() {
  const tabs = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  return tabs[0];
}

/**
 *
 * @param {() => void} func
 */
export async function executeChromeScript(func) {
  const tab = await getChromeTab();

  const ran = await chrome.scripting.executeScript({
    target: {
      tabId: tab.id,
    },
    func,
  });

  return ran[0].result;
}

/**
 * @type {Object<Browser, Function>}
 */
export const EXECUTE_SCRIPTS = {
  /**
   * @returns {Promise<Website>}
   */
  chrome: executeChromeScript,
  firefox: () => {},
};
