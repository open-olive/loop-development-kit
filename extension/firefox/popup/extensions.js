document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('oh-link').addEventListener('click', function () {
    browser.tabs.create({ url: 'about:addons' });
  });

  document.getElementById('about').addEventListener('click', function () {
    browser.tabs.create({ url: 'https://oliveai.com/' });
  });

  document.getElementById('close').addEventListener('click', function () {
    window.close();
  });
});
