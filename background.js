async function loadWordsToStorage() {
    const words = await fetch("words/kotus-sanalista-yhdistetty.json")
    const wordsJson = await words.json()
    await chrome.storage.local.set({"words": wordsJson})
    console.log(wordsJson.length + " words loaded");
}

chrome.runtime.onInstalled.addListener(() => {
    loadWordsToStorage()
});