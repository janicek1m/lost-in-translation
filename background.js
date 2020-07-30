chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({
        englishDictionary: ["than", "is", "for", "very", "of", "and", "with", "my", "him", "her",
            "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
            "person", "year", "way", "day", "thing", "man", "world", "life", "hand", "part",
            "child", "eye", "woman", "place", "work", "week", "case", "point", "govenrment",
            "company", "number", "group", "problem", "fact", "school", "room", "mother", "father"
        ],
        translatedDictionary: []
    }, function() {
        console.log("dictionaries set up")
    });
    var theAPIKey = "AIzaSyBttL3_rUfMaP8vZQazT8bCd5XhHkmR4lA";
    chrome.storage.sync.get(['translatedDictionary', 'englishDictionary'], function(result) {
        console.log("test");
        /*
        var tempTranslatedDictionary = ["que", "en", "por qué", "después", "de", "y", "con", "mi", "él", "su", //misc
                                    "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", //numbers
                                    "persona", "año", "camino", "día", "cosa", "hombre", "mundo", "vida", "mano", "parte",
                                    "niño", "ojo", "mujer", "sitio", "trabajo", "semana", "caso", "punto", "gobierno",
                                    "empresa", "número", "grupo", "problema", "hecho", "colegio", "habitación", "madre", "padre"];
        */
        console.log(result.englishDictionary);
        var tempTranslatedDictionary = [];
        for (var i = 0; i < result.englishDictionary.length; i++) {
            var temp = result.englishDictionary[i].toString();
            translation(temp, i);
        }

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
            if (successfulRequest(this)) {
                //This is where you got the response with the "OK" status so you can go ahead and parse this.responseText
                var response_json = JSON.parse(this.responseText);
                var tempText = response_json["data"]["translations"][0].translatedText;
                //console.log(tempText);
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
            //console.log(tempTranslatedDictionary);
        }


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

        //Helper function: checks if the response to the request is ready to process
        function successfulRequest(request) {
            return request.readyState === 4 && request.status == 200;
        }

        //console.log(tempTranslatedDictionary);
    });
});