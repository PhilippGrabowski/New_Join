let firstRender = true;

let checkTitle, checkDesc, checkCat, checkAssigned, checkDate, checkPrio = false;

let isColorPicked = false;

let startTimer = true;

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
let prio = [];

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
    let taskStatus = checkStatus(status);
    let dragId = getId();
    if (checkValidationOnInputs() == true) {
        tasks.push(pushTask(title, description, dueDate, prio, category, subtasks, assignedContacts, taskStatus, dragId));
        await saveTask();
        window.location = './board.html';
    } if (status) { closeAddTask(); updateHTML(); }
}

function checkSubtask(i) {
    let checkbox = document.getElementById(`subtask${i}`);
    if (checkbox.checked) { bool[i] = "true"; }
    else if (!checkbox.checked) { bool[i] = "false"; }
}

function checkStatus(status) {
    if (status) { return status; }
    else { return 'to-do'; }
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

function openFillOutForm(mainId, secondId, thirdId, text) {
    let displayForm = document.getElementById(mainId);
    document.getElementById(thirdId).textContent = text;
    displayForm.classList.toggle('d-none');
    let checkBottomBorder = !displayForm.classList.contains('d-none');
    if (checkBottomBorder) {
        document.getElementById(secondId).style.borderBottomLeftRadius = "0px";
        document.getElementById(secondId).style.borderBottomRightRadius = "0px";
        document.getElementById(secondId).style.borderBottom = "none";
    } else {
        document.getElementById(secondId).style.borderBottomLeftRadius = "8px";
        document.getElementById(secondId).style.borderBottomRightRadius = "8px";
        document.getElementById(secondId).style.borderBottom = "1px solid lightgray";
    }
}

function displayCategoryHTML() {
    let cat = document.getElementById('category');
    cat.style = '';
    cat.classList.add('category-dropdown-div');
    cat.innerHTML = `
        <div id="selectedCategory">Select a Category</div>
        <img class="cursor" src="src/img/dropdown-arrow.svg">`
}
function displayNewCategoryHTML() {
    category.splice(0, 1);
    let categoryColorsLength = categoryColors.length - 1;
    category.push(
        {
            color: categoryColors[categoryColorsLength].color,
            category: `${categoryColors[categoryColorsLength].category}`
        }
    )
    let cat = document.getElementById('category');
    cat.style = '';
    cat.classList.add('category-dropdown-div');
    cat.innerHTML = `
            <div id="selectedCategory">${categoryColors[categoryColorsLength].category}<span class="circle"style="background-color: ${categoryColors[categoryColorsLength].color};"></span></div>
            <img class="cursor" src="src/img/dropdown-arrow.svg">`
}

function displayCategories() {
    let show = document.getElementById('showCat');
    show.innerHTML = '';
    show.innerHTML = `<div onclick="createNewCategory('showCat','category','selectedCategory','category-dropdown-div','Select a Category','New Category name','displayNewCategory()','displayCategories()',
    'saveCat()','displayCategoryHTML()','newCatText','title-input','text'), displayCategoryColors()" class="cat">New Category</div>`;
    categoryColors.sort((a, b) => a.category.localeCompare(b.category));
    for (let i = 0; i < categoryColors.length; i++) {
        show.innerHTML += `
                <div class="category-container" onclick="selectCategory(${i})">
                <div class="cat" id="${i}">${categoryColors[i].category}<span class="circle"style="background-color: ${categoryColors[i].color};"></span></div>
                <img class="add-task-trash-pic" src="src/img/trash.png" onclick="event.stopPropagation(),deleteCategory(${i})">
                </div>`
    }
}

function deleteCategory(i) {
    let selectedCategory = document.getElementById('selectedCategory');
    if (selectedCategory.textContent == categoryColors[i].category) { selectedCategory.textContent = 'Select a Category'; }
    categoryColors.splice(i, 1);
    saveCat();
    displayCategories();
}

function createNewCategory(mainId, secondId, thirdId, fourthId, text, placeholder, displayNewOnclick, displayExistingOnclick, saveOnclick, displayHTML, inputId, inputClass, formType) {
    openFillOutForm(mainId, secondId, thirdId, text);
    let show = document.getElementById(mainId);
    let categoryContainer = document.getElementById(secondId);
    categoryContainer.classList.remove(fourthId);
    categoryContainer.style = '';
    show.classList.add('d-none');
    categoryContainer.innerHTML = `
    <div>
        <input id="${inputId}" class="${inputClass}" type="${formType}" placeholder="${placeholder}">
        <img onclick="${displayNewOnclick},${saveOnclick}" class="tick-icon" src="src/img/tick.png">
        <img onclick="${displayExistingOnclick},${displayHTML}" class="x-icon" src="src/img/x.png">
    </div>
    <div id="categoryColors">
    </div>
    `;
}

function renderContacts() {
    let list = document.getElementById('showAssigned');
    console.log('sdsd');
    if (firstRender) {
        list.innerHTML = '';
        for (let i = 0; i < contacts.length; i++) {
            list.innerHTML += `
            <div onclick="assignTask(${i})" class="contact-container cursor">
                ${contacts[i].name}
                <div class="checkbox-container">
                    <img class="cursor checkbox-img" id="contact${contacts[i].id}" src="src/img/checkbox.png">
                        <img src="src/img/tick.png" class="tick-img d-none" id="tickId${i}">
                    </img>
                </div>
            </div>`
        }
        list.innerHTML += `
        <div onclick="AddNewContact()" class="contact-container cursor">
            Invite New Contact
        </div>` ;
        firstRender = false;
    }
}

function AddNewContact() {
    console.log("yoyo");
    firstRender = true;
    let assignedForm = document.getElementById('assigned');
    assignedForm.classList.remove('assigned-dropdown-div');
    assignedForm.classList.remove('cursor');
    assignedForm.onclick = '';
    let contactsAs = document.getElementById('showAssigned');
    contactsAs.classList.add('d-none');
    assignedForm.innerHTML =
        `
    <div class="add-contact-container">
        <input class="title-input" placeholder="Contact email" type="email" id="newContact">
        <div>
            <img src="src/img/delete-icon.svg" onclick="displayContacts()" class="delete-icon-x">
            <img src="src/img/tick.png" onclick="createContact()" class="tick-icon">
        </div>
    </div>
    `
}

function createContact(){
    let newContact = document.getElementById('newContact');
    if(newContact.value.includes('@')){
        contacts.push({
            name: `${newContact.value}`,
            initials: '<img src="src/img/contacts-icon.svg" class="missing-img">'
        });
        console.log('added');
        displayContacts();
    }
}

function displayContacts() {
        let contactsAs = document.getElementById('assingedContactForm');
        contactsAs.innerHTML = '';
        contactsAs.innerHTML = `
        <span>Assigned to</span>
            <div onclick="openFillOutForm('showAssigned','assigned','assignedPeople','Assigned to'), renderContacts(), event.stopPropagation()" id="assigned" class="assigned-dropdown-div cursor">
                <div id="assignedPeople">Assigned to</div>
                <img  class="cursor" src="src/img/dropdown-arrow.svg">
            </div>
            <div class="d-none" id="showAssigned">
        
            </div>
            <div id="renderContactBubbles">
        
            </div>
            <div id="assignedValidationText"  class="d-none validation-text">Please assign the Task</div>
        `
        assignedContacts = [];
}

function displayCategoryColors() {
    let color = document.getElementById('categoryColors');
    color.innerHTML = '';
    for (let i = 0; i < colorType.length; i++) { color.innerHTML += `<div class="colortype" id="colorCode${i}" onclick="selectColor(${i})" style="background-color: ${colorType[i].color}">` }
}

function initial() {
    let title = document.getElementById('title');
    let titleNote = document.getElementById('titleValidationText');
    let description = document.getElementById('description');
    let descriptionNote = document.getElementById('descValidationText');
    let dueDate = document.getElementById('dueDate');
    let dateNote = document.getElementById('dateValidationText');
    if (title.value != 0) { titleNote.classList.add('d-none'); }
    if (description.value != 0) { descriptionNote.classList.add('d-none'); }
    if (dueDate.value != 0) { dateNote.classList.add('d-none'); }
    title.onclick = ''; description.onclick = ''; dueDate.onclick = '';
    setTimeout(initial, 100);
}

function selectColor(i) {
    isColorPicked = true;
    let selected = document.getElementById(`colorCode${i}`);
    selected.classList.add('highlighted-color');
    selectedColor.push(colorType[i].color);
    removeOtherSelected(i);
}

function removeOtherSelected(i) {
    for (let k = 0; k < colorType.length; k++) { if (i != k) { document.getElementById(`colorCode${k}`).classList.remove('highlighted-color'); } }
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

function checkValidationOnInputs() {
    let title = document.getElementById('title');
    let desc = document.getElementById('description');
    let cat = document.getElementById('selectedCategory');
    let date = document.getElementById('dueDate');
    return returnCheckedInputs(checkTitle, checkDesc, checkCat, checkAssigned, checkDate, checkPrio, title, desc, cat, date);
}

function returnCheckedInputs(checkTitle, checkDesc, checkCat, checkAssigned, checkDate, checkPrio, title, desc, cat, date) {
    if (title.value == 0) { document.getElementById('titleValidationText').classList.remove('d-none'); }
    else { checkTitle = true; document.getElementById('titleValidationText').classList.add('d-none'); }
    if (desc.value == 0) { document.getElementById('descValidationText').classList.remove('d-none'); }
    else { checkDesc = true; document.getElementById('descValidationText').classList.add('d-none'); }
    if (cat.textContent == 'Select a Category') { document.getElementById('catValidationText').classList.remove('d-none'); }
    else { checkCat = true; document.getElementById('catValidationText').classList.add('d-none'); }
    if (assignedContacts.length == 0) { document.getElementById('assignedValidationText').classList.remove('d-none'); }
    else { checkAssigned = true; document.getElementById('assignedValidationText').classList.add('d-none'); }
    if (date.value == 0) { document.getElementById('dateValidationText').classList.remove('d-none'); }
    else { checkDate = true; document.getElementById('dateValidationText').classList.add('d-none'); }
    if (prio.length == 0) { document.getElementById('prioValidationText').classList.remove('d-none'); }
    else { checkPrio = true; document.getElementById('prioValidationText').classList.add('d-none'); }
    if (checkTitle && checkDesc && checkCat && checkAssigned && checkDate && checkPrio) { return true; }
    else return false;
}

function removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
    if (objWithIdIndex > -1) { arr.splice(objWithIdIndex, 1); }
    return arr;
}

function assignTask(i) {
    let checkbox = document.getElementById(`contact${contacts[i].id}`);
    let tickId = document.getElementById(`tickId${i}`);
    let assignedTask = document.getElementById('assignedPeople');
    let assignedTaskNote = document.getElementById('assignedValidationText');
    if (!checkbox.checked) {
        assignedContacts.push({
            'name': contacts[i].name,
            'initials': contacts[i].initials,
            'id': contacts[i].id,
            'color': contacts[i].color
        });
        tickId.classList.remove('d-none'); checkbox.checked = true;
    }
    else if (checkbox.checked) { removeObjectWithId(assignedContacts, contacts[i].id); checkbox.checked = false; tickId.classList.add('d-none'); }
    renderContactBubbles(); checkAssigned = true;
    if (assignedTask.textContent != 0) { assignedTaskNote.classList.add('d-none'); }
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
    document.getElementById('prioValidationText').classList.add('d-none');
}

/* Sets the chosen Category by the User and will be seen on The Add Task Site */

function selectCategory(cat) {
    category.splice(0, 1);
    let categoryText = document.getElementById(`${cat}`).textContent;
    let chosenCat = document.getElementById('category');
    let chosenCatNote = document.getElementById('catValidationText');
    document.getElementById('selectedCategory').innerHTML = `<div class="selected-category"><span>${categoryText}</span><span class="circle" style="background-color:${categoryColors[cat].color}"></span></div>`
    document.getElementById('showCat').classList.add('d-none');
    document.getElementById('category').style.borderBottom = "1px solid lightgray";
    document.getElementById('category').style.borderBottomLeftRadius = "8px";
    document.getElementById('category').style.borderBottomRightRadius = "8px";
    category.push(
        {
            color: categoryColors[cat].color,
            category: `${categoryColors[cat].category}`
        }
    )
    if (chosenCat.textContent != 0) { checkCat = true; chosenCatNote.classList.add('d-none'); }
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
let hasBeenClicked = 0;
let low = 0;
let medium = 0;
let urgent = 0;

function resetSelectedColor(index) {
    if (prio[0].priority == 'low') { low++; medium = 0; urgent = 0; }
    else if (prio[0].priority == 'medium') { medium++; low = 0; urgent = 0; }
    else if (prio[0].priority == 'urgent') { urgent++; low = 0; medium = 0; }
    for (let i = 0; i < priorities.length; i++) {
        if (i != index) {
            document.getElementById(`${priorities[i].priority}`).style.backgroundColor = 'white';
            document.getElementById(`${priorities[i].priority}`).style.color = 'black';
            document.getElementById(`img-${priorities[i].priority}`).style = `filter: brightness(1) invert(0)`;
        }
    }
    if (low == 2 || medium == 2 || urgent == 2) {
        document.getElementById(`${priorities[index].priority}`).style.backgroundColor = 'white';
        document.getElementById(`${priorities[index].priority}`).style.color = 'black';
        document.getElementById(`img-${priorities[index].priority}`).style = `filter: brightness(1) invert(0)`;
        prio.splice(0, 1);
        low = 0; medium = 0; urgent = 0;
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
        subtaskName.push(subInput.value);
        bool.push('false');
    }
    for (let i = 0; i < subtaskName.length; i++) { displayContainer.innerHTML += returnSubtaskHTML(i); bool[i] = "false"; }
    subInput.value = '';
}
let allow;
function deleteSubtaskInput() {
    document.getElementById('deleteSubTaskTextId').classList.remove('d-none');
}

function onSubtaskFocusOut() {
    let subtaskInputId = document.getElementById('subtask-content');
    if (subtaskInputId.value == 0) { let deleteSubtaskText = document.getElementById('deleteSubTaskTextId'); deleteSubtaskText.classList.add('d-none'); }
}

function emptySubtaskText() {
    let deleteSubtaskText = document.getElementById('deleteSubTaskTextId');
    let subtaskInputId = document.getElementById('subtask-content');
    subtaskInputId.value = '';
    deleteSubtaskText.classList.add('d-none');
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






// let count = 0;

// function openCalender() {
//     document.querySelector('.date_input_container input').setAttribute('type', 'date');
//     document.querySelector('.date_input_container img').classList.add('d-none');
//     document.querySelector('.date_input_container input').showPicker();
//     count++;
// }

// function closeCalender(element) {
//     let dateInput = document.querySelector('.date_input_container input');
//     dateInput.setAttribute('type', 'text');
//     dateInput.value= formatDate(dateInput.value);
//     document.querySelector('.date_input_container img').classList.remove('d-none');
//     if (count == 1) {
//         element.blur();
//     }
// }

// function formatDate(date) {
//     let dateArray = [];
//     let substringStart = 0;
//     for (let i = 0; i < date.length; i++) {
//         if(date.charAt(i) === '-') {
//             let substring = date.slice(substringStart, i);
//             dateArray.unshift(substring);
//             substringStart = i + 1;
//         }
//     }
//     let substring = date.slice(substringStart, date.length);
//     dateArray.unshift(substring);
//     let newDate = dateArray.toString();
//     newDate = newDate.replaceAll(',', '/');
//     return newDate;
// }

// function setCount() {
//     count = 0;
// }