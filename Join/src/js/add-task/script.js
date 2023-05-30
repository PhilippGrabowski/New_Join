let firstRender = true;

let subtaskName = [];

let bool = [];

let subtasks = [
    {
        "checked": bool,
        "subtask_Name": subtaskName
    }
];

let colorType = [
    { color: 'lightblue' },
    { color: 'red' },
    { color: 'green' },
    { color: 'orange' },
    { color: 'pink' },
    { color: 'blue' },
]

let priorities = [
    { priority: 'urgent', color: 'red' },
    { priority: 'medium', color: 'orange' },
    { priority: 'low', color: 'green' },
]
let prio;

let categoryColors = [
    {
        color: 'red',
        category: 'Media'

    },
    {
        color: 'green',
        category: 'Web'

    },
    {
        color: 'purple',
        category: 'Testing'
    }
]

let assignedContacts = []

let dragId = 0;


/* Creates a Json out of the Information that has been set in the Add-Task Section */

function createTask() {

    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let category = document.getElementById('selectedCategory');
    let dueDate = document.getElementById('dueDate');
    console.log(dragId);
    if (title.value != 0 && description.value != 0 && category.textContent != 0 && dueDate.value != 0) {
        tasks.push(pushTask(title, description, dueDate, prio, category, subtasks, assignedContacts, dragId));
        saveTask();
        dragId++;
        console.log(dragId);
    }
    document.location.href = 'board.html';
}

function checkSubtask(i) {
    let checkbox = document.getElementById(`subtask${i}`);
    if (checkbox.checked) {
        bool[i] = "true";
    }
    else if (!checkbox.checked) {
        bool[i] = "false";
    }
}

/* Pushes the Task with all the neccessary Information into the Tasks Array
 * @param {*} title - the title of the Task that the user calls the Task
 * @param {*} description - the description that the user types into the Task Description
 * @param {*} duedate - the Date until the task should be done by
 * @param {*} prio - the priority of the task
 * @param {*} category - the category that the task falls under
 */

function pushTask(title, description, duedate, prio, category, subtasks, assignedContacts, DragId) {
    let task = {
        'title': title.value,
        'description': description.value,
        'duedate': duedate.value,
        'priority': prio,
        'category': category.textContent,
        'subtask': subtasks,
        'assigned': assignedContacts,
        'status': 'to-do',
        'id': DragId
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

function displayCategoryHTML() {
    let cat = document.getElementById('category');
    cat.style = '';
    cat.classList.add('category-dropdown-div');
    cat.innerHTML = `
        <div id="selectedCategory">Select a Category</div>
        <img onclick="openCategories(),displayCategories()" class="cursor" src="src/img/dropdown-arrow.svg">
    `
}


function displayCategories() {
    let show = document.getElementById('showCat');
    show.innerHTML = '';
    show.innerHTML = `<div onclick="createNewCategory(), displayCategoryColors()" class="cat">New Category</div>`;
    for (let i = 0; i < categoryColors.length; i++) {
        show.innerHTML += `<div onclick="selectCategory(${i})" class="cat" id="${i}">${categoryColors[i].category}<span class="circle"
        style="background-color: ${categoryColors[i].color};"></span></div>`
    }
}

function createNewCategory() {
    openCategories();
    let show = document.getElementById('showCat');
    let categoryContainer = document.getElementById('category');
    categoryContainer.classList.remove('category-dropdown-div');
    categoryContainer.style = '';
    show.classList.add('d-none');
    categoryContainer.innerHTML = `
        <div>
            <input class="title-input" type="text" placeholder="New Category name">
            <img class="tick-icon" src="src/img/tick.png">
            <img onclick="displayCategories(), displayCategoryHTML()" class="x-icon" src="src/img/x.png">
        </div>
        <div id="categoryColors">
            
        </div>
    `;

}

function displayCategoryColors(){
    let color = document.getElementById('categoryColors');
    color.innerHTML = '';
    for (let i = 0; i < colorType.length; i++) {
        color.innerHTML += `
        <div class="colortype" id="colorCode${i}" onclick="selectColor(${i})" style="background-color: ${colorType[i].color}">
        `
    }
}

function selectColor(i){
    let selected = document.getElementById(`colorCode${i}`);
    selected.classList.add('highlighted-color');
    removeOtherSelected(i);
}

function removeOtherSelected(i){
    for (let k = 0; k < colorType.length; k++) {
        if (i != k) {
          document.getElementById(`colorCode${k}`).classList.remove('highlighted-color');
        }
      }
}


function openAssignedTo() {
    let showAssigned = document.getElementById('showAssigned');
    showAssigned.classList.toggle('d-none');
    let checkBottomBorder = !showAssigned.classList.contains('d-none');
    if (checkBottomBorder) {
        document.getElementById('assigned').style.borderBottomLeftRadius = "0px";
        document.getElementById('assigned').style.borderBottomRightRadius = "0px";
        document.getElementById('assigned').style.borderBottom = "none";
    }
    else {
        document.getElementById('assigned').style.borderBottomLeftRadius = "8px";
        document.getElementById('assigned').style.borderBottomRightRadius = "8px";
        document.getElementById('assigned').style.borderBottom = "1px solid lightgray";
    }
}

function renderContacts() {
    let list = document.getElementById('showAssigned');
    if (firstRender) {
        list.innerHTML = '';
        for (let i = 0; i < contacts.length; i++) {
            list.innerHTML += `
            <div class="contact-container">
            ${contacts[i].name}
            <input onclick="assignTask(${i})" class="cursor" type="checkbox" id="contact${contacts[i].id}">
            </div>`
        }
        firstRender = false;
    }
}

function removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);

    if (objWithIdIndex > -1) {
        arr.splice(objWithIdIndex, 1);
    }

    return arr;
}

