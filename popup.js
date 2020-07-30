let easyMode = document.getElementById('easyMode');

function runEasyMode() {
    chrome.tabs.executeScript({
        file: 'content.js'
    });
    var button = document.getElementById('easyMode');
    button.setAttribute("disabled", "true");
    button.style.backgroundColor = "#A3EA67";
    button.style.width = '20px';
    button.style.height = '20px';
}

document.getElementById('easyMode').addEventListener('click', runEasyMode);

document.addEventListener('DOMContentLoaded', documentEvents, false);

function addToDictionary(input) {
    let words = input.value.split(" ");
    if (words.length == 2) {
        chrome.storage.sync.get(["englishDictionary", "translatedDictionary"], function(result) {
            result.englishDictionary.push(words[0]);
            result.translatedDictionary.push(words[1]);
            let tempDict = result.englishDictionary;
            let tempDict2 = result.translatedDictionary;
            chrome.storage.sync.remove('englishDictionary', function() {
                console.log("removed");
            });
            chrome.storage.sync.set({ 'englishDictionary': tempDict }, function() {
                console.log('updated english dictionary');
            });
            chrome.storage.sync.remove('translatedDictionary', function() {
                console.log("removed");
            });
            chrome.storage.sync.set({ 'translatedDictionary': tempDict2 }, function() {
                console.log('updated translated dictionary');
            });
        });
        var okButton = document.getElementById("ok_btn");
        okButton.setAttribute("disabled", "true");
        okButton.style.backgroundColor = "#C0c3BE";
    }
}

function documentEvents() {
    document.getElementById("ok_btn").addEventListener('click', function() {
        addToDictionary(document.getElementById('word_textbox'));
    });
}
