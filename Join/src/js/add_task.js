const STORAGE_TOKEN = 'D4DBS7MA276TXS8PQ3TJKAHG12EW5IEPOBMLYDL9';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
loadTasks();
let tasks = [
    {
        'title': 'Test',
        'description': 'Test',
        'duedate': 'Test',
        'priority': 'Test',
        'category': 'Test',
        'status': 'open'
    },
    {
        'title': 'Test',
        'description': 'Test',
        'duedate': 'Test',
        'priority': 'Test',
        'category': 'Test',
        'status': 'progress'
    },
    {
        'title': 'Test',
        'description': 'Test',
        'duedate': 'Test',
        'priority': 'Test',
        'category': 'Test',
        'status': 'feedback'
    },
    {
        'title': 'Test',
        'description': 'Test',
        'duedate': 'Test',
        'priority': 'Test',
        'category': 'Test',
        'status': 'done'
    }
];
let priorities = [
    { priority: 'urgent', color: 'red' },
    { priority: 'medium', color: 'orange' },
    { priority: 'low', color: 'green' },
]
let prio;
let categoryColors = [
    { color: 'red' },
    { color: 'green' },
    { color: 'purple' },
]


function createTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let category = document.getElementById('selectedCategory');
    let dueDate = document.getElementById('dueDate');

    if (title.value != 0 && description.value != 0 && category.textContent != 0 && dueDate.value != 0) {
        tasks.push(pushTask(title, description, dueDate, prio, category));
        saveTask();
    }
    
}
async function saveTask(){
    
   await setTask('task', JSON.stringify(tasks));
}

function pushTask(title, description, duedate, prio, category) {
    let task = {
        'title': title.value,
        'description': description.value,
        'duedate': duedate.value,
        'priority': prio,
        'category': category.textContent,
        'status': 'open'
    }
    return task;
}

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

function selectedPrio(selected) {
    prio = priorities[selected].priority;
    setSelectedColor(selected);
    resetSelectedColor(selected);
}

function selectCategory(cat) {
    let category = document.getElementById(`${cat}`).textContent;
    document.getElementById('selectedCategory').innerHTML = `<div class="selected-category"><span>${category}</span><span class="circle" style="background-color:${categoryColors[cat].color}"></span></div>`
    document.getElementById('showCat').classList.add('d-none');
    document.getElementById('category').style.borderBottom = "1px solid lightgray";
    document.getElementById('category').style.borderBottomLeftRadius = "8px";
    document.getElementById('category').style.borderBottomRightRadius = "8px";
    console.log(category);
}

function setSelectedColor(id) {
    let selected = document.getElementById(`${priorities[id].priority}`);
    selected.style.backgroundColor = `${priorities[id].color}`;
    let selectedImg = document.getElementById(`img-${priorities[id].priority}`);
    selectedImg.style = `filter: brightness(0) invert(1)`;
    selected.style.color = `white`;

}

function resetSelectedColor(id) {
    for (let i = 0; i < priorities.length; i++) {
        if (i != id) {
            document.getElementById(`${priorities[i].priority}`).style.backgroundColor = 'white';
            document.getElementById(`${priorities[i].priority}`).style.color = 'black';
            document.getElementById(`img-${priorities[i].priority}`).style = `filter: brightness(1) invert(0)`;
        }

    }
}

function closeAddTask() {
    document.location = "board.html";
}


async function setTask(key, value) {

    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) }).then(res => res.json());
}

async function getTask(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        }
        else {
            return res;
        }

    });
}

async function loadTasks() {
    tasks = JSON.parse(await getTask('task'));
}

function deleteTask() {
    tasks.splice(0, 1);
    saveTask();
}
