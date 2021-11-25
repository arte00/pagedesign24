
/*

to do:
 - pomieszanie puzzli za pomocą operacji na imageSlices[];
 - wyświetlenie komunikatu
 - dodanie drag and drop spowrotem do firstRow, secondRow
 - poprawienie bugów i ewentualna poprawa wizualna (clearowanie przed ponownym pobraniem mapy)

*/

let map = L.map('map').setView([53.430127, 14.564802], 18);
L.tileLayer.provider('Esri.WorldImagery').addTo(map);


document.getElementById("saveButton").addEventListener("click", function() {
    leafletImage(map, function (err, canvas) {
        initializePuzzle();
        initializeTargetDivs();
        let sliced = sliceImage(canvas);
        drawPuzzles(sliced, canvas);

        let target = document.getElementById("target").children;
        for (let i=0; i < 16; i++){
            initializeTarget(target[i]);
        }
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
    for (let i=0; i < 16; i++){
        let name = "canvas" + i;
        if (i < 8){
            addCanvasToRow("firstRow", name);
        } else {
            addCanvasToRow("secondRow", name);
        }
        makeDraggable(name);
    }
}

function shuffle(){
    let divs = ["div0", "div1", "div2", "div3", "div4", "div5", "div6", "div7", "div8", "div9", "div10", "div11", "div12", "div13", "div14", "div15"];
    let canvases = ["canvas0", "canvas4", "canvas8", "canvas12", "canvas1", "canvas5", "canvas9", "canvas13",
        "canvas2", "canvas6", "canvas10", "canvas14", "canvas3", "canvas7", "canvas11", "canvas15"];

    let correctPuzzle = [];

    for (let i=0; i < 16; i++){
        let x = divs[i];
        let y = canvases[i];
        correctPuzzle.push({x, y});
    }

    // correctPuzzle.sort( () => .5 - Math.random() );

    return correctPuzzle;
}


function addCanvasToRow(rowId, id){
    let row = document.getElementById(rowId);
    let newColumn = document.createElement("td");
    newColumn.innerHTML = "<canvas draggable=\"true\" id=" + id + "></canvas>";
    row.appendChild(newColumn);
}

function drawPuzzles(imageSlices, image){
    for (let i=0; i < 16; i++){
        let name = "canvas" + i;
        let context = document.getElementById(name).getContext("2d");
        context.drawImage(image, imageSlices[i].x1, imageSlices[i].x2, 150, 75, 0, 0, 300, 150);
    }
}

function sliceImage(imageSlices){
    let slicedImage = [];
    let w = imageSlices.width;
    let h = imageSlices.height;
    let realW = w / 4;
    let realH = h / 4
    for (let i=0; i < 4; i++){
        for (let j=0; j < 4; j++){
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
    item.addEventListener("drop", function(event) {
        this.style.border = "1px solid black";
    });
}


function initializeTarget(target){
    target.addEventListener("dragenter", function (event) {
        this.style.border = "2px solid #006400";
    });
    target.addEventListener("dragleave", function (event) {
        this.style.border = "1px solid black";
    });
    target.addEventListener("dragover", function (event) {
        event.preventDefault();
    });
    target.addEventListener("drop", function (event) {
        let id = event.dataTransfer.getData('text')
        let droppedElement = document.getElementById(id);
        this.appendChild(droppedElement)
        this.style.border = "1px solid black";
        checkIfCorrect(shuffle());
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
let correct = 0;

function checkIfCorrect(correctPuzzle){

    let correctCounter = 0;
    for (let i=0; i < 16; i++){
        let canvas = document.getElementById(correctPuzzle[i].x);
        if (canvas.children[0] != null){
            if(canvas.children[0].id === correctPuzzle[i].y){
                correctCounter++;
            }
        }
    }

    correct = correctCounter;
    console.log(correct);
    if (correct === 16){
        console.log("FINISH");
    }
}





