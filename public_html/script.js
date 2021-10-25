const todo = document.getElementById("todo")
todo.innerText = "TODO LIST"

let tasks = [];

function addElement(){
    const title = document.getElementById("taskName").value;
    const date = document.getElementById("taskDate").value;
    if(title.length >= 3){
        const task = {title: title, date: date};
        tasks.push(task);
        clear();
        renderList()
    }
}

function clear(){
    const list = document.getElementById("list");
    list.innerHTML = "";
}

function renderList(){
    const list = document.getElementById("list");
    tasks.forEach(task => {
            const element = document.createElement("li");
            element.append(document.createTextNode(task.title));
            element.append(document.createTextNode(task.date));
            list.append(element);
        }
    )
    console.log(tasks);
    console.log(document.domain);
}