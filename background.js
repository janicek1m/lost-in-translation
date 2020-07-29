chrome.runtime.onInstalled.addListener(function() {
    
    chrome.storage.sync.set ({
        spanishDictionary : ["que", "en", "por qué", "después", "de", "y", "con", "mi", "él", "su", //misc
                            "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", //numbers
                            "persona", "año", "camino", "día", "cosa", "hombre", "mundo", "vida", "mano", "parte",
                            "niño", "ojo", "mujer", "sitio", "trabajo", "semana", "caso", "punto", "gobierno",
                            "empresa", "número", "grupo", "problema", "hecho", "colegio", "habitación", "madre", "padre"], //nouns
        englishDictionary : ["than", "in", "why", "after", "of", "and", "with", "my", "him", "her", //misc 
                            "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", //numbers
                            "person", "year", "way", "day", "thing", "man", "world", "life", "hand", "part",
                            "child", "eye", "woman", "place", "work", "week", "case", "point", "govenrment",
                            "company", "number", "group", "problem", "fact","school", "room", "mother", "father"] //nouns
    }, function() {
        console.log("dictionaries set up")
    });
});