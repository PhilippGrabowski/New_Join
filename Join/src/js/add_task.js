const STORAGE_TOKEN = 'D4DBS7MA276TXS8PQ3TJKAHG12EW5IEPOBMLYDL9';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let tasks = [];
let priorities = [
    { priority: 'urgent', color: 'red' },
    { priority: 'medium', color: 'orange' },
    { priority: 'low', color: 'green' },
]
let prio;

function createTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let category = document.getElementById('selectedCategory');
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

function setSelectedColor(id) {
    let selected = document.getElementById(`${priorities[id].priority}`);
    selected.style.backgroundColor = `${priorities[id].color}`;
    let selectedImg = document.getElementById(`img-${priorities[id].priority}`);
    selectedImg.style = `filter: brightness(0) invert(1)`;
    selected.style.color = `white`;
    
}

function resetSelectedColor(id) {
    for (let i = 0; i < priorities.length; i++) {
        if(i != id)
        {
            document.getElementById(`${priorities[i].priority}`).style.backgroundColor = 'white';
            document.getElementById(`${priorities[i].priority}`).style.color = 'black';
            document.getElementById(`img-${priorities[i].priority}`).style = `filter: brightness(1) invert(0)`;
        }
        
    }
}
