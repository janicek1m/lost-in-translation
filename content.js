chrome.storage.sync.get(["englishDictionary", "translatedDictionary"], function(result) {
    var theAPIKey = "AIzaSyBttL3_rUfMaP8vZQazT8bCd5XhHkmR4lA";
    var englishDictionary = result.englishDictionary;
    var translatedDictionary = result.translatedDictionary;

    var elements = document.getElementsByTagName('*');

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        for (var k = 0; k < englishDictionary.length; k++) {
            for (var j = 0; j < element.childNodes.length; j++) {
                var node = element.childNodes[j];
                if (node.nodeType === 3) {
                    var text = node.nodeValue;
                    var searchWord = new RegExp('\\b' + englishDictionary[k] + '\\b', "gi");
                    var replacedText = text.replace(searchWord, translatedDictionary[k]);
                    // if (replacedText == null || replacedText == "") {
                    //     element.replaceChild(document.createTextNode(replacedText), englishDictionary[k]);
                    // }
                    // translatedDictionary[k] = englishDictionary[k];
                    if (replacedText !== text) {
                        element.replaceChild(document.createTextNode(replacedText), node);
                    }

                }
            }
        }
    }
    console.log(translatedDictionary);
    console.log(englishDictionary);
});