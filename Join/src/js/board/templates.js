//<----------------------------------------------- generate HTML functions ---------------------------------------------------------------->
function generateTaskCard(element, category, boxCount){
    return /*html*/`
        <div id="taskBox${element['id']}" draggable="true" onclick="openTaskPopUp(${element['id']})" ondragstart="startDragging(${element['id']})" class="board-task-box flex-column">
            <div>
                <span id="category-tag${boxCount}" class="category-tag" style="background-color:${category['color']};">${category['category']}</span>
                <h3>${element['title']}</h3>
                <div class="board-task-box-description">${element['description']}</div>
                <div class="flex-row" style="justify-content: space-between;">
                <div id="progressContainer${boxCount}" class="progress d-none" role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 80%;">
                <div id="progress${boxCount}"  class="progress-bar"></div>
                </div>
                <div id="countContainer${boxCount}"></div>
                </div>
                <div class="contacts-urgency-box">
                    <div class="assigned-contacts" id="assigned-contacts${element['id']}">

                    </div>
                    <img src="./src/img/${element['priority'][0]['priority']}.svg">
                </div>
                
            </div>
        </div>
    `; 
}

function generateBoxShadow(container){
    return /*html*/`
    <div class="dragbox-shadow d-none" id="dragbox-shadow-${container}"></div>
    `;
}

function generatePopUpHTML(clickedElement, index){
    return /*html*/`
        <span class="category-tag task-popup-margin" style="background-color:${clickedElement['category'][0]['color']};">${clickedElement['category'][0]['category']}</span>
        <h1 id="popUpHeadline${clickedElement['id']}" class="task-popup-headline-main task-popup-margin">${clickedElement['title']}</h1>
        <span class="task-popup-text task-popup-margin">${clickedElement['description']}</span>
        <span class="flex-row task-popup-margin task-popup-text"><h3 class="task-popup-headline-secondary">Due date:</h3> ${clickedElement['duedate']}</span>
        <span class="flex-row task-popup-margin task-popup-text"><h3 class="task-popup-headline-secondary">Priority:</h3><div class="popup-urgency" style="background-color: ${clickedElement['priority'][0]['color']};"> ${clickedElement['priority'][0]['priority']}<img src="./src/img/${clickedElement['priority'][0]['priority']}.svg"></div></span>
        <div id="subtask-container" class="subtask-container"></div>
        <span class="flex-row task-popup-margin task-popup-text"><h3 class="task-popup-headline-secondary">Assigned To:</h3></span>
        <div class="flex-column" id="task-popup-contacts">
        
        </div>
        <div class="flex-row delete-and-edit-task">
                <img onclick="deletePopupTask(${index})" class="hover-white-button" src="src/img/deletebutton-task-popup.svg">
                <div class="edit-task button-hover">
                    <img src="src/img/edit-task-popup.svg">
                </div>
        </div>
    `;
}

function generateTaskPopupContacts(contact){
    return /*html*/`
        <div class="assigned-contact-box">
            <div class="contact-initials" id="contact-first-chars" style="background-color: ${contact['color']}">
                ${contact['initials']}
            </div>
            <p class="task-popup-text">${contact['name']}</p>
        </div>
    `;
}

function generateSmallContactBubbles(contact){
    return /*html*/`
    <div class="small-contact-bubble" style="background-color: ${contact['color']};">
        ${contact['initials']}
    </div>
    `;
}

function generateSmallNumberBubble(assignedContacts){
    return /*html*/`
    <div class="small-number-bubble">
        +${(assignedContacts.length - 2)}
    </div>
    `;
}

function generateSubtaskSection(subtask, count){
    return /*html*/`
    <div class="flex-row subtask-checkbox-popup"><input class="form-check-input" id="subtaskCheckbox${count}" onchange="checkBoxStatus(${count})" type="checkbox">${subtask}</div>
    
    `;
}

function generatePopUpProgressBar(count){
    return /*html*/`
    <div id="bar-and-count-container">
    <div id="progressContainer" class="progress progressPopUp d-none" role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
        <div id="progress"  class="progress-bar"></div>
    </div>
    <div id="count-container"></div>
    </div>
    `;
}