import { EXECUTE_SCRIPTS } from './extension.mjs';

export async function loadPage(browser) {
  const result = EXECUTE_SCRIPTS[browser](() => {
    return new Promise((resolve) => {
      /** @type {HTMLElement} */
      const footer = document.querySelector('#main-footer');

      const originalPosition = document.scrollingElement.scrollTop;

      window.scrollTo({
        top: footer?.offsetTop ?? 99999,
      });

      setTimeout(() => {
        resolve();

        window.scrollTo({
          top: originalPosition,
        });
      }, 2000);
    });
  });

  return result;
}

export async function getLogoUrl(browser, website) {
  const logoUrl = await EXECUTE_SCRIPTS[browser](() => {
    var logoEl = document.querySelector('[title^="Logotipo da empresa"]');

    return logoEl
      .getAttribute('data-img')
      .replace('url(', 'https://statusinvest.com.br')
      .replace(/\)$/, '')
      .replace('/cover/', '/avatar/');
  });

  return logoUrl;
}

export async function getTicker(browser, website) {
  const ticker = await EXECUTE_SCRIPTS[browser](() => {
    var ticker = document.querySelector('a[title^="Detalhes do ticker"]');

    return ticker.textContent;
  });

  return ticker;
}

export async function getName(browser, website) {
  const name = await EXECUTE_SCRIPTS[browser](() => {
    var name = document.querySelector('h1 small');

    return name.textContent;
  });

  return name;
}

export async function getPrice(browser, website) {
  const price = await EXECUTE_SCRIPTS[browser](() => {
    var price = document.querySelector('[title="Valor atual do ativo"] strong');

    return Number(price.textContent.replace(',', '.'));
  });

  return price;
}

export async function getAvailableStocks(browser, website) {
  const availableStocks = await EXECUTE_SCRIPTS[browser](() => {
    var availableStocks = document.querySelector(
      '[title="Total de papéis disponíveis para negociação"] strong',
    );

    return Number(availableStocks.textContent.replace(/\./g, ''));
  });

  return availableStocks;
}

export async function getNetProfits(browser, website) {
  const netProfit = await EXECUTE_SCRIPTS[browser](() => {
    return new Promise((resolve) => {
      const select = document.querySelector(
        '[data-target="dropdown-dre-grid"]',
      );
      /** @type {HTMLAnchorElement} */
      const optionQuarter = document.querySelector(
        '#dropdown-dre-grid [data-type="1"]',
      );
      const table = document.querySelector('.table-info-body table');

      if (!optionQuarter) {
        return [];
      }

      function run() {
        const divs = Array.from(document.querySelectorAll('div'));
        const row = divs.find(
          (a) => a.textContent === 'Lucro atribuído a Controladora',
        ).parentElement.parentElement.parentElement.parentElement;

        return resolve(
          [
            row.querySelector('td:nth-child(2)')?.textContent,
            row.querySelector('td:nth-child(5)')?.textContent,
            row.querySelector('td:nth-child(8)')?.textContent,
            row.querySelector('td:nth-child(11)')?.textContent,
            row.querySelector('td:nth-child(14)')?.textContent,
            row.querySelector('td:nth-child(17)')?.textContent,
            row.querySelector('td:nth-child(20)')?.textContent,
            row.querySelector('td:nth-child(23)')?.textContent,
            row.querySelector('td:nth-child(26)')?.textContent,
            row.querySelector('td:nth-child(29)')?.textContent,
            row.querySelector('td:nth-child(32)')?.textContent,
            row.querySelector('td:nth-child(35)')?.textContent,
            row.querySelector('td:nth-child(38)')?.textContent,
            row.querySelector('td:nth-child(41)')?.textContent,
            row.querySelector('td:nth-child(44)')?.textContent,
            row.querySelector('td:nth-child(47)')?.textContent,
            row.querySelector('td:nth-child(50)')?.textContent,
          ]
            .filter((a) => !!a)
            .map((a) => {
              const isBilion = a.includes(' B');
              const isMilion = a.includes(' M');

              const number = Number(
                a
                  .replace(/B$/, '')
                  .replace(/M$/, '')
                  .replace(/\./g, '')
                  .replace(',', '.')
                  .trim(),
              );

              if (isMilion) {
                return number * 1000000;
              }

              if (isBilion) {
                return number * 1000000000;
              }

              return number;
            }),
        );
      }

      let timeout = 0;

      const mutation = new MutationObserver(() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          run();
        }, 2000);
      });

      mutation.observe(table, {
        subtree: true,
        childList: true,
        attributes: false,
      });

      if (!select.textContent.includes('TRIMESTRAL')) {
        optionQuarter.click();

        return;
      }

      run();
    });
  });

  return netProfit;
}
