
let container = ['board-to-do', 'board-in-progress', 'board-awaiting-feedback', 'board-task-done'];
let stat = ['to-do', 'in-progress', 'awaiting-feedback', 'done'];
let currentDraggedElement;

async function init(){
    await loadTasks();
    updateHTML();
}


//<----------------------------------------- UpdateHTML-Function for Drag & Drop -------------------------------------->


/**
 * This function is updating the current HTML ensure every content inside an array is displayed
 */
function updateHTML(){
    for (let i = 0; i < container.length; i++) {
        let box = document.getElementById(container[i]);
        let task = tasks.filter(t => t['status'] === stat[i]);
        box.innerHTML = '';
        for (let j = 0; j < task.length; j++) {
            const element = task[j];
            box.innerHTML += generateTaskCard(element);
        }
        box.innerHTML += `<div class="dragbox-shadow d-none" id="${stat[i]}-shadow"></div>`;
    }
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
    let index = getIndexOfTask(currentDraggedElement);
    tasks[index]['status'] = category;
    saveRemote();
    updateHTML();
}

/**
 * This function saves the changed status to remote storage
 */
async function saveRemote(){
    await setItem('task', JSON.stringify(tasks));
}

/**
 * This function displays a shadow in the column a draggable element is dragged over
 * @param {number} counter - This is used to differ between the hidden box-shadows inside the task columns
 */
function dragHighlight(boxShadow){
    document.getElementById(boxShadow).classList.remove('d-none');
}

/**
 * This function hides the box shadow as soon as the column isn't hovered any more
 * @param {number} counter - This is used to differ between the hidden box-shadows inside the task columns
 */
function endHighlight(boxShadow){
    document.getElementById(boxShadow).classList.add('d-none');
}

/**
 * Returns index of draggable task from the tasks array
 * 
 * @param {number} id - Id of draggable task
 * @returns {number}
 */
function getIndexOfTask(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (id === tasks[i].id) {
            return i;
        }
    }
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
    let taskPopUp = document.getElementById('popup-content');
    let index = getIndexOfTask(id);
    taskPopUp.innerHTML = '';
    taskPopUp.innerHTML += generatePopUpHTML(tasks[index]);
}