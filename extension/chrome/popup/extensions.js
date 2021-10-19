document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('oh-link').addEventListener('click', function () {
    chrome.tabs.create({ url: 'chrome://extensions' });
  });
});