function assignTask(i) {
    let checkbox = document.getElementById(`contact${contacts[i].id}`);
    if (checkbox.checked) {
        assignedContacts.push(
            {
                'name': contacts[i].name,
                'id': contacts[i].id
            }
        );
        renderContactBubbles();
    }
    else if (!checkbox.checked) {
        removeObjectWithId(assignedContacts, i);
        renderContactBubbles();
    }
}


function renderContactBubbles() {
    let render = document.getElementById('renderContactBubbles');
    render.innerHTML = '';
    let firstLetter;
    for (let i = 0; i < assignedContacts.length; i++) {
        firstLetter = assignedContacts[i].name.charAt(0);
        render.innerHTML += `
        <div class="contact-display">
            ${firstLetter}
        </div>


        `
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

async function saveTask() {

    await setItem('task', JSON.stringify(tasks));
}

/* This is just for a Console test to see if the Tasks get deleted permanently */

function deleteTask() {
    tasks.splice(0, 1);
    saveTask();
}

/* Pushes the Subtask that the User creates himself into an array and displays it */

function displaySubTask() {
    let subInput = document.getElementById('subtask-content');
    let displayContainer = document.getElementById('displaySub');
    displayContainer.innerHTML = '';
    if (subInput.value != 0) {
        console.log("Hallo");
        subtaskName.push(subInput.value);
        bool.push('false');
    }

    for (let i = 0; i < subtaskName.length; i++) { displayContainer.innerHTML += returnSubtaskHTML(i); bool[i] = "false"; }
    subInput.value = '';
}


/** Returns the HTML for the Subtask 
 * @param {string} i - The number of the for Loop that is used in the displaySubTask Function
 */
function returnSubtaskHTML(i) {
    return `
    <div class="subtask-div-container">
        <div class="subtask-left-side">
            <input onclick="checkSubtask(${i})" type="checkbox" name="subtask" id="subtask${i}">
            ${subtaskName[i]}
        </div>
        <div class="subtask-right-side">
            <img onclick="deleteSubTask(${i})" class="add-task-trash-pic" src="src/img/trash.png">
        </div>
    </div>`
}

/* Deletes the Subtask */

function deleteSubTask(i) {
    subtaskName.splice(i, 1);
    bool.splice(i, 1);
    displaySubTask();
}
