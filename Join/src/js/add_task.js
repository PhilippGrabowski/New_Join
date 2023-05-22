/* Cont Variables for the Remote Storage saving */

const STORAGE_TOKEN = 'D4DBS7MA276TXS8PQ3TJKAHG12EW5IEPOBMLYDL9';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/* Remotely loads exisiting Tasks if some Tasks where created */

loadTasks();

let tasks = [];

let subtaskName = [];

let subtasks = [
    {
        "subtask_Name" : subtaskName
    },
    {

    }
]

let priorities = [
    { priority: 'urgent', color: 'red' },
    { priority: 'medium', color: 'orange' },
    { priority: 'low', color: 'green' },
]
let prio;

let categoryColors = [
    { color: 'red' },
    { color: 'green' },
    { color: 'purple' },
]

/* Creates a Json out of the Information that has been set in the Add-Task Section */

function createTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let category = document.getElementById('selectedCategory');
    let dueDate = document.getElementById('dueDate');

    if (title.value != 0 && description.value != 0 && category.textContent != 0 && dueDate.value != 0) {
        tasks.push(pushTask(title, description, dueDate, prio, category));
        saveTask();
    }
    
}

/* Pushes the Task with all the neccessary Information into the Tasks Array
 * @param {*} title - the title of the Task that the user calls the Task
 * @param {*} description - the description that the user types into the Task Description
 * @param {*} duedate - the Date until the task should be done by
 * @param {*} prio - the priority of the task
 * @param {*} category - the category that the task falls under
 */

function pushTask(title, description, duedate, prio, category) {
    let task = {
        'title': title.value,
        'description': description.value,
        'duedate': duedate.value,
        'priority': prio,
        'category': category.textContent,
        'subtask' : createSubTask(),
        'status': 'open'
    }
    return task;
}

/* Opens the Category Section and views choosable Categories */

function openCategories() {
    let showCat = document.getElementById('showCat');
    showCat.classList.toggle('d-none');
    let checkBottomBorder = !showCat.classList.contains('d-none');
    if (checkBottomBorder) {
        document.getElementById('category').style.borderBottomLeftRadius = "0px";
        document.getElementById('category').style.borderBottomRightRadius = "0px";
        document.getElementById('category').style.borderBottom = "none";
    }
    else {
        document.getElementById('category').style.borderBottomLeftRadius = "8px";
        document.getElementById('category').style.borderBottomRightRadius = "8px";
        document.getElementById('category').style.borderBottom = "1px solid lightgray";
    }
}

/* Sets the Priority that the User gives the Task */

function selectedPrio(selected) {
    prio = priorities[selected].priority;
    setSelectedColor(selected);
    resetSelectedColor(selected);
}

/* Sets the chosen Category by the User and will be seen on The Add Task Site */

function selectCategory(cat) {
    let category = document.getElementById(`${cat}`).textContent;
    document.getElementById('selectedCategory').innerHTML = `<div class="selected-category"><span>${category}</span><span class="circle" style="background-color:${categoryColors[cat].color}"></span></div>`
    document.getElementById('showCat').classList.add('d-none');
    document.getElementById('category').style.borderBottom = "1px solid lightgray";
    document.getElementById('category').style.borderBottomLeftRadius = "8px";
    document.getElementById('category').style.borderBottomRightRadius = "8px";
    console.log(category);
}

/* Sets the Color of the Priorities for a Visual Feedback effect */

function setSelectedColor(id) {
    let selected = document.getElementById(`${priorities[id].priority}`);
    selected.style.backgroundColor = `${priorities[id].color}`;
    let selectedImg = document.getElementById(`img-${priorities[id].priority}`);
    selectedImg.style = `filter: brightness(0) invert(1)`;
    selected.style.color = `white`;
    
}

/* Changes the Color or resets it on the previous Priority Button when the user decides to switch to a different Priority */

function resetSelectedColor(id) {
    for (let i = 0; i < priorities.length; i++) {
        if (i != id) {
            document.getElementById(`${priorities[i].priority}`).style.backgroundColor = 'white';
            document.getElementById(`${priorities[i].priority}`).style.color = 'black';
            document.getElementById(`img-${priorities[i].priority}`).style = `filter: brightness(1) invert(0)`;
        }
        
    }
}

/* Moves to the Board.html Site */

function closeAddTask() {
    document.location = "board.html";
}

/* The Task gets changed into a string */

async function saveTask(){
    
   await setTask('task', JSON.stringify(tasks));
}

/**
 * This Method saves the Task into a Payload and POSTS it into the Storage_URL
 * @param {string} key - Sets the Name of the Task that gets Saved
 * @param {json} value - Saves the JSON that has been created through the Task section
 */

async function setTask(key, value) {
    
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) }).then(res => res.json());
}


/**
 * This Method searches for an existing Task if a Task has been saved by a Key Name
 * @param {string} key - The Name of the Task that has been saved
 */
async function getTask(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        }
        else {
            return res;
        }

    });
}


/* Loads existing Tasks */

async function loadTasks() {
    tasks = JSON.parse(await getTask('task'));
}


/* This is just for a Console test to see if the Tasks get deleted permanently */

function deleteTask() {
    tasks.splice(0, 1);
    saveTask();
}

/* Creates and shows the Subtask that the user sets */
function createSubTask(){

}

/* Pushes the Subtask that the User creates himself into an array and displays it */

function displaySubTask(){
    let subInput = document.getElementById('subtask-content');
    let displayContainer = document.getElementById('displaySub');
    displayContainer.innerHTML = '';
    if(subInput.value != 0){
        console.log("Hallo");
        subtaskName.push(subInput.value);
    }
    for (let i = 0; i < subtaskName.length; i++) {displayContainer.innerHTML += returnSubtaskHTML(i);}
    subInput.value = '';
}


/** Returns the HTML for the Subtask 
 * @param {string} i - The number of the for Loop that is used in the displaySubTask Function
 */
function returnSubtaskHTML(i){
    return `
    <div class="subtask-div-container">
        <div class="subtask-left-side">
            <input type="checkbox" name="subtask" id="subtask${i}">
            ${subtaskName[i]}
        </div>
        <div class="subtask-right-side">
            <img onclick="deleteSubTask(${i})" class="add-task-trash-pic" src="src/img/trash.png">
        </div>
    </div>`
}

/* Deletes the Subtask */

function deleteSubTask(i){
    subtaskName.splice(i,1);
    displaySubTask();
}
