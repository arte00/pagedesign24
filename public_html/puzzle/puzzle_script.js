

// VARIABLES

let map = L.map('map').setView([53.447128059846925, 14.491943800867846], 18);
L.tileLayer.provider('Esri.WorldImagery').addTo(map);
let puzzleInfo;
let correct = 0;
let mapSaved = 0;

// BUTTONS

document.getElementById("saveButton").addEventListener("click", function() {
    leafletImage(map, function (err, canvas) {
        if (mapSaved <= 0){
            mapSaved++;
            onSaveButton(canvas);
        } else {
            clear();
            onSaveButton(canvas)
        }
    });
});

document.getElementById("getLocation").addEventListener("click", function(event) {
    if (! navigator.geolocation) {
        console.log("No geolocation.");
    }

    navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        map.setView([lat, lon]);
    }, positionError => {
        console.error(positionError);
    });
});

// INITIALIZE GAME STATE

function initializePuzzle(){
    for (let i=0; i < 16; i++){
        let name = puzzleInfo[i].canvasName;
        if (i < 8){
            addCanvasToRow("firstRow", name);
        } else {
            addCanvasToRow("secondRow", name);
        }
        makeDraggable(name);
    }
}

function shuffle(slicedImage){
    let divs = ["div0", "div1", "div2", "div3", "div4", "div5", "div6", "div7", "div8", "div9", "div10", "div11", "div12", "div13", "div14", "div15"];
    let canvases1 = ["canvas0", "canvas1", "canvas2", "canvas3", "canvas4", "canvas5", "canvas6",
        "canvas7", "canvas8", "canvas9", "canvas10", "canvas11", "canvas12", "canvas13", "canvas14", "canvas15"];

    let correctPuzzle = [];
    for (let i=0; i < 16; i++){
        let divName = divs[i];
        let canvasName = canvases1[i];
        let x1 = 0;
        let x2 = 0;
        correctPuzzle.push({divName, canvasName, x1, x2});
    }
    for (let i=0; i < 16; i++){
        let x1 = slicedImage[i].x1;
        let x2 = slicedImage[i].x2;
        correctPuzzle[i].x1 = x1;
        correctPuzzle[i].x2 = x2;
    }

    let test = correctPuzzle.sort( () => .5 - Math.random() );
    console.log(test);
    return correctPuzzle;
}


function addCanvasToRow(rowId, id){
    let row = document.getElementById(rowId);
    let newColumn = document.createElement("canvas");
    newColumn.id = id;
    newColumn.draggable = true;
    row.appendChild(newColumn);
}

function drawPuzzles(image){
    for (let i=0; i < 16; i++){
        let name = puzzleInfo[i].canvasName;
        let context = document.getElementById(name).getContext("2d");
        context.drawImage(image, puzzleInfo[i].x1, puzzleInfo[i].x2, 150, 75, 0, 0, 300, 150);
    }
}

function sliceImage(imageSlices){
    let slicedImage = [];
    let w = imageSlices.width;
    let h = imageSlices.height;
    let realW = w / 4;
    let realH = h / 4

    for (let j=0; j < 4; j++){
        for (let i=0; i < 4; i++){
            let x1 = i*realW;
            let x2 = j*realH;
            slicedImage.push({x1, x2});
        }
    }

    return slicedImage;
}

function makeDraggable(id){
    let item = document.getElementById(id);

    item.addEventListener("dragstart", function(event) {
        this.style.border = "5px dashed #D8D8FF";
        event.dataTransfer.setData("text", this.id);
    });
    item.addEventListener("dragend", function(event) {
        this.style.borderWidth = "0";
    });
}


function initializeTarget(target){

    target.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    target.addEventListener("drop", function (event) {
        let id = event.dataTransfer.getData('text')
        let droppedElement = document.getElementById(id);
        droppedElement.style.width = "150px";
        droppedElement.style.height = "75px";
        this.appendChild(droppedElement);
        checkIfCorrect();
    }, false);
}

function initializeTargetDivs(){
    let element = document.getElementById("target");
    for (let i=0; i < 16; i++){
        let child = document.createElement("div");
        child.id = "div" + i;
        element.appendChild(child);
    }
}

function checkIfCorrect(){

    let correctCounter = 0;
    for (let i=0; i < 16; i++){
        let canvas = document.getElementById(puzzleInfo[i].divName);
        if (canvas.children[0] != null){
            if(canvas.children[0].id === puzzleInfo[i].canvasName){
                correctCounter++;
            }
        }
    }

    correct = correctCounter;
    console.log(correct);
    if (correct === 16){
        console.log("FINISH");
        alert("You win!!");
    }
}

function onSaveButton(canvas){

    puzzleInfo = shuffle(sliceImage(canvas));
    initializePuzzle();
    initializeTargetDivs();
    drawPuzzles(canvas);

    let firstRow = document.getElementById("firstRow");
    let secondRow = document.getElementById("secondRow");
    initializeTarget(firstRow);
    initializeTarget(secondRow);
    let target = document.getElementById("target").children;
    for (let i=0; i < 16; i++){
        initializeTarget(target[i]);
    }
}

function clear(){
    let firstRow = document.getElementById("firstRow");
    let secondRow = document.getElementById("secondRow");
    let target = document.getElementById("target");

    firstRow.innerHTML = "";
    secondRow.innerHTML = "";
    target.innerHTML = "";
}






