console.log("JOU")


document.getElementById("generatePassword").addEventListener("click", function (e) {
    console.log("click")
    chrome.storage.local.get(["words"]).then((result) => {
        const words = result.words
        // TODO: select with cryptographically acceptable randomness
        const selectedWord = words[Math.floor(Math.random() * words.length)];
        document.getElementById("generatedPassword").value = selectedWord
    });

})