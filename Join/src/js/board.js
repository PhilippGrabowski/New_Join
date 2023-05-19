let taskInProgress = [];

let taskAwaitingFeedback = [];

let taskDone = [];

//<----------------------------------------- UpdateHTML-Function for Drag & Drop -------------------------------------->

function updateHTML(){
    updateToDo();
    updateTaskInProgress();
    updateTaskAwaitingFeedback();
    updateTaskDone();
}

function updateToDo(){
    let open = tasks.filter(t => t['status'] == 'open');
    document.getElementById('board-to-do').innerHTML = '';

    for (let i = 0; i < open.length; i++) {
        const element = open[i];
        document.getElementById('board-to-do').innerHTML += generateTaskCard(element);
    }
}

function updateTaskInProgress(){
    let open = tasks.filter(t => t['status'] == 'progress');
    document.getElementById('board-in-progress').innerHTML = '';

    for (let i = 0; i < open.length; i++) {
        const element = open[i];
        document.getElementById('board-in-progress').innerHTML += generateTaskCard(element);
    }
}

function updateTaskAwaitingFeedback(){
    let open = tasks.filter(t => t['status'] == 'feedback');
    document.getElementById('board-awaiting-feedback').innerHTML = '';

    for (let i = 0; i < open.length; i++) {
        const element = open[i];
        document.getElementById('board-awaiting-feedback').innerHTML += generateTaskCard(element);
    }
}

function updateTaskDone(){
    let open = tasks.filter(t => t['status'] == 'done');
    document.getElementById('board-task-done').innerHTML = '';

    for (let i = 0; i < open.length; i++) {
        const element = open[i];
        document.getElementById('board-task-done').innerHTML += generateTaskCard(element);
    }
}

function generateTaskCard(element){
    return /*html*/`
        <div class="task-container flex-column" id="board-to-do">
            <div class="board-task-box">
                <span>${element['category']}</span>
                <h3>${element['title']}</h3>
                <p>${element['description']}</p>
            </div>
        </div>
    `; 
}


//<--------------------------------------------- Open and Close Add-Task Window on Board.html ------------------------------------------->

function openAddTask(){
    document.getElementById('add-task-overlay').style.transform = 'translateX(0)';
}

function closeWindow(){
    document.getElementById('add-task-overlay').style.transform = 'translateX(2000px)';
}