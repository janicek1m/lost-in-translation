let spanishDictionary = ["que", "en", "por qué", "después", "de", "y", "con", "mi", "él", "su", //misc
                         "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", //numbers
                         "persona", "año", "camino", "día", "cosa", "hombre", "mundo", "vida", "mano", "parte",
                         "niño", "ojo", "mujer", "sitio", "trabajo", "semana", "caso", "punto", "gobierno",
                         "empresa", "número", "grupo", "problema", "hecho", "colegio", "habitación", "madre", "padre"]; //nouns
let englishDictionary = ["than", "in", "why", "after", "of", "and", "with", "my", "him", "her", //misc 
                         "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", //numbers
                         "person", "year", "way", "day", "thing", "man", "world", "life", "hand", "part",
                         "child", "eye", "woman", "place", "work", "week", "case", "point", "govenrment",
                         "company", "number", "group", "problem", "fact","school", "room", "mother", "father"]; //nouns

var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    for(var k = 0; k < englishDictionary.length; k++) {
        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];
            if (node.nodeType === 3) {
                var text = node.nodeValue;
                var searchWord = new RegExp('\\b' + englishDictionary[k] + '\\b', "gi");
                var replacedText = text.replace(searchWord, spanishDictionary[k]);
                if (replacedText !== text) {
                    element.replaceChild(document.createTextNode(replacedText), node);
                }
            }
        }
    }
}

/* stuff to add words to the array via user input (doesn't store it permanently tho)
document.addEventListener('DOMContentLoaded', documentEvents, false);

function addToDictionary(input) {
    let words = input.value.split(" ");
    if(words.length == 2) {
        englishDictionary.push(words[0]);
        spanishDictionary.push(words[1]);
    }
}

function documentEvents() {
    document.getElementById("ok_btn").addEventListener('click', function() {
        addToDictionary(document.getElementById('word_textbox'));
    });
}
*/
