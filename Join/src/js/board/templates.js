//<----------------------------------------------- generate HTML functions ---------------------------------------------------------------->
function generateTaskCard(element){
    return /*html*/`
        <div draggable="true" onclick="openTaskPopUp(${element['id']})" ondragstart="startDragging(${element['id']})" class="board-task-box flex-column">
            <div>
                <span>${element['category']}</span>
                <h3>${element['title']}</h3>
                <p>${element['description']}</p>
                <div>
                    <p>${element['assigned']}</p>
                    <img src="New_Join\Join\src\img\low.svg">
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
        <span>${clickedElement['category']}</span>
        <h2>${clickedElement['title']}</h2>
        <p>Due date: ${clickedElement['duedate']}</p>
        <p>Priority: ${clickedElement['priority']}</p>
        <div class="flex-column">
            
        </div>
    `;
}