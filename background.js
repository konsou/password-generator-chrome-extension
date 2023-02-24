let words = []

chrome.runtime.onInstalled.addListener(async function () {
    const loadedWords = await fetch("words/kotus-sanalista-yhdistetty.json")
    words = await loadedWords.json()
    console.log(`${words.length} words loaded`)
});

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
        if (request.getWords) await sendResponse({"words": words});
    }
);