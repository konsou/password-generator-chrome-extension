let words = [];
loadWords();

async function loadWords() {
  const loadedWords = await fetch('words/kotus-sanalista-yhdistetty.json');
  words = await loadedWords.json();
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.getWords) await sendResponse({ words });
});
