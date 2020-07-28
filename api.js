var elements = document.getElementsByTagName('*');

// let english = ["that", "in", "why", "after"];
// let spanish = ["que", "en", "porque", "despues"];

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            // for (var k = 0; k < english.length; k++) {
            var replacedText = text.replace(/that/gi, 'que');
            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
                // }
                // replaceText(english[k], spanish[k]);
            }
        }
    }
}

// function replaceText(english, spanish) {
//     var replacedText = text.replace(english gi, `${spanish}`);
//     if (replacedText !== text) {
//         element.replaceChild(document.createTextNode(replacedText), node);
//     }
// }