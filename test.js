console.log("JOU")

fetch("words/kotus-sanalista.json")
    .then(Response => Response.json())
    .then(data => {
        localStorage.setItem("words", data)
        console.log("words loaded");
    });