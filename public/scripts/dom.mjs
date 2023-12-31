import { EXECUTE_SCRIPTS } from './extension.mjs';

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
