var theAPIKey = "AIzaSyBttL3_rUfMaP8vZQazT8bCd5XhHkmR4lA";
var array = ["hi", "hello", "goodbye", "I am sad"];
var translatedArray = [];


// function translateArray(/x){
for (var i = 0; i < array.length; i++) {
    var temp = array[i].toString();
    translation(temp);
}


function translation(word) {
    var baseUrl = "https://translation.googleapis.com/language/translate/v2"
    var content = {
        'q': word,
        //es = spanish, fr = french, etc.
        'target': "fr"
    };

    ajaxRequest("POST", baseUrl + "?key=" + theAPIKey, handleTranslationResponse, JSON.stringify(content));
}


function handleTranslationResponse() {
    /**/
    if (successfulRequest(this)) {
        /*This is where you got the response with the "OK" status so you can go ahead and parse this.responseText*/
        var response_json = JSON.parse(this.responseText);
        var translated_text = "";
        response_json["data"]["translations"].forEach(function(element) {
            translated_text += element['translatedText'] + '\n';
            translatedArray.push(translated_text);
        });
        //fr = french, es = english , etc.
        // var target_lang = "fr";

        console.log(translatedArray);
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