function openDRE() {
  const timeEl = document.querySelector('#dropdown-dre-grid');


}

function getTabId() { ... }

chrome.scripting
    .executeScript({
      target : {tabId : getTabId()},
      func:
    })
    .then(() => console.log("script injected"));