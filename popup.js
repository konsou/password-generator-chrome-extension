const NUMBER_OF_WORDS = 4

function selectWord(wordList) {
    // TODO: select with cryptographically acceptable randomness
    return wordList[Math.floor(Math.random() * wordList.length)];
}


document.getElementById("generatePassword").addEventListener("click", function (e) {
    console.log("click")
    chrome.storage.local.get(["words"]).then((result) => {
        const words = result.words
        let allWords = ""
        for (let i = 0; i < NUMBER_OF_WORDS; i++) {
            allWords += selectWord(words)
        }
        document.getElementById("generatedPassword").value = allWords
    });

})