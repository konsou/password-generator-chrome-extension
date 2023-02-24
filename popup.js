const DEFAULT_NUMBER_OF_WORDS = 4
let words = []

window.addEventListener("load", async function () {
    updateOptionsFromStorage()
    getWordsFromBackground()
})

async function getWordsFromBackground() {
    words = (await chrome.runtime.sendMessage({getWords: true})).words;
    document.getElementById("generatePassword").disabled = false
}

async function updateOptionsFromStorage() {
    const options = await chrome.storage.sync.get(["numberOfWords"])

    const numberOfWordsElement = document.getElementById("numberOfWords")
    numberOfWordsElement.value =
        options.numberOfWords
            ? options.numberOfWords
            : DEFAULT_NUMBER_OF_WORDS
    numberOfWordsElement.disabled = false
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

document.getElementById("numberOfWords").addEventListener("change", saveChangedOption)
document.getElementById("numberOfWords").addEventListener("keyup", saveChangedOption)

async function saveChangedOption(e) {
    const storageKey = e.target.id.toString()
    const value = e.target.value
    const storageObject = {}
    storageObject[storageKey] = value
    await chrome.storage.sync.set(storageObject)
}
