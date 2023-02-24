getWordsFromStorage()

async function getWordsFromStorage() {
    window.words = (await chrome.storage.local.get(["words"])).words
}

function selectWord(wordList) {
    const index = getRandomNumberInRange(0, wordList.length);
    return wordList[index];
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomNumberInRange(min, max) {
    const crypto = window.crypto; // Get the crypto object
    const array = new Uint32Array(1); // Create an array to hold the random value
    crypto.getRandomValues(array); // Fill the array with cryptographically random values
    const randomNumber = array[0] / (0xffffffff + 1); // Convert the value to a float between 0 and 1
    return Math.floor(randomNumber * (max - min + 1) + min); // Scale the float to the range and return an integer
}

document.getElementById("generatePassword").addEventListener("click", async function (e) {
    const numberOfWords = parseInt(document.getElementById("numberOfWords").value);
    const capitalizeWords = document.getElementById('capitalizeWords').checked;
    const dashesBetweenWords = document.getElementById('dashesBetweenWords').checked;
    const includeNumber = document.getElementById('includeNumber').checked;
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
        if (includeNumber && i === numberOfWords - 1) {
            selectedWord = `${selectedWord}${getRandomNumberInRange(0, 9)}`
        }
        allSelectedWords += selectedWord
    }
    document.getElementById("generatedPassword").innerHTML = allSelectedWords
})

document.getElementById("copyToClipboard").addEventListener("click", function (e) {
    const text = document.getElementById("generatedPassword").innerHTML
    navigator.clipboard.writeText(text);
})
