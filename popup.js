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
