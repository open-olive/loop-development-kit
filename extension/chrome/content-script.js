document.addEventListener('selectionchange', () => {
  let selection = window.getSelection().toString();
  if (selection.length) {
    chrome.extension.sendRequest(
      {
        message: 'TextSelection',
        data: selection,
      },
      (response) => {},
    );
  }
});
