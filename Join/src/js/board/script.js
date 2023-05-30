
let taskInProgress = [];

let taskAwaitingFeedback = [];

let taskDone = [];

let currentLoadedTask;

let currentDraggedElement;


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


/**
 * This function is updating the current HTML ensure every content inside an array is displayed
 */
function updateHTML(){
    updateToDo();
    updateTaskInProgress();
    updateTaskAwaitingFeedback();
    updateTaskDone();
}

/**
 * The following four functions filter an array and then render the contents into the designated columns.
 * @param {element} toDoBox - the div for tasks still to do
 * @param {Array} open - This array contains all taks that have the status 'to-do'
 */
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

/**
 * @param {element} inProgressBox - the div for tasks that are in progress
 * @param {Array} inProgress - This array contains all tasks that have the status 'in-progress' 
 */
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

/**
 * @param {element} feedbackBox - The div for tasks that are waiting for feedback
 * @param {Array} awaitingFeedback - This array contains all tasks that have the status 'awaiting-feedback'
 */
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


/**
 * @param {element} taskDoneBox - The div for tasks that are done
 * @param {Array} done - This array contains all tasks that have the status 'done'
 */
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

/**
 * This function is saving the id of the current dragged element
 * @param {*} id - To differ between the task-divs
 */
function startDragging(id){
    currentDraggedElement = id;
}

function allowDrop(ev){
    ev.preventDefault();
}


/**
 * This function changes the status of a tasks, saves it and then updates the HTML
 * @param {string} category - the coulmn the element is to be dropped in
 */
async function moveTo(category){
    currentLoadedTask[currentDraggedElement]['status'] = category;
    await saveStatusChange(currentDraggedElement);
    updateHTML();
}

/**
 * This function deletes the task with the old status and pushes it back to the array with the new status.
 * @param {number} currentDraggedElement - The id of the last dropped element
 */
async function saveStatusChange(currentDraggedElement){
    let elementToSave = currentLoadedTask[currentDraggedElement];
    currentLoadedTask.splice(currentDraggedElement, 1);
    currentLoadedTask.push(elementToSave);
    await saveRemote();
}


/**
 * This function saves the changed status to remote storage
 */
async function saveRemote(){
    await setTask('task', JSON.stringify(currentLoadedTask));
}


/**
 * This function displays a shadow in the column a draggable element is dragged over
 * @param {number} counter - This is used to differ between the hidden box-shadows inside the task columns
 */
function dragHighlight(counter){
    let currentBoxShadow = document.getElementById(`dragbox-shadow${counter}`);
    currentBoxShadow.classList.remove('d-none');
}


/**
 * This function hides the box shadow as soon as the column isn't hovered any more
 * @param {number} counter - This is used to differ between the hidden box-shadows inside the task columns
 */
function endHighlight(counter){
    let currentBoxShadow = document.getElementById(`dragbox-shadow${counter}`);
    currentBoxShadow.classList.add('d-none');
}


/**
 * This function adds a hidden div to the four tasks columns. This is needed for the dragHighlight function.
 * @param {element} toDo - The div where the box shadow will be added
 * @param {element} progress - The div where the box shadow will be added 
 * @param {element} feedback - The div where the box shadow will be added 
 * @param {element} done - The div where the box shadow will be added 
 */
function addBoxShadow(toDo, progress, feedback, done){
    toDo.innerHTML += generateBoxShadow();
    progress.innerHTML += generateBoxShadow();
    feedback.innerHTML += generateBoxShadow();
    done.innerHTML += generateBoxShadow();
}



//<----------------------------------------------- generate HTML functions ---------------------------------------------------------------->
function generateTaskCard(element, boxCount, prio){
    return /*html*/`
        <div draggable="true" onclick="openTaskPopUp(${element['id']})" ondragstart="startDragging(${element['id']})"; class="board-task-box flex-column" id='${boxCount}'>
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

function generatePopUpHTML(clickedElement){
    return /*html*/`
        <span>${clickedElement['category']}</span>
        <h2>${clickedElement['title']}</h2>
        <p>Due date: ${clickedElement['duedate']}</p>
        <p>Priority: ${clickedElement['priority']}</p>
        <div class="flex-column">
            
        </div>
    `;
}



//<--------------------------------------------- Open and Close PopUps ------------------------------------------->

function openAddTask(){
    document.getElementById('add-task-overlay').style.transform = 'translateX(0)';
}

function closeAddTask(){
    document.getElementById('add-task-overlay').style.transform = 'translateX(3500px)';
}


function openTaskPopUp(id){
    renderPopUpDetails(id);
    document.getElementById('task-popup-background').classList.remove('d-none');
}

function closeTaskPopUp(){
    document.getElementById('task-popup-background').classList.add('d-none');
}

function renderPopUpDetails(id){
    let taskPopUp = document.getElementById('task-popup');
    let clickedElement = currentLoadedTask[id];
    taskPopUp.innerHTML += generatePopUpHTML(clickedElement);
}