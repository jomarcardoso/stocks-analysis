/** @typedef {'chrome'|'firefox'} Browser */

/**
 * @returns {Browser}
 */
export function getBrowser() {
  if (navigator.userAgent.includes('Firefox/')) {
    return 'firefox';
  }

  return 'chrome';
}
