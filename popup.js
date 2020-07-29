let easyMode = document.getElementById('easyMode');

function runEasyMode() {
    chrome.tabs.executeScript({
        file: 'content.js'
    });
    var button = document.getElementById('easyMode');
    button.setAttribute("disabled", "true");
    button.style.backgroundColor = "#A3EA67";
}

document.getElementById('easyMode').addEventListener('click', runEasyMode);

document.addEventListener('DOMContentLoaded', documentEvents, false);

function addToDictionary(input) {
    let words = input.value.split(" ");
    if(words.length == 2) {
        chrome.storage.sync.get(["englishDictionary", "spanishDictionary"], function(result) {
            result.englishDictionary.push(words[0]);
            result.spanishDictionary.push(words[1]);
            let tempDict = result.englishDictionary;
            let tempDict2 = result.spanishDictionary;
            chrome.storage.sync.remove('englishDictionary', function() {
                console.log("removed");
            });
            chrome.storage.sync.set({'englishDictionary': tempDict}, function() {
                console.log('updated english dictionary');
            });
            chrome.storage.sync.remove('spanishDictionary', function() {
                console.log("removed");
            });
            chrome.storage.sync.set({'spanishDictionary': tempDict2}, function() {
                console.log('updated spanish dictionary');
            });
        });
        var okButton = document.getElementById("ok_btn");
        okButton.setAttribute("disabled", "true");
        okButton.style.backgroundColor = "#C0c3BE";
        /*
        chrome.storage.sync.get('englishDictionary', function(result) {
            result.englishDictionary.push(words[0]);
            let tempDict = result.englishDictionary;
            chrome.storage.sync.remove('englishDictionary', function() {
                console.log("removed");
            });
            chrome.storage.sync.set({'englishDictionary': tempDict}, function() {
                console.log("updated english dictionary");
            })
        });
        chrome.storage.sync.get('spanishDictionary', function(result) {
            result.spanishDictionary.push(words[0]);
            let tempDict = result.spanishDictionary;
            chrome.storage.sync.remove('spanishDictionary', function() {
                console.log("removed");
            });
            chrome.storage.sync.set({'spanishDictionary': tempDict}, function() {
                console.log("updated spanish dictionary");
            })
        });
        */
    }
}

function documentEvents() {
    document.getElementById("ok_btn").addEventListener('click', function() {
        addToDictionary(document.getElementById('word_textbox'));
    });
}
