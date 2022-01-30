const styles = ['garden0.css', 'garden1.css', 'garden2.css'];

initialize();

function initialize(){

    styles.forEach(style => {
        var menu = document.getElementsByTagName('ul')[0];
        var newElement = document.createElement('li');
        newElement.innerText = style;
        newElement.addEventListener("click", (e: Event) => {change(style)});
        menu.appendChild(newElement);
    })

}

function change(style: string){

    var stylesheet = document.getElementsByTagName('link')[0] as any;
    if(stylesheet.rel == 'stylesheet'){
        stylesheet.href = style;
    }

}