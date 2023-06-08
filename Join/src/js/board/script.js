
let container = ['board-to-do', 'board-in-progress', 'board-awaiting-feedback', 'board-task-done'];
let stat = ['to-do', 'in-progress', 'awaiting-feedback', 'done'];
let currentDraggedElement;


async function init(){
    await loadTasks();
    await loadContacts();
    await loadCat();
    updateHTML();
}


//<----------------------------------------- UpdateHTML-Function for Drag & Drop -------------------------------------->


/**
 * This function is updating the current HTML ensure every content inside an array is displayed
 */
function updateHTML(){
    let boxCount = 0;
    for (let i = 0; i < container.length; i++) {
        let box = document.getElementById(container[i]);
        let task = tasks.filter(t => t['status'] === stat[i]);
        box.innerHTML = '';
        for (let j = 0; j < task.length; j++) {
            const element = task[j];
            let category = element['category'][0];
            box.innerHTML += generateTaskCard(element, category, boxCount);
            getCategoryColor(element['category'][0]['category'], boxCount);
            checkForSubtask(element, boxCount);
            renderContactInitials(element);
            boxCount++;
        }
        box.innerHTML += `<div class="dragbox-shadow d-none" id="${stat[i]}-shadow"></div>`;
    }
}

function getCategoryColor(element, boxCount){
    let categoryToSearch = categoryColors.filter(t => t['category'] === element);
    let color = categoryToSearch[0]['color'];
    document.getElementById(`category-tag${boxCount}`).style = `background-color: ${color};`
}

function checkForSubtask(element, boxCount){
    let subtask = element['subtask'][0]['subtask_Name'];
    if(subtask.length > 0){
        document.getElementById(`progressContainer${boxCount}`).classList.remove('d-none');
        setProgress(element, boxCount);
    }
}

function setProgress(element, boxCount){
    const counts = {};
    let numberToDivide = 100;
    let arrayToSearch = element['subtask'][0]['checked'];
    for (let i = 0; i < arrayToSearch.length; i++) {
        counts[arrayToSearch[i]] = (counts[arrayToSearch[i]] + 1) || 1;   
    }
    console.log(counts);
    
    let currentProgress = 100 / (arrayToSearch.length/counts['true']);
    if(!currentProgress){
        currentProgress = 0;
    }
    
    console.log(currentProgress)
    setNewProgress(currentProgress, boxCount, arrayToSearch, counts, currentProgress);
}

function setNewProgress(percentage, boxCount, arrayToSearch, counts, currentProgress){
    let progressBar = document.getElementById(`progress${boxCount}`);
    if (currentProgress > 0) {
        progressBar.innerHTML = `${counts['true']}/${arrayToSearch.length}`; 
    }else {
        progressBar.innerHTML = `0/${arrayToSearch.length}`;
    }
    
    progressBar.classList.add(`w-${percentage}`);
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



function hideAllTaskBoxes(){
    for (let i = 0; i < tasks.length; i++) {
        document.getElementById(`taskBox${i}`).classList.add('d-none');
        
    }
}


//<--------------------------------------------- Open and Close PopUps ------------------------------------------->

function openAddTask(status){
    document.getElementById('add-task-overlay').style.transform = 'translateX(0)';
    if(status){
        document.getElementById('create-task-button').setAttribute("onClick", `createTask('${status}')`)
    }
}

function closeAddTask(){
    document.getElementById('add-task-overlay').style.transform = 'translateX(3500px)';
}


function openTaskPopUp(id){
    renderPopUpDetails(id);
    renderAssignedContacts(id);
    document.getElementById('task-popup-background').classList.remove('d-none');
}

function closeTaskPopUp(){
    document.getElementById('task-popup-background').classList.add('d-none');
}

function renderPopUpDetails(id){
    let taskPopUp = document.getElementById('popup-content');
    let index = getIndexOfTask(id);
    taskPopUp.innerHTML = '';
    taskPopUp.innerHTML += generatePopUpHTML(tasks[index], index);
}

function renderAssignedContacts(id){
    let assignedContactsBox = document.getElementById('task-popup-contacts');
    let index = getIndexOfTask(id);
    assignedContactsBox.innerHTML = '';
    let contactsToDisplay = tasks[index]['assigned'];

    for (let i = 0; i < contactsToDisplay.length; i++) {
        const contact = contactsToDisplay[i];
        assignedContactsBox.innerHTML += generateTaskPopupContacts(contact);
    }
}

function renderContactInitials(element){
    let contactBox = document.getElementById(`assigned-contacts${element['id']}`)
    let assignedContacts = element['assigned'];
    contactBox.innerHTML = '';

    for (let i = 0; i < assignedContacts.length; i++) {
        if(assignedContacts.length >= 4){
            const contact1 = assignedContacts[0];
            const contact2 = assignedContacts[1];
            contactBox.innerHTML += generateSmallContactBubbles(contact1);   
            contactBox.innerHTML += generateSmallContactBubbles(contact2);   
            contactBox.innerHTML += generateSmallNumberBubble(assignedContacts);
            break;
        } else {
            const contact = assignedContacts[i];
            contactBox.innerHTML += generateSmallContactBubbles(contact);
        }     
    }
    
}

async function deletePopupTask(i) {
    tasks.splice(i, 1);
    await saveTask();
    updateHTML();
    closeTaskPopUp();
}




/**
 * Returns first letter of the name as a uppercase letter
 * 
 * @param {string} contactName - Name of contact
 * @returns {string} - first letter of the name of the contact as a uppercase letter
 */
function getFirstChar(contactName) {
    let name = contactName;
    let char = name.charAt(0);
    char = char.toUpperCase();
    return char;
}

/**
 * Returns the first letter of the lastname as a uppercase letter
 * 
 * @param {string} contactName - Name of contact
 * @returns {string} - first letter of the lastname as a uppercase letter
 */
function getFirstCharofLastname(contactName) {
    let name = contactName;
    let index = name.lastIndexOf(' ');
    let char = name.charAt(index + 1);
    char = char.toUpperCase();
    return char;
}