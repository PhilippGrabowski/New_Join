let firstRender = true;

let isColorPicked = false;

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

let selectedColor = [];

let priorities = [
    { priority: 'urgent', color: 'var(--red-color)' },
    { priority: 'medium', color: 'var(--lightOrange-color)' },
    { priority: 'low', color: 'var(--lightGreen-color)' },
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

let category = []

let assignedContacts = []

loadCat();


/* Creates a Json out of the Information that has been set in the Add-Task Section */

async function createTask(status) {

    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let dueDate = document.getElementById('dueDate');
    let categoryName = document.getElementById('selectedCategory');
    let colorArrayLength = selectedColor.length;
    let taskStatus = checkStatus(status);
    let dragId = getId();
    
    
    if (checkValidationOnInputs() == true) {
        console.log("Pushed");
        tasks.push(pushTask(title, description, dueDate, prio, category, subtasks, assignedContacts, taskStatus, dragId));
        await saveTask();
    }
    if(status){
        closeAddTask();
        updateHTML();
    }
}

function checkSubtask(i) {
    let checkbox = document.getElementById(`subtask${i}`);
    if (checkbox.checked) {bool[i] = "true";}
    else if (!checkbox.checked) {bool[i] = "false";}
}

function checkStatus(status){
    if(status){return status;}
    else {return 'to-do';}
}

/* Pushes the Task with all the neccessary Information into the Tasks Array
 * @param {*} title - the title of the Task that the user calls the Task
 * @param {*} description - the description that the user types into the Task Description
 * @param {*} duedate - the Date until the task should be done by
 * @param {*} prio - the priority of the task
 * @param {*} category - the category that the task falls under
 */

function pushTask(title, description, duedate, prio, category, subtasks, assignedContacts, taskStatus, DragId) {
    let task = {
        'title': title.value,
        'description': description.value,
        'duedate': duedate.value,
        'priority': prio,
        'category': category,
        'subtask': subtasks,
        'assigned': assignedContacts,
        'status': taskStatus,
        'id': DragId
    }
    return task;
}

/* Opens the Category Section and views choosable Categories */

function openCategories() {
    let showCat = document.getElementById('showCat');
    document.getElementById('selectedCategory').textContent = 'Select a Category';
    showCat.classList.toggle('d-none');
    let checkBottomBorder = !showCat.classList.contains('d-none');
    if (checkBottomBorder) {
        document.getElementById('category').style.borderBottomLeftRadius = "0px";
        document.getElementById('category').style.borderBottomRightRadius = "0px";
        document.getElementById('category').style.borderBottom = "none";
    }else {
        document.getElementById('category').style.borderBottomLeftRadius = "8px";
        document.getElementById('category').style.borderBottomRightRadius = "8px";
        document.getElementById('category').style.borderBottom = "1px solid lightgray";}
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
function displayNewCategoryHTML() {
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
        show.innerHTML += `
            <div class="category-container" onclick="selectCategory(${i})">
                <div class="cat" id="${i}">${categoryColors[i].category}<span class="circle"style="background-color: ${categoryColors[i].color};"></span></div>
                <img class="add-task-trash-pic" src="src/img/trash.png" onclick="event.stopPropagation(),deleteCategory(${i})">
            </div>
            `
    }
}

function deleteCategory(i) {
    let selectedCategory = document.getElementById('selectedCategory');
    if(selectedCategory.textContent == categoryColors[i].category){
        selectedCategory.textContent = 'Select a Category';
    }
    categoryColors.splice(i, 1);
    saveCat();
    displayCategories();
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
            <input id="newCatText" class="title-input" type="text" placeholder="New Category name">
            <img onclick="displayNewCategory(), saveCat()" class="tick-icon" src="src/img/tick.png">
            <img onclick="displayCategories(), displayCategoryHTML()" class="x-icon" src="src/img/x.png">
        </div>
        <div id="categoryColors">
            
        </div>
    `;

}

function displayCategoryColors() {
    let color = document.getElementById('categoryColors');
    color.innerHTML = '';
    for (let i = 0; i < colorType.length; i++) {
        color.innerHTML += `
        <div class="colortype" id="colorCode${i}" onclick="selectColor(${i})" style="background-color: ${colorType[i].color}">
        `
    }
}

function selectColor(i) {
    isColorPicked = true;
    let selected = document.getElementById(`colorCode${i}`);
    selected.classList.add('highlighted-color');
    selectedColor.push(colorType[i].color);
    removeOtherSelected(i);
}

function removeOtherSelected(i) {
    for (let k = 0; k < colorType.length; k++) {
        if (i != k) {
            document.getElementById(`colorCode${k}`).classList.remove('highlighted-color');
        }
    }
}

function displayNewCategory() {
    let input = document.getElementById('newCatText').value;
    let colorArrayLength = selectedColor.length;
    if (input != 0 && isColorPicked) {

        categoryColors.push(
            {
                color: `${selectedColor[colorArrayLength - 1]}`,
                category: `${input}`
            }
        )
        
        displayNewCategoryHTML();
        isColorPicked = false;
    }
}

function checkValidationOnInputs(){
    let checkTitle, checkDesc, checkCat, checkAssigned, checkDate, checkPrio = false;
    let title = document.getElementById('title');
    let desc = document.getElementById('description');
    let cat = document.getElementById('selectedCategory');
    let date = document.getElementById('dueDate');
    return returnCheckedInputs(checkTitle, checkDesc, checkCat, checkAssigned, checkDate, checkPrio, title, desc, cat, date);
}

function returnCheckedInputs(checkTitle, checkDesc, checkCat, checkAssigned, checkDate, checkPrio, title, desc, cat, date){
    if(title.value == 0){document.getElementById('titleValidationText').classList.remove('d-none');}
    else{checkTitle = true;document.getElementById('titleValidationText').classList.add('d-none');}
    if(desc.value == 0){document.getElementById('descValidationText').classList.remove('d-none');}
    else{checkDesc = true;document.getElementById('descValidationText').classList.add('d-none');}
    if(cat.textContent == 'Select a Category'){document.getElementById('catValidationText').classList.remove('d-none');}
    else{checkCat = true;document.getElementById('catValidationText').classList.add('d-none');}
    if(assignedContacts.length == 0){document.getElementById('assignedValidationText').classList.remove('d-none');}
    else{checkAssigned = true;document.getElementById('assignedValidationText').classList.add('d-none');}
    if(date.value == 0){document.getElementById('dateValidationText').classList.remove('d-none');}
    else{checkDate = true;document.getElementById('dateValidationText').classList.add('d-none');}
    if(prio == null){document.getElementById('prioValidationText').classList.remove('d-none');}
    else{checkPrio = true;document.getElementById('prioValidationText').classList.add('d-none');}
    if(checkTitle && checkDesc && checkCat && checkAssigned && checkDate && checkPrio){return true;}
    else return false;
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
                'initials': contacts[i].initials,
                'id': contacts[i].id,
                'color': contacts[i].color
            }
        );
        renderContactBubbles();
    }
    else if (!checkbox.checked) {
        removeObjectWithId(assignedContacts, contacts[i].id);
        renderContactBubbles();
    }
}


function renderContactBubbles() {
    let render = document.getElementById('renderContactBubbles');
    render.innerHTML = '';
    let firstLetter;
    for (let i = 0; i < assignedContacts.length; i++) {
        firstLetter = assignedContacts[i].initials;
        render.innerHTML += `
        <div class="contact-display">
            ${firstLetter}
        </div>


        `
    }
}


/* Sets the Priority that the User gives the Task */

function selectedPrio(selected) {
    prio = [
        {
            priority: `${priorities[selected].priority}`,
            color: `${priorities[selected].color}`
        }
    ]
    setSelectedColor(selected);
    resetSelectedColor(selected);
}

/* Sets the chosen Category by the User and will be seen on The Add Task Site */

function selectCategory(cat) {
    category.splice(0,1);
    let categoryText = document.getElementById(`${cat}`).textContent;
    document.getElementById('selectedCategory').innerHTML = `<div class="selected-category"><span>${categoryText}</span><span class="circle" style="background-color:${categoryColors[cat].color}"></span></div>`
    document.getElementById('showCat').classList.add('d-none');
    document.getElementById('category').style.borderBottom = "1px solid lightgray";
    document.getElementById('category').style.borderBottomLeftRadius = "8px";
    document.getElementById('category').style.borderBottomRightRadius = "8px";
    console.log(categoryText);
    category.push(
        {
            color: categoryColors[cat].color,
            category: `${categoryColors[cat].category}`
        }
    )
}

/* Sets the Color of the Priorities for a Visual Feedback effect */

function setSelectedColor(index) {
    let selected = document.getElementById(`${priorities[index].priority}`);
    selected.style.backgroundColor = `${priorities[index].color}`;
    let selectedImg = document.getElementById(`img-${priorities[index].priority}`);
    selectedImg.style = `filter: brightness(0) invert(1)`;
    selected.style.color = `white`;

}

/* Changes the Color or resets it on the previous Priority Button when the user decides to switch to a different Priority */

function resetSelectedColor(index) {
    for (let i = 0; i < priorities.length; i++) {
        if (i != index) {
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
async function saveCat() {

    await setItem('cat', JSON.stringify(categoryColors));
}

/* This is just for a Console test to see if the Tasks get deleted permanently */

function deleteTask(i) {
    tasks.splice(i, 1);
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

/**
 * Returns Id for draggable Tasks
 * 
 * @returns {number}
 */
function getId() {
    if (tasks.length === 0) {
        return 1;
    } else {
        let ids = [];
        for (let i = 0; i < tasks.length; i++) {
            ids.push(tasks[i].id);
        }
        let maxId = Math.max.apply(Math, ids);
        maxId++;
        return maxId;
    }
}