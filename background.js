chrome.runtime.onInstalled.addListener(() => {
    fetch("words/kotus-sanalista-yhdistetty.json")
        .then(Response => Response.json())
        .then(data => {
            chrome.storage.local.set({"words": data})
                .then(() => {
                    console.log(data.length + " words loaded");
                });
        });
});