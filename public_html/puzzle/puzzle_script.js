

let mapImage;
let contexts = [];

initializePuzzle();

let map = L.map('map').setView([53.430127, 14.564802], 18);
L.tileLayer.provider('Esri.WorldImagery').addTo(map);

document.getElementById("saveButton").addEventListener("click", function() {
    leafletImage(map, function (err, canvas) {
        mapImage = canvas;
        cut();
    });
});

document.getElementById("getLocation").addEventListener("click", function(event) {
    if (! navigator.geolocation) {
        console.log("No geolocation.");
    }

    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        map.setView([lat, lon]);
    }, positionError => {
        console.error(positionError);
    });
});


function initializePuzzle(){

    for(let i=0; i < 8; i++){
        let canvas = document.getElementById("rasterMap1");
        let context = canvas.getContext("2d");
        contexts.push(context);
        context.strokeRect(i*155+10, 10, 150, 100);
    }
    for(let i=0; i < 8; i++){
        let canvas = document.getElementById("rasterMap2");
        let context = canvas.getContext("2d");
        contexts.push(context);
        context.strokeRect(i*155+10, 10, 150, 100);
    }
}

function draw(){

    for (let i=0; i < 8; i++){
        contexts[i].drawImage(mapImage, i*155+11, 11, 148, 98);
        // context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
        // contexts[i].drawImage(mapImage, )
    }
    for (let i=0; i < 8; i++){
        contexts[i+8].drawImage(mapImage, i*155+11, 11, 148, 98);
    }
}

function cut(){
    let pieces = [{col: 0, row: 0}, {col: 1, row: 0}, {col: 2, row: 0}, {col: 3, row: 0},
            {col: 4, row: 0}, {col: 5, row: 0},{col: 6, row: 0}, {col: 7, row: 0},
            {col: 1, row: 1}, {col: 2, row: 1}, {col: 3, row: 1}, {col: 4, row: 1},
            {col: 5, row: 1}, {col: 6, row: 1}, {col: 7, row: 1}, {col: 8, row: 1}];

    let g=0;
    let p=pieces[g];
    for (let i=0; i < 8; i++){
        contexts[i].drawImage(mapImage, i*148+11, 11, 148, 98, p.col*148, p.row*98, 148, 98);
        g++;
    }
    for (let i=0; i < 8; i++){
        contexts[i+8].drawImage(mapImage, i*148+11, 11, 148, 98, p.col*148, p.row*98, 148, 98);
        g++;
    }
    console.log(g);

}