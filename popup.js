let easyMode = document.getElementById('easyMode');
var theAPIKey = "AIzaSyBttL3_rUfMaP8vZQazT8bCd5XhHkmR4lA";

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

var translatedWord = "";

function addToDictionary(input) {
    let englishWord = input.value;
    chrome.storage.sync.get(["englishDictionary", "translatedDictionary"], function(result) {
        result.englishDictionary.push(englishWord);
        let tempEnglishDictionary = result.englishDictionary;
        let tempTranslatedDictionary = result.translatedDictionary;
        translation(englishWord, tempTranslatedDictionary.length);
        function translation(word, num) {
            var baseUrl = "https://translation.googleapis.com/language/translate/v2"
            var content = {
                'q': word + " " + num,
                //es = spanish, fr = french, etc.
                'target': "es"
            };
        
            ajaxRequest("POST", baseUrl + "?key=" + theAPIKey, handleTranslationResponse, JSON.stringify(content));
        }
        
        
        function handleTranslationResponse() {
            /**/
            if (successfulRequest(this)) {
                var response_json = JSON.parse(this.responseText);
                var tempText = response_json["data"]["translations"][0].translatedText;
                /*This is where you got the response with the "OK" status so you can go ahead and parse this.responseText*/
                var words = tempText.split(" ");
                console.log(words);
                tempTranslatedDictionary[+words[1]] = words[0];
                console.log(tempTranslatedDictionary);
                //console.log(tempTranslatedDictionary);
                chrome.storage.sync.remove('translatedDictionary', function() {
                    console.log("removed");
                });
                chrome.storage.sync.set({ 'translatedDictionary': tempTranslatedDictionary }, function() {
                    console.log(tempTranslatedDictionary);
                    console.log('updated translated dictionary');
                });
            }
        
        }
        // console.log(translatedArray);
        
        function ajaxRequest(method, url, handlerFunction, content) {
            var xhttp = new XMLHttpRequest();
            xhttp.open(method, url);
            xhttp.onreadystatechange = handlerFunction;
            if (method == "POST") {
                xhttp.send(content);
            } else {
                xhttp.send();
            }
        }
        
        /*Helper function: checks if the response to the request is ready to process*/
        function successfulRequest(request) {
            return request.readyState === 4 && request.status == 200;
        }

        chrome.storage.sync.remove('englishDictionary', function() {
            console.log("removed");
        });
        chrome.storage.sync.set({ 'englishDictionary': tempEnglishDictionary }, function() {
            console.log('updated english dictionary');
        });
        /*
        chrome.storage.sync.remove('translatedDictionary', function() {
            console.log("removed");
        });
        chrome.storage.sync.set({ 'translatedDictionary': tempDict2 }, function() {
            console.log('updated translated dictionary');
        });
        */
    });
    var okButton = document.getElementById("ok_btn");
    okButton.setAttribute("disabled", "true");
    okButton.style.backgroundColor = "#C0c3BE";
}

function documentEvents() {
    document.getElementById("ok_btn").addEventListener('click', function() {
        addToDictionary(document.getElementById('word_textbox'));
    });
}
