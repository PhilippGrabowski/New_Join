
let taskInProgress = [];

let taskAwaitingFeedback = [];

let taskDone = [];

let currentLoadedTask;

const delay = 100;

let lastExecution = 0;


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
    let toDoBox = document.getElementById('board-to-do');
    let open = currentLoadedTask.filter(t => t['status'] == 'to-do');
    toDoBox.innerHTML = '';

    for (let i = 0; i < open.length; i++) {
        const element = open[i];
        const boxCount = 'to-do'+ i;
        const prio = open[i]['priority'];
        toDoBox.innerHTML += generateTaskCard(element, boxCount, prio);
    }
    addBoxShadow(toDoBox, 1);
}

function updateTaskInProgress(){
    let inProgressBox = document.getElementById('board-in-progress');
    let inProgress = currentLoadedTask.filter(t => t['status'] == 'in-progress');
    inProgressBox.innerHTML = '';

    for (let i = 0; i < inProgress.length; i++) {
        const element = inProgress[i];
        const boxCount = 'in-progress'+ i;
        inProgressBox.innerHTML += generateTaskCard(element);
    }
    addBoxShadow(inProgressBox, 2);
}

function updateTaskAwaitingFeedback(){
    let feedbackBox = document.getElementById('board-awaiting-feedback');
    let awaitingFeedback = currentLoadedTask.filter(t => t['status'] == 'awaiting-feedback');
    feedbackBox.innerHTML = '';

    for (let i = 0; i < awaitingFeedback.length; i++) {
        const element = awaitingFeedback[i];
        const boxCount = 'awaiting-feedback'+ i;
        feedbackBox.innerHTML += generateTaskCard(element);
    }
    addBoxShadow(feedbackBox, 3);
}

function updateTaskDone(){
    let taskDoneBox = document.getElementById('board-task-done');
    let done = currentLoadedTask.filter(t => t['status'] == 'done');
    taskDoneBox.innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        const boxCount = 'done'+ i;
        taskDoneBox.innerHTML += generateTaskCard(element);
    }
    addBoxShadow(taskDoneBox, 4);
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

function dragHighlight(counter){
    let currentBoxShadow = document.getElementById(`dragbox-shadow${counter}`);
    currentBoxShadow.classList.remove('d-none');
}

function endHighlight(counter){
    let currentBoxShadow = document.getElementById(`dragbox-shadow${counter}`);
    currentBoxShadow.classList.add('d-none');
}

function addBoxShadow(toDo, progress, feedback, done){
    toDo.innerHTML += generateBoxShadow();
    progress.innerHTML += generateBoxShadow();
    feedback.innerHTML += generateBoxShadow();
    done.innerHTML += generateBoxShadow();
}

function generateTaskCard(element, boxCount, prio){
    return /*html*/`
        <div draggable="true" ondragstart="startDragging(${element['id']})"; class="board-task-box flex-column" id='${boxCount}'>
            <div>
                <span>${element['category']}</span>
                <h3>${element['title']}</h3>
                <p>${element['description']}</p>
                <div>
                    <p>${element['assigned']}</p>
                    <img src="New_Join\Join\src\img\low.svg">
                </div>
                
            </div>
        </div>
    `; 
}

function addBoxShadow(tasksBox, counter){
    tasksBox.innerHTML += generateBoxShadow(counter);
}

function generateBoxShadow(counter){
    return /*html*/`
    <div class="dragbox-shadow d-none" id="dragbox-shadow${counter}"></div>
    `;
}



//<--------------------------------------------- Open and Close Add-Task Window on Board.html ------------------------------------------->

function openAddTask(){
    document.getElementById('add-task-overlay').style.transform = 'translateX(0)';
}

function closeWindow(){
    document.getElementById('add-task-overlay').style.transform = 'translateX(2000px)';
}