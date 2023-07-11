
let container = ['board-to-do', 'board-in-progress', 'board-awaiting-feedback', 'board-task-done'];
let stat = ['to-do', 'in-progress', 'awaiting-feedback', 'done'];
let previousProgress;
let currentDraggedElement;
let currentOpenedTask;
let changedPrio;


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
            checkDescriptionLength(element['description'], boxCount);
            getCategoryColor(element['category'][0]['category'], boxCount);
            checkForSubtask(element, boxCount);
            renderContactInitials(element);
            boxCount++;
        }
        box.innerHTML += `<div ondrop="moveTo(${stat[i]})" class="dragbox-shadow d-none" id="${stat[i]}-shadow"></div>`;
    }
}

/**
 If the description in a task is too long for the task box on the board, this function shortens the text to fit. Full description is available in the popup.
 */

function checkDescriptionLength(element, boxCount){
    let descriptionBox = document.getElementById(`board-task-box-description${boxCount}`);
    if (element.length > 30) {
        let shortenedText = element.slice(0, 35);
        descriptionBox.innerHTML = `${shortenedText}...`;
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

/**
    Checks the progress on subtasks and fills the progressbar accordingly.
 */

function setProgress(element, boxCount){
    const counts = {};
    let arrayToSearch = element['subtask'][0]['checked'];
    for (let i = 0; i < arrayToSearch.length; i++) {
        counts[arrayToSearch[i]] = (counts[arrayToSearch[i]] + 1) || 1;   
    }
    
    let currentProgress = 100 / (arrayToSearch.length/counts['true']);
    if(!currentProgress){
        currentProgress = 0;
    }

    let progressBar = document.getElementById(`progress${boxCount}`);
    let countContainer = document.getElementById(`countContainer${boxCount}`);
    if (currentProgress > 0) {
        countContainer.innerHTML = `${counts['true']}/${arrayToSearch.length} Done`; 
    }else {
        countContainer.innerHTML = `0/${arrayToSearch.length} Done`;
    };
    progressBar.style = `width: ${currentProgress}%`;
}



function checkForSubtaskPopUp(element, boxCount){
    let subtask = element['subtask'][0]['subtask_Name'];
    if(subtask.length > 0){
        document.getElementById(`progressContainer`).classList.remove('d-none');
        setPopUpProgress(element, boxCount);
    }
}





/**
 * This is changing the subtask status between done and undone. After changing, the progressbar will be rerendered.
 * @param {The position of the subtask in the array} count 
 */
async function changeSubtaskStatus(count){
    let checkbox = document.getElementById(`subtaskCheckbox${count}`);
    let currentTask = getCurrentTask();
    if(checkbox.checked){
        checkbox.checked = true;
        currentTask['subtask'][0]['checked'][count] = 'true';
        await saveRemote();
    } else{
        checkbox.checked = false;
        currentTask['subtask'][0]['checked'][count] = 'false';
        await saveRemote();
    }
    
      setPopUpProgress(currentTask, count +1000);
}


/**
 * This is changing the progressbar after a subtask has been checked.
 * @param {The current opened task in the popup} element 
 */
function setPopUpProgress(element){
    const counts = {};
    let arrayToSearch = element['subtask'][0]['checked'];
    for (let i = 0; i < arrayToSearch.length; i++) {
        counts[arrayToSearch[i]] = (counts[arrayToSearch[i]] + 1) || 1;   
    }
    
    let currentProgress = 100 / (arrayToSearch.length/counts['true']);
    if(!currentProgress){
        currentProgress = 0;
    } else {
        currentProgress = currentProgress.toFixed(0);
    }

    let progressBar = document.getElementById(`progress`);
    let subtaskContainer = document.getElementById(`count-container`);
    if (currentProgress > 0) {
       subtaskContainer.innerHTML = `<div>${counts['true']}/${arrayToSearch.length} Done</div>`;
    }else {
        subtaskContainer.innerHTML = `<div>0/${arrayToSearch.length} Done</div>`;
    };
    progressBar.style = `width: ${currentProgress}%`;
}

function getCurrentTask(){
   let currentPopUpHeadline = document.getElementsByClassName('task-popup-headline-main task-popup-margin');
   let currentHeadlineText = currentPopUpHeadline[0]['innerText'];
   let currentElement = tasks.filter(t => t['title'] === currentHeadlineText);
   return currentElement[0];
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

async function openAddTask(status){
    let addTaskOverlay = document.getElementById('add-task-overlay');
    let profilePic = document.getElementById('profile_img');
    let createTaskButton = document.getElementById('create-task-button');
    if (window.innerWidth < 901) {
        addTaskOverlay.classList.remove('hide-mobile');
        profilePic.classList.add('d-none');
        createTaskButton.classList.add('reposition-create-task-button');
    }
    document.getElementById('add-task-overlay').style.transform = 'translateX(0)';
    if(status){
        document.getElementById('create-task-button').setAttribute("onclick", `createTask('${status}')`)
    }
}

function closeAddTask(){
    let addTaskOverlay = document.getElementById('add-task-overlay');
    let profilePic = document.getElementById('profile_img');
    let createTaskButton = document.getElementById('create-task-button');
    if (window.innerWidth < 901) {
        addTaskOverlay.classList.add('hide-mobile');
        profilePic.classList.remove('d-none');
        createTaskButton.classList.remove('reposition-create-task-button');    
    }
    document.getElementById('add-task-overlay').style.transform = 'translateX(3000px)';
    
}


function openTaskPopUp(id){
    renderPopUpDetails(id);
    renderSubtasks(id);
    renderAssignedContacts(id);
    getCheckBoxStatus(id);
    
    document.getElementById('task-popup-background').classList.remove('d-none');
}

function closeTaskPopUp(){
    currentOpenedTask = '';
    updateHTML();

    document.getElementById('task-popup-background').classList.add('d-none');
}


/**
 * This function checks whether a subtask has already been done or not
 * @param {Id of the currently opened task in the popup} id 
 */
function getCheckBoxStatus(id){
    let index = getIndexOfTask(id)
    let currentTask = tasks[index];
    let checkedStatus = currentTask['subtask'][0]['checked'];

    for (let i = 0; i < checkedStatus.length; i++) {
        const element = checkedStatus[i];
        if (element == 'true') {
            document.getElementById(`subtaskCheckbox${i}`).checked = true;
        } else {
            document.getElementById(`subtaskCheckbox${i}`).checked = false;
        }
    }
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

function renderSubtasks(id){
    let index = getIndexOfTask(id);
    let subtaskContainer = document.getElementById(`subtask-container`);
    let temporaryArray = tasks.filter(t => t['id'] === id);
    let subtaskArray = temporaryArray[0]['subtask'][0]['subtask_Name'];
    for (let i = 0; i < subtaskArray.length; i++) {
        const subtask = subtaskArray[i];
        subtaskContainer.innerHTML += generateSubtaskSection(subtask, i);
    }
    subtaskContainer.innerHTML += generatePopUpProgressBar(index);
    checkForSubtaskPopUp(tasks[index], index +1000);
}

/**
 * This renders the initials of assigned contacts into bubbles. If more than three contacts are assigned it will display two bubbles with initals and one with the number of additional assigned contacts.
 * @param {Currently opened task in popup} element 
 */
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

/*<-------------------------------------------------- functions for edit task ------------------------------------------> */

/**
 * This deletes the contents of the popup window and replaces it with inputs to edit the currently opened task.
 * @param {index of task to edit} index 
 */

function editTask(index){
    let popUpWindow = document.getElementById('popup-content');
    let currentTask = tasks[index];
    changedPrio = currentTask;
    popUpWindow.innerHTML = '';

    popUpWindow.innerHTML = generateEditPopUp(currentTask, index);
    currentOpenedTask = currentTask;
    getPrioColor(currentTask);
    fillContacts(currentTask);
    checkForAssignedStatus(currentTask);
    renderContactInitials(currentTask);
}

/**
 * Checks the prio of the opened task and highlights the set prio-button.
 * @param {currently opened task} currentTask 
 */
function getPrioColor(currentTask){
    let currentPrio = currentTask['priority'][0]['priority'];
    let currentColor = currentTask['priority'][0]['color'];
    let prioImage = document.getElementById(`img-${currentPrio}-popUp`);
    let currentButton = document.getElementById(`${currentPrio}PopUp`);
    currentButton.style.backgroundColor = `${currentColor}`;
    prioImage.style = `filter: brightness(0) invert(1)`;
    currentButton.style.color = 'white';
}

function changePrio(i){
    let newPrio = priorities[i]['priority'];
    let newColor = priorities[i]['color'];
    changedPrio['priority'][0]['priority'] = newPrio;
    changedPrio['priority'][0]['color'] = newColor;
    getPrioColor(changedPrio);
    resetUnselectedColor(changedPrio['priority'][0]['priority']);
}

/**
 * After changing the prio of a task via button, this checks for the new prio and highlights the right button.
 * @param {new set prio} newPrio 
 */
function resetUnselectedColor(newPrio){
    if (newPrio == 'urgent') {
        document.getElementById('mediumPopUp').style = '';
        document.getElementById('img-medium-popUp').style = '';
        document.getElementById('lowPopUp').style = '';
        document.getElementById('img-low-popUp').style = '';
    }
    if (newPrio == 'medium') {
        document.getElementById('urgentPopUp').style = '';
        document.getElementById('img-urgent-popUp').style = '';
        document.getElementById('lowPopUp').style = '';
        document.getElementById('img-low-popUp').style = '';
    }
    if (newPrio == 'low') {
        document.getElementById('mediumPopUp').style = '';
        document.getElementById('img-medium-popUp').style = '';
        document.getElementById('urgentPopUp').style = '';
        document.getElementById('img-urgent-popUp').style = '';
    }
}

/**
 * Renders all available contacts into a hidden dropdown menu.
 */
function fillContacts(){
    let contactsContainer = document.getElementById('showAssignedPopUp');
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        contactsContainer.innerHTML += generateContactCheckbox(contact, i);
    }
    contactsContainer.innerHTML += `<div onclick="AddNewContact('assignedPopUp', 'showAssignedPopUp')" class="contact-container cursor">Invite New Contact</div>`;
}


/**
 * When the assigned dropdown menue is opened, this checks which contacts have already been assigned to the task and checks them.
 * @param {currently opened task} currentTask 
 */
function checkForAssignedStatus(currentTask){
    let assignedPeople = currentTask['assigned'];
    let namesToCheck = [];
    for (let i = 0; i < assignedPeople.length; i++) {
        const contactName = assignedPeople[i]['name'];
        namesToCheck.push(contactName);
    }
    for (let i = 0; i < contacts.length; i++) {
        const contactName = contacts[i]['name'];
        let currentNameToCheck = document.getElementById(`contactName${i}`).innerText;
        let currentCheckbox = document.getElementById(`tickIdPopUp${i}`);
        let indexOfName = getIndexOfName(currentNameToCheck, namesToCheck);
        if (indexOfName > -1) {
            currentCheckbox.checked = true;
        }
    }
}

function getIndexOfName(name, arr){
    let index = arr.indexOf(name);
    return index;
}

let changedAssignedContacts = [];

/**
 * Either adds or removes a contact from the assigned list of the opened task.
 * @param {position of a contact in contacs array} i 
 */
function assignTaskPopUp(i){
    let checkbox = document.getElementById(`tickIdPopUp${i}`);
    let alreadyAssignedContacts = currentOpenedTask['assigned'];
    let contactToAssign = contacts[i];
    if (!checkbox.checked) {
        alreadyAssignedContacts.push(contactToAssign);
        checkbox.checked = true;
    } else {
        removeObjectWithId(alreadyAssignedContacts, contacts[i].id);
        checkbox.checked = false;
    }
    renderContactInitials(currentOpenedTask);
}


/**
 * saves all the changes of edit task. CAUTION: THIS DOESN'T SAVE TO REMOTE STORAGE!!!
 * @param {index of the opened task} index 
 */
 async function saveChanges(index){
    let currentTask = tasks[index];
    let newTitle = document.getElementById('newTitle').value;
    let newDescription = document.getElementById('newDescription').value;
    let newDueDate = document.getElementById('newDueDate').value;
    let newPrio = changedPrio['priority'][0]['priority'];
    let newPrioColor = changedPrio['priority'][0]['color'];
    await pushChanges(currentTask, newTitle, newDescription, newDueDate);
    updateHTML();
}

/**
 * pushes changes from edited task to the tasks array and saves them in remote storage.
 * @param {current opened task} currentTask 
 * @param {new title from edit task} newTitle 
 * @param {new description from edit task} newDescription 
 * @param {new duedate from edit task} newDueDate 
 */
async function pushChanges(currentTask, newTitle, newDescription, newDueDate){
    let assignedContacts = currentTask['assigned']
    currentTask['title'] = newTitle;
    currentTask['description'] = newDescription;
    currentTask['duedate'] = newDueDate;
    await pushContacts(assignedContacts)
    await saveRemote();
    openTaskPopUp(currentTask['id']);
    changedAssignedContacts.splice(0, changedAssignedContacts.length);
}

/**
 * This combines the changed assigned contacts and the already existing assignations into one array and then removes all the duplicates.
 * @param {assigned contacts before the edit} assignedContacts 
 */
async function pushContacts(assignedContacts){
    for (let i = 0; i < changedAssignedContacts.length; i++) {
        const contact = changedAssignedContacts[i];
        const contactName = contact['name'];
        assignedContacts.push(contact);
    }
    let cleanedArray = removeDuplicateObjects(assignedContacts);
    assignedContacts.splice(0, assignedContacts.length);
    for (let i = 0; i < cleanedArray.length; i++) {
        const element = cleanedArray[i];
        assignedContacts.push(element);
    }

}

function removeDuplicateObjects(arr) {
    const uniqueObjects = [];
    const keys = new Set();
  
    for (const obj of arr) {
      const key = JSON.stringify(obj);
      if (!keys.has(key)) {
        keys.add(key);
        uniqueObjects.push(obj);
      }
    }
    return uniqueObjects;
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

function searchForTask(){
    let searchWord = document.getElementById('search-task').value;
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        if (!element['title'].toUpperCase().includes(searchWord.toUpperCase())) {
            document.getElementById(`taskBox${element['id']}`).classList.add('d-none');
        } else {
            document.getElementById(`taskBox${element['id']}`).classList.remove('d-none');
        }
    }
        
}