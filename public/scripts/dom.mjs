import { EXECUTE_SCRIPTS } from './extension.mjs';

export async function getLogo(browser, website) {
  console.log(browser);

  const oi = await EXECUTE_SCRIPTS[browser](() => {
    var logoEl = document.querySelector('[title^="Logotipo da empresa"]');

    return logoEl
      .getAttribute('data-img')
      .replace('url(', 'https://statusinvest.com.br')
      .replace(/\)$/, '');
  });

  document.body.insertAdjacentHTML('afterbegin', `<img src="${oi}">`);
}
