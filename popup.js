let easyMode = document.getElementById('easyMode');

function runEasyMode() {
    chrome.tabs.executeScript({
        file: 'content.js'
    });
}

document.getElementById('easyMode').addEventListener('click', runEasyMode);