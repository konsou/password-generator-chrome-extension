function selectWord(wordList) {
    // TODO: select with cryptographically acceptable randomness
    return wordList[Math.floor(Math.random() * wordList.length)];
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

document.getElementById("generatePassword").addEventListener("click", async function (e) {
    console.log("click")
    const numberOfWords = parseInt(document.getElementById("numberOfWords").value);
    const capitalizeWords = document.getElementById('capitalizeWords').checked;
    const dashesBetweenWords = document.getElementById('dashesBetweenWords').checked;
    const words = (await chrome.storage.local.get(["words"])).words;

    console.log(`using ${words.length} words`)

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