console.log("service worker started")

chrome.runtime.onInstalled.addListener(() => {
    console.log("onInstalled fired")
    // TODO: do this in background worker


    fetch("words/kotus-sanalista.json")
        .then(Response => Response.json())
        .then(data => {
            chrome.storage.local.set({"words": data}).then(() => {
                console.log(data.length + " words loaded");
            });
        });

});