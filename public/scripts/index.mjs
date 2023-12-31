import { getBrowser } from './browser.mjs';
import { getLogoUrl, getName, getTicker } from './dom.mjs';
import { getWebsite } from './website.mjs';

async function start() {
  const browser = getBrowser();
  const website = await getWebsite(browser);
  const logo = await getLogoUrl(browser);
  const ticker = await getTicker(browser);
  const name = await getName(browser);

  class Logo extends HTMLImageElement {
    connectedCallback() {
      this.setAttribute('src', logo);
      this.classList.add('border-2', 'border-gray-400');
    }
  }

  customElements.define('sa-logo', Logo, { extends: 'img' });

  class Ticker extends HTMLHeadingElement {
    connectedCallback() {
      this.innerHTML = ticker;
      this.classList.add(
        'font-mono',
        'text-3xl',
        'font-bold',
        'leading-none',
        'whitespace-nowrap',
      );
    }
  }

  customElements.define('sa-ticker', Ticker, { extends: 'h1' });

  class Name extends HTMLElement {
    connectedCallback() {
      this.innerHTML = name;
      this.classList.add('font-sans', 'text-lg');
    }
  }

  customElements.define('sa-name', Name);
}

start();
