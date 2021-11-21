

let mapImage;
let contexts = [];

initializePuzzle();

let map = L.map('map').setView([53.430127, 14.564802], 18);
L.tileLayer.provider('Esri.WorldImagery').addTo(map);

document.getElementById("saveButton").addEventListener("click", function() {
    leafletImage(map, function (err, canvas) {
        mapImage = canvas;
        draw();
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
    }
    for (let i=0; i < 8; i++){
        contexts[i+8].drawImage(mapImage, i*155+11, 11, 148, 98);
    }
}