//<----------------------------------------------- generate HTML functions ---------------------------------------------------------------->
function generateTaskCard(element){
    return /*html*/`
        <div draggable="true" onclick="openTaskPopUp(${element['id']})" ondragstart="startDragging(${element['id']})" class="board-task-box flex-column">
            <div>
                <span class="category-tag">${element['category']}</span>
                <h3>${element['title']}</h3>
                <p>${element['description']}</p>
                <div>
                    <div class="assigned-contacts" id="assigned-contacts">

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

function generatePopUpHTML(clickedElement){
    return /*html*/`
        <span class="category-tag task-popup-margin">${clickedElement['category']}</span>
        <h1 class="task-popup-headline-main task-popup-margin">${clickedElement['title']}</h1>
        <span class="task-popup-text task-popup-margin"></span>
        <span class="flex-row task-popup-margin task-popup-text"><h3 class="task-popup-headline-secondary">Due date:</h3> ${clickedElement['duedate']}</span>
        <span class="flex-row task-popup-margin task-popup-text"><h3 class="task-popup-headline-secondary">Priority:</h3> ${clickedElement['priority'][0]['priority']}</span>
        <span class="flex-row task-popup-margin task-popup-text"><h3 class="task-popup-headline-secondary">Assigned To:</h3></span>
        <div class="flex-column" id="task-popup-contacts">
        
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