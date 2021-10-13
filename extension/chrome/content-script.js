document.addEventListener('selectionchange', () => {
  let selection = window.getSelection().toString();
  if (selection.length) {
    chrome.runtime.sendMessage({
      message: 'TextSelection',
      data: selection,
    });
  }
});
