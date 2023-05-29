
let taskInProgress = [];

let taskAwaitingFeedback = [];

let taskDone = [];

let currentLoadedTask


async function init(){
    await loadAllTasks();
    updateHTML();
}


async function getTasks(key){
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
}

async function loadAllTasks(){
    let task = await getTasks('task');
    currentLoadedTask = JSON.parse(task['data']['value']);
    for (let i = 0; i < currentLoadedTask.length; i++) {
        const taskToPush = currentLoadedTask[i];
        taskInProgress.push(taskToPush);  
    }
}



//<----------------------------------------- UpdateHTML-Function for Drag & Drop -------------------------------------->

let currentDraggedElement;

function updateHTML(){
    updateToDo();
    updateTaskInProgress();
    updateTaskAwaitingFeedback();
    updateTaskDone();
}

function updateToDo(){
    let open = currentLoadedTask.filter(t => t['status'] == 'to-do');
    document.getElementById('board-to-do').innerHTML = '';

    for (let i = 0; i < open.length; i++) {
        const element = open[i];
        document.getElementById('board-to-do').innerHTML += generateTaskCard(element);
    }
}

function updateTaskInProgress(){
    let inProgress = currentLoadedTask.filter(t => t['status'] == 'in-progress');
    document.getElementById('board-in-progress').innerHTML = '';

    for (let i = 0; i < inProgress.length; i++) {
        const element = inProgress[i];
        document.getElementById('board-in-progress').innerHTML += generateTaskCard(element);
    }
}

function updateTaskAwaitingFeedback(){
    let awaitingFeedback = currentLoadedTask.filter(t => t['status'] == 'awaiting-feedback');
    document.getElementById('board-awaiting-feedback').innerHTML = '';

    for (let i = 0; i < awaitingFeedback.length; i++) {
        const element = awaitingFeedback[i];
        document.getElementById('board-awaiting-feedback').innerHTML += generateTaskCard(element);
    }
}

function updateTaskDone(){
    let done = currentLoadedTask.filter(t => t['status'] == 'done');
    document.getElementById('board-task-done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('board-task-done').innerHTML += generateTaskCard(element);
    }
}

function startDragging(id){
    currentDraggedElement = id;
}

function allowDrop(ev){
    ev.preventDefault();
}

function moveTo(category){
    currentLoadedTask[currentDraggedElement]['status'] = category;
    updateHTML();
}

function generateTaskCard(element){
    return /*html*/`
        <div draggable="true" ondragstart="startDragging(${element['id']})"; class="board-task-box flex-column">
            <div>
                <span>${element['category']}</span>
                <h3>${element['title']}</h3>
                <p>${element['description']}</p>
                <p>${element['assigned']}</p>
            </div>
        </div>
    `; 
}


//<--------------------------------------------- Open and Close Add-Task Window on Board.html ------------------------------------------->

function openAddTask(){
    document.getElementById('add-task-overlay').style.transform = 'translateX(0)';
}

function closeWindow(){
    document.getElementById('add-task-overlay').style.transform = 'translateX(2000px)';
}