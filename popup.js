getWordsFromStorage()

async function getWordsFromStorage() {
    window.words = (await chrome.storage.local.get(["words"])).words
}

function selectWord(wordList) {
    // TODO: select with cryptographically acceptable randomness
    return wordList[Math.floor(Math.random() * wordList.length)];
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

document.getElementById("generatePassword").addEventListener("click", async function (e) {
    const numberOfWords = parseInt(document.getElementById("numberOfWords").value);
    const capitalizeWords = document.getElementById('capitalizeWords').checked;
    const dashesBetweenWords = document.getElementById('dashesBetweenWords').checked;
    const words = window.words

    let allSelectedWords = ""
    for (let i = 0; i < numberOfWords; i++) {
        let selectedWord = selectWord(words)
        if (capitalizeWords) {
            selectedWord = capitalize(selectedWord)
        }
        if (dashesBetweenWords && i > 0) {
            selectedWord = `-${selectedWord}`
        }
        allSelectedWords += selectedWord
    }
    document.getElementById("generatedPassword").innerHTML = allSelectedWords
})

document.getElementById("copyToClipboard").addEventListener("click", function (e) {
    const text = document.getElementById("generatedPassword").innerHTML
    navigator.clipboard.writeText(text);
})
