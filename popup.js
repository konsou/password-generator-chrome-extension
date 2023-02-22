
function selectWord(wordList) {
    // TODO: select with cryptographically acceptable randomness
    return wordList[Math.floor(Math.random() * wordList.length)];
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


document.getElementById("generatePassword").addEventListener("click", function (e) {
    console.log("click")
    const numberOfWords = parseInt(document.getElementById("numberOfWords").value);

    chrome.storage.local.get(["words"]).then((result) => {
        const words = result.words
        let allWords = ""
        for (let i = 0; i < numberOfWords; i++) {
            allWords += capitalize(selectWord(words))
        }
        document.getElementById("generatedPassword").innerHTML = allWords
    });

})