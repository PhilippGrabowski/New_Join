//<----------------------------------------------- generate HTML functions ---------------------------------------------------------------->
function generateTaskCard(element){
    return /*html*/`
        <div draggable="true" onclick="openTaskPopUp(${element['id']})" ondragstart="startDragging(${element['id']})" class="board-task-box flex-column">
            <div>
                <span class="category-tag">${element['category']}</span>
                <h3>${element['title']}</h3>
                <p>${element['description']}</p>
                <div>
                    <p>${element['assigned']}</p>
                    <img src="./src/img/low.svg">
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
        <h1 class="task-popup-headline task-popup-margin">${clickedElement['title']}</h1>
        <span class="task-popup-descritpion task-popup-margin"></span>
        <span class="flex-row task-popup-margin"><h3>Due date:</h3> ${clickedElement['duedate']}</span>
        <span class="flex-row task-popup-margin"><h3>Priority:</h3> ${clickedElement['priority']}</span>
        <span class="flex-row task-popup-margin"><h3>Assigned To:</h3></span>
        <div class="flex-column task-popup-margin" id="task-popup-contacts">
        
        </div>
    `;
}

function generateTaskPopupContacts(contact){
    return /*html*/`
        <div class="flex-row">
            <div class="contact-initials" id="contact-first-chars">

            </div>
            <p>${contact['name']}</p>
        </div>
    `;
}