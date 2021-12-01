
function disco() {
    let background = document.querySelector('body');

    if (background.style.backgroundColor === 'red'){
        background.style.backgroundColor = 'blue';
    } else if (background.style.backgroundColor === 'blue'){
        background.style.backgroundColor = 'green';
    } else {
        background.style.backgroundColor = 'red';
    }
}

setInterval(disco, 1000);