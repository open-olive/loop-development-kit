document.addEventListener('selectionchange', () => {
  let selection = window.getSelection().toString();
  if (selection.length) {
    browser.runtime.sendMessage({
      message: 'TextSelection',
      data: selection,
    });
  }
});
