function formatNumberToBRL(number = 0) {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(number);
}

function createLogo(logoUrl = '') {
  class Logo extends HTMLImageElement {
    connectedCallback() {
      this.setAttribute('src', logoUrl);
      this.classList.add('border-2', 'border-gray-400');
    }
  }

  customElements.define('sa-logo', Logo, { extends: 'img' });
}

function createTicker(ticker = '') {
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
}

function createName(name = '') {
  class Name extends HTMLElement {
    connectedCallback() {
      this.innerHTML = name;
      this.classList.add('font-sans', 'text-lg');
    }
  }

  customElements.define('sa-name', Name);
}

function createPrice(price = 0) {
  const brlPrice = formatNumberToBRL(price);

  class SaPrice extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `\
        <div>
          <p class="font-sans text-4xl">
            ${brlPrice}
          </p>
        </div>
      `.trim();
    }
  }

  customElements.define('sa-price', SaPrice);
}

function renderPL(pl = 0) {
  const el = document.querySelector('#value-pl');

  el.innerHTML = pl.toFixed(2);
}

export function render({ logoUrl, ticker, name, price, pl }) {
  createLogo(logoUrl);
  createTicker(ticker);
  createName(name);
  createPrice(price);
  renderPL(pl);
}
