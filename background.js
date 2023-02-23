chrome.runtime.onInstalled.addListener(() => {
    fetch("words/kotus-finnish-dialect-dictionary/kotus-sanalista-murre.json")
        .then(Response => Response.json())
        .then(data => {
            chrome.storage.local.set({"wordsDialect": data})
                .then(() => {
                    console.log(data.length + " dialect words loaded");
                });
        });
    fetch("words/kotus-finnish-dictionary/kotus-sanalista.json")
        .then(Response => Response.json())
        .then(data => {
            chrome.storage.local.set({"wordsRegular": data})
                .then(() => {
                    console.log(data.length + " words loaded");
                });
        });
});