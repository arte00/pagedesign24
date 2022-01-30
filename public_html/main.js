var styles = ['garden0.css', 'garden1.css', 'garden2.css'];
initialize();
function initialize() {
    styles.forEach(function (style) {
        var menu = document.getElementsByTagName('ul')[0];
        var newElement = document.createElement('li');
        newElement.innerText = style;
        newElement.addEventListener("click", function (e) { change(style); });
        menu.appendChild(newElement);
    });
}
function change(style) {
    var stylesheet = document.getElementsByTagName('link')[0];
    if (stylesheet.rel == 'stylesheet') {
        stylesheet.href = style;
    }
}
