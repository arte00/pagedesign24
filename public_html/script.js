
const todo = document.getElementById("todo")
todo.innerText = "TODO LIST"

let tasks = [];

function addElement(){
    const title = document.getElementById("taskName").value;
    const date = document.getElementById("taskDate").value;
    if(title.length >= 3 && date){
        const task = {title: title, date: date};
        tasks.push(task);
        saveStorage()
        renderList()
    }
}

// STORAGE OPERATIONS

function saveStorage(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearStorage(){
    tasks = []
}

function getStorage(){
    if(JSON.parse(localStorage.getItem("tasks")) != null){
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
}

function clearList(){
    clearStorage();
    saveStorage();
    renderList();
}

function clear(){
    const list = document.getElementById("list");
    list.innerHTML = "";
}

function renderList(){
    clear();
    const list = document.getElementById("list");
    tasks.forEach((task, index) => {
            const element = document.createElement("li");
            const icon = document.createElement("span");

            icon.innerHTML = "<i class='fa fa-times'></i>";

            element.appendChild(document.createTextNode(task.title));
            element.appendChild(document.createTextNode(" (" + task.date + ") "));
            element.appendChild(icon);

            icon.onclick = function (){
                clearPosition(index);
            }
            element.ondblclick = function (){
                this.firstChild.innerHTML = "<p>XDD</p>"
            }

            list.append(element);
        }
    )
}

function clearPosition(position){
    tasks.splice(position, 1);
    saveStorage();
    renderList();
}

function search(){
    const input = document.getElementById("search");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("list");
    const lis = table.getElementsByTagName("li");

    for(let i=0; i < lis.length; i++){
        let text = lis[i].childNodes[0];
        if(text){
            if(text.textContent.toUpperCase().indexOf(filter) > -1){
                lis[i].style.backgroundColor = "#c6be21";
            } else {
                lis[i].style.backgroundColor = "#f2f2f2";
            }
        }
        if(filter === ""){
            lis[i].style.backgroundColor = "#f2f2f2";
        }
    }
}

document.getElementById("search").addEventListener("search", function() {
    search();
});

getStorage();
renderList();