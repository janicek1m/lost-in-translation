var elements = document.getElementsByTagName('*');

let spanishDictionary = ["que", "en", "porque", "despues"];
let englishDictionary = ["that", "in", "why", "after"];

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    for(var k = 0; k < englishDictionary.length; k++) {
        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];

            if (node.nodeType === 3) {
                var text = node.nodeValue;

                var searchWord = new RegExp(englishDictionary[k], "gi");
                var replacedText = text.replace(searchWord, spanishDictionary[k]);
                if (replacedText !== text) {
                    element.replaceChild(document.createTextNode(replacedText), node);
                }
            }
        }
    }
}
