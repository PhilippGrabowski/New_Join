const STORAGE_TOKEN = 'D4DBS7MA276TXS8PQ3TJKAHG12EW5IEPOBMLYDL9';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let tasks = [];
let priorities = [
    { priority:'urgent', color : 'red' },
    { priority:'medium', color : 'orange' },
    { priority:'low', color : 'green' },
]
let prio;

function createTask(){
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let category = document.getElementById('selectedCategory');
}

function openCategories(){
    let showCat = document.getElementById('showCat');
    showCat.classList.toggle('d-none');
    let checkBottomBorder = !showCat.classList.contains('d-none');
    if(checkBottomBorder){
        document.getElementById('category').style.borderBottomLeftRadius = "0px";
        document.getElementById('category').style.borderBottomRightRadius = "0px";
        document.getElementById('category').style.borderBottom = "none";
    }
    else{
        document.getElementById('category').style.borderBottomLeftRadius = "8px";
        document.getElementById('category').style.borderBottomRightRadius = "8px";
        document.getElementById('category').style.borderBottom = "1px solid lightgray";
    }
}
