document.addEventListener('selectionchange', () => {
  const domain = window.location.href;
  const selection = window.getSelection().toString();
  if (selection.length) {
    browser.runtime.sendMessage({
      message: 'TextSelection',
      data: selection,
      domain,
    });
  }
});
