document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('oh-link').addEventListener('click', function () {
    chrome.tabs.create({ url: 'chrome://extensions' });
  });

  document.getElementById('about').addEventListener('click', function () {
    chrome.tabs.create({ url: 'https://www.oliveai.dev' });
  });

  document.getElementById('close').addEventListener('click', function () {
    window.close();
  });
});
