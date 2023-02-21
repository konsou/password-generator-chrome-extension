console.log("JOU")

// TODO: do this in background worker
fetch("words/kotus-sanalista.json")
    .then(Response => Response.json())
    .then(data => {
        localStorage.setItem("words", JSON.stringify(data))
        console.log("words loaded");
    });

document.getElementById("generatePassword").addEventListener("click", function (e){
    console.log("click")
    const words = JSON.parse(localStorage.getItem("words"))
    console.log(words)
    const selectedWord  = words[Math.floor(Math.random() * words.length)];
    document.getElementById("generatedPassword").value = selectedWord
})