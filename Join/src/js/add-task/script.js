let firstRender = true;

let checkTitle, checkDesc, checkCat, checkAssigned, checkDate, checkPrio = false;

let isColorPicked = false;

let startTimer = true;

let subtaskName = [];

let bool = [];

let hasBeenClicked = 0;

let low = 0;

let medium = 0;

let urgent = 0;

let subtasks = [
    {
        "checked": bool,
        "subtask_Name": subtaskName
    }
];

let today = new Date().toISOString().split("T")[0];

let colorType = [
    { color: 'lightblue' },
    { color: 'red' },
    { color: 'green' },
    { color: 'orange' },
    { color: 'pink' },
    { color: 'blue' },
]

let selectedColor = [];


/* The above code is declaring an array of objects called "priorities". Each object has two properties:
"priority" and "color". The "priority" property is a string that represents the level of priority
(e.g. "urgent", "medium", "low"), and the "color" property is a string that represents the color
associated with that priority level. These priorities and colors can be used in a web application to
visually distinguish tasks or items based on their level of importance. */
let priorities = [
    { priority: 'urgent', color: 'var(--red-color)' },
    { priority: 'medium', color: 'var(--lightOrange-color)' },
    { priority: 'low', color: 'var(--lightGreen-color)' },
]

// The Priority Array that the chosen Priority gets pushed into and saved alongside with the Task
let prio = [];

/* The above code is defining an array of objects called `categoryColors`. Each object has two
properties: `color` and `category`. The `color` property specifies a color and the `category`
property specifies a category. This array can be used to assign colors to different categories in a
web application or any other project. */
let categoryColors = [
    {
        color: 'red',
        category: 'Media'

    },
    {
        color: 'green',
        category: 'Web'

    },
    {
        color: 'purple',
        category: 'Testing'
    }
]

// The Category Array that ended up being chosen by the User gets pushed into the category
let category = []

// The Contacts Array where all the Members that have been chosen to take care of the Task 
let assignedContacts = []


// Loads the Categories that have been created and saved when the site gets refreshed 
loadCat();

/**
 * The function creates a task with user input and saves it to a list of tasks, then redirects to a
 * board page.
 * @param status - The status parameter is likely a boolean value that indicates whether the task
 * creation process should be closed and the HTML updated after the task is created.
 */
async function createTask(status) {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let dueDate = document.getElementById('dueDate');
    let taskStatus = checkStatus(status);
    let dragId = getId();
    if (checkValidationOnInputs() == true) {
        tasks.push(pushTask(title, description, dueDate, prio, category, subtasks, assignedContacts, taskStatus, dragId));
        await saveTask();
        window.location = './board.html';
    } if (status) { closeAddTask(); updateHTML(); }
}

function renderDate() {
    let currentDate = document.getElementById('dueDate');
    currentDate.value = today;
    currentDate.setAttribute('min', today);
}

async function delayDate() {
       setTimeout(renderDate, 300);
    }

/**
 * The function checks if a checkbox is checked and updates a boolean array accordingly.
 * @param i - The parameter "i" is a number that represents the index of a subtask. It is used to
 * identify the specific checkbox element that is being checked or unchecked.
 */
function checkSubtask(i) {
    let checkbox = document.getElementById(`subtask${i}`);
    if (checkbox.checked) { bool[i] = "true"; }
    else if (!checkbox.checked) { bool[i] = "false"; }
}

/**
 * The function checks if a status is provided and returns it, otherwise it returns 'to-do'.
 * @param status - The parameter "status" is a variable that represents the current status of a task or
 * item. It can be any value, but it is expected to be a string that describes the status of the task,
 * such as "completed", "in progress", or "not started". If the status is not
 * @returns If the `status` parameter is truthy, it will be returned. Otherwise, the string `'to-do'`
 * will be returned.
 */
function checkStatus(status) {
    if (status) { return status; }
    else { return 'to-do'; }
}



/**
 * The function creates a task object with various properties and returns it.
 * @param title - The title of the task (string).
 * @param description - The description of the task.
 * @param duedate - The due date of the task.
 * @param prio - priority of the task (can be a number or string)
 * @param category - The category parameter is used to specify the category of the task. It could be a
 * string value such as "work", "personal", "school", etc. This helps to organize and group tasks based
 * on their category.
 * @param subtasks - an array of subtasks associated with the main task
 * @param assignedContacts - This parameter is an array that contains the contacts assigned to the
 * task. It can be empty if no contacts are assigned.
 * @param taskStatus - The taskStatus parameter is used to indicate the current status of the task. It
 * can be set to values such as "in progress", "completed", "pending", etc.
 * @param DragId - The DragId parameter is likely used to identify the task when it is being dragged
 * and dropped within a user interface. It could be a unique identifier assigned to the task element,
 * allowing the program to track its movement and update its status accordingly.
 * @returns an object called `task` with properties such as `title`, `description`, `duedate`,
 * `priority`, `category`, `subtask`, `assigned`, `status`, and `id`. The values of these properties
 * are obtained from the arguments passed to the function.
 */
function pushTask(title, description, duedate, prio, category, subtasks, assignedContacts, taskStatus, DragId) {
    let task = {
        'title': title.value,
        'description': description.value,
        'duedate': duedate.value,
        'priority': prio,
        'category': category,
        'subtask': subtasks,
        'assigned': assignedContacts,
        'status': taskStatus,
        'id': DragId
    }
    return task;
}

/**
 * The function adds HTML code for a category dropdown menu with a default "Select a Category" option.
 */
function displayCategoryHTML() {
    let cat = document.getElementById('category');
    cat.classList.add('category-dropdown-div');
    cat.innerHTML = ` <div id="selectedCategory">Select a Category</div> <img class="cursor" src="src/img/dropdown-arrow.svg">`
}

/**
 * This function updates the category dropdown menu by removing the first category and adding a new one
 * with a color from the categoryColors array.
 */
function displayNewCategoryHTML() {
    category.splice(0, 1);
    let categoryColorsLength = categoryColors.length - 1;
    category.push({
        color: categoryColors[categoryColorsLength].color,
        category: categoryColors[categoryColorsLength].category
    });
    let cat = document.getElementById('category');
    cat.classList.add('category-dropdown-div');
    cat.innerHTML = returnDisplayNewCategoryHTML(categoryColorsLength);
}


/**
 * The function returns HTML code for displaying a selected category with a colored circle and a
 * dropdown arrow.
 * @param categoryColorsLength - The parameter `categoryColorsLength` is likely an integer representing
 * the index of the current category color being used in an array called `categoryColors`.
 * @returns a string of HTML code that includes a div element with an id of "selectedCategory" and a
 * span element with a class of "circle". The text content of the div element is the category name from
 * the categoryColors array at the specified index, and the background color of the span element is
 * also from the categoryColors array at the specified index. Additionally, an image element with
 */
function returnDisplayNewCategoryHTML(categoryColorsLength) {
    return `
    <div id="selectedCategory">
        ${categoryColors[categoryColorsLength].category}
        <span class="circle" style="background-color: ${categoryColors[categoryColorsLength].color};"></span>
    </div>
    <img class="cursor" src="src/img/dropdown-arrow.svg">`;
}

/**
 * This function displays categories and allows the user to create a new category with a dropdown menu
 * and color options.
 */
function displayCategories() {
    let show = document.getElementById('showCat');
    show.innerHTML = '';
    show.innerHTML = `<div onclick="createNewCategory(), displayCategoryColors()" class="cat">New Category</div>`;
    categoryColors.sort((a, b) => a.category.localeCompare(b.category));
    for (let i = 0; i < categoryColors.length; i++) {
        show.innerHTML += returnDisplayCategoriesHTML(i);
    }
}

/**
 * The function returns HTML code for displaying a category container with a category name and color
 * circle, as well as a delete button.
 * @param i - The index of the category in the `categoryColors` array.
 * @returns a string of HTML code that creates a container for a category. The container includes the
 * category name, a colored circle, and a trash icon for deleting the category. The onclick attribute
 * is also included to call the selectCategory() function when the container is clicked.
 */
function returnDisplayCategoriesHTML(i) {
    return `
    <div class="category-container" onclick="selectCategory(${i})">
        <div class="cat" id="${i}">
            ${categoryColors[i].category}<span class="circle" style="background-color: ${categoryColors[i].color};"></span>
        </div>
        <img class="add-task-trash-pic" src="src/img/trash.png" onclick="event.stopPropagation(), deleteCategory(${i})">
    </div>`;
}

/**
 * The function deletes a category from an array and updates the display.
 * @param i - The parameter "i" is an integer representing the index of the category to be deleted from
 * the "categoryColors" array.
 */
function deleteCategory(i) {
    let selectedCategory = document.getElementById('selectedCategory');
    if (selectedCategory.textContent == categoryColors[i].category) { selectedCategory.textContent = 'Select a Category'; }
    categoryColors.splice(i, 1);
    saveCat();
    displayCategories();
}


/**
 * The function creates a new category input field with options to add a new category name and choose a
 * color.
 */
function createNewCategory(){
    let show = document.getElementById('showCat');
    let categoryContainer = document.getElementById('category');
    categoryContainer.classList.remove('category-dropdown-div');
    categoryContainer.style = '';
    show.classList.add('d-none');
    categoryContainer.innerHTML = `
    <input id="newCatText" class="title-input" type="text" placeholder="New Category name" onclick="event.stopPropagation()">
        <img onclick="displayNewCategory(),event.stopPropagation() " class="tick-icon" src="src/img/tick.png">
        <img onclick="displayCategories(),event.stopPropagation(), displayCategoryHTML()" class="x-icon" src="src/img/x.png">
    <div id="categoryColors" onclick="event.stopPropagation()">
    
    </div>
    `;
}

/**
 * The function toggles the display of categories and adjusts the border radius and style of the
 * category element accordingly.
 */
function openCategories(){
    displayCategories();
    let showCat = document.getElementById('showCat');
    showCat.classList.toggle('d-none');
    let checkBottomBorder = !showCat.classList.contains('d-none');
    if (checkBottomBorder) {
        document.getElementById('category').style.borderBottomLeftRadius = "0px";
        document.getElementById('category').style.borderBottomRightRadius = "0px";
        document.getElementById('category').style.borderBottom = "none";
    } else {
        document.getElementById('category').style.borderBottomLeftRadius = "8px";
        document.getElementById('category').style.borderBottomRightRadius = "8px";
        document.getElementById('category').style.borderBottom = "1px solid lightgray";
    }
}

/**
 * The function toggles the visibility of a contact list and adjusts the border radius of an element
 * accordingly.
 */
function openAssignedTo(id1, id2){
    renderContacts();
    let showAssigned = document.getElementById(id1);
    showAssigned.classList.toggle('d-none');
    let checkBottomBorder = !showAssigned.classList.contains('d-none');
    if (checkBottomBorder) {
        document.getElementById(id2).style.borderBottomLeftRadius = "0px";
        document.getElementById(id2).style.borderBottomRightRadius = "0px";
        document.getElementById(id2).style.borderBottom = "none";
    }
    else {
        document.getElementById(id2).style.borderBottomLeftRadius = "8px";
        document.getElementById(id2).style.borderBottomRightRadius = "8px";
        document.getElementById(id2).style.borderBottom = "1px solid lightgray";
    }
}


/**
 * This function renders a list of contacts and adds an option to invite a new contact.
 */
function renderContacts() {
    let list = document.getElementById('showAssigned');
    if (firstRender) {
        list.innerHTML = '';
        for (let i = 0; i < contacts.length; i++) { list.innerHTML += returnRenderContactsHTML(i); }
        list.innerHTML += ` <div onclick="AddNewContact()" class="contact-container cursor"> Invite New Contact </div>`;
        firstRender = false;
    }
}

/**
 * The function returns an HTML string for rendering a contact with a checkbox and tick image.
 * @param i - The parameter "i" is an index representing the position of a contact in an array called
 * "contacts". It is used to access the properties of the contact object at that index and generate
 * HTML code for displaying the contact's name and a checkbox image.
 * @returns a string of HTML code that creates a container for a contact with a checkbox and tick
 * image. The container has an onclick event that calls the `assignTask()` function with the index `i`
 * as an argument. The name of the contact is displayed within the container using the `contacts`
 * array.
 */
function returnRenderContactsHTML(i) {
    return `
    <div onclick="assignTask(${i})" class="contact-container cursor">
        ${contacts[i].name}
        <div class="checkbox-container">
            <img class="cursor checkbox-img" id="contact${contacts[i].id}" src="src/img/checkbox.png">
            <img src="src/img/tick.png" class="tick-img d-none" id="tickId${i}">
        </div>
    </div>`;
}

/**
 * The function adds a new contact by removing a dropdown div, hiding a contact list, and replacing the
 * div's HTML with a new contact form.
 */
function AddNewContact() {
    firstRender = true;
    let assignedForm = document.getElementById('assigned');
    assignedForm.classList.remove('assigned-dropdown-div');
    assignedForm.classList.remove('cursor');
    assignedForm.onclick = '';
    let contactsAs = document.getElementById('showAssigned');
    contactsAs.classList.add('d-none');
    assignedForm.innerHTML = returnAddNewContactHTML();
}

/**
 * The function returns HTML code for adding a new contact with input fields for email and buttons for
 * deleting and creating the contact.
 * @returns a string of HTML code that creates a container for adding a new contact. The container
 * includes an input field for the contact email, a delete icon, and a tick icon.
 */
function returnAddNewContactHTML() {
    return `
    <div class="add-contact-container">
        <input class="title-input" placeholder="Contact email" type="email" id="newContact">
        <div>
            <img src="src/img/delete-icon.svg" onclick="displayContacts()" class="delete-icon-x">
            <img src="src/img/tick.png" onclick="createContact()" class="tick-icon">
        </div>
    </div>
    `
}

/**
 * This function creates a new contact and adds it to an array if the input value contains an "@"
 * symbol, and then displays the updated list of contacts.
 */
function createContact(i) {
    let newContact = document.getElementById('newContact');
    if (newContact.value.includes('@')) {
        contacts.push({
            id: contacts.length + 5,
            name: `${newContact.value}`,
            initials: '<img src="src/img/contacts-icon.svg" class="missing-img">'
        });
        displayContacts();
    }
}

/**
 * The function displays contacts by setting the innerHTML of an element to the HTML returned by
 * another function and clears an array.
 */
function displayContacts() {
    let contactsAs = document.getElementById('assingedContactForm');
    contactsAs.innerHTML = '';
    contactsAs.innerHTML = returnDisplayContactsHTML();
    assignedContacts = [];
}

/**
 * The function returns HTML code for displaying assigned contacts and a dropdown menu for selecting
 * them.
 * @returns a string of HTML code that includes a dropdown menu for assigning a task to a person, a
 * container for displaying contact bubbles, and a validation text for when the task is not assigned.
 */
function returnDisplayContactsHTML() {
    return `
    <span>Assigned to</span>
        <div onclick="openAssignedTo(), event.stopPropagation()" id="assigned" class="assigned-dropdown-div cursor">
            <div id="assignedPeople">Assigned to</div>
            <img  class="cursor" src="src/img/dropdown-arrow.svg">
        </div>
        <div class="d-none" id="showAssigned">
        </div>
        <div id="renderContactBubbles">
        </div>
        <div id="assignedValidationText"  class="d-none validation-text">Please assign the Task</div>
    `
}

/**
 * The function displays a set of color categories on a webpage and allows the user to select a color
 * from the categories.
 */
function displayCategoryColors() {
    let color = document.getElementById('categoryColors');
    color.innerHTML = '';
    for (let i = 0; i < colorType.length; i++) { color.innerHTML += `<div class="colortype" id="colorCode${i}" onclick="selectColor(${i})" style="background-color: ${colorType[i].color}">` }
}

/**
 * The function initializes form validation by hiding validation messages if the input fields have
 * values and removing onclick events from the input fields.
 */
function initial() {
    let title = document.getElementById('title');
    let titleNote = document.getElementById('titleValidationText');
    let description = document.getElementById('description');
    let descriptionNote = document.getElementById('descValidationText');
    let dueDate = document.getElementById('dueDate');
    let dateNote = document.getElementById('dateValidationText');
    if (title.value != 0) { titleNote.classList.add('d-none'); }
    if (description.value != 0) { descriptionNote.classList.add('d-none'); }
    if (dueDate.value != 0) { dateNote.classList.add('d-none'); }
    title.onclick = ''; description.onclick = ''; dueDate.onclick = '';
    setTimeout(initial, 100);
}

/**
 * The function selects a color and adds it to an array while removing any previously selected colors.
 * @param i - The parameter "i" is an integer representing the index of the color being selected from
 * an array called "colorType". The function "selectColor" is called when a user clicks on a color, and
 * it adds the selected color to an array called "selectedColor" and highlights the selected color on
 */
function selectColor(i) {
    isColorPicked = true;
    let selected = document.getElementById(`colorCode${i}`);
    selected.classList.add('highlighted-color');
    selectedColor.push(colorType[i].color);
    removeOtherSelected(i);
}

/**
 * The function removes the 'highlighted-color' class from all elements except the one with the
 * specified index.
 * @param i - The parameter `i` is an integer variable that is used as an index to compare with the
 * loop variable `k`. It is used to determine which element should not be highlighted in the loop.
 */
function removeOtherSelected(i) {
    for (let k = 0; k < colorType.length; k++) { if (i != k) { document.getElementById(`colorCode${k}`).classList.remove('highlighted-color'); } }
}

/**
 * The function adds a new category with a selected color to an array and displays it on the HTML page.
 */
 function displayNewCategory() {
    let input = document.getElementById('newCatText').value;
    let colorArrayLength = selectedColor.length;
    if (input !== '' && isColorPicked) {
        categoryColors.push({
            color: selectedColor[colorArrayLength - 1],
            category: input
        });
        displayNewCategoryHTML();
        isColorPicked = false;
    }
     saveCat();
}

/**
 * The function resets the text of an HTML element with the ID 'selectedCategory' to 'Select a
 * Category'.
 */
function resetCategoryText(){
    document.getElementById('selectedCategory').textContent = 'Select a Category';
}

/**
 * The function checks the validation of input fields and returns the result.
 * @returns The function `checkValidationOnInputs` is returning the result of calling the function
 * `returnCheckedInputs` with several arguments. The specific value being returned depends on the
 * implementation of `returnCheckedInputs`.
 */
function checkValidationOnInputs() {
    let title = document.getElementById('title');
    let desc = document.getElementById('description');
    let cat = document.getElementById('selectedCategory');
    let date = document.getElementById('dueDate');
    return returnCheckedInputs(checkTitle, checkDesc, checkCat, checkAssigned, checkDate, checkPrio, title, desc, cat, date);
}

/**
 * The function checks if certain input fields have been filled out and returns true if they have,
 * false if they haven't.
 * @param checkTitle - a boolean variable to check if the title input field is valid or not
 * @param checkDesc - A boolean variable used to check if the description input field has been filled
 * out.
 * @param checkCat - A boolean variable that indicates whether a category has been selected or not.
 * @param checkAssigned - A boolean variable that is used to check if any contacts have been assigned
 * to the task.
 * @param checkDate - A boolean variable used to check if the date input field has been filled out or
 * not.
 * @param checkPrio - A boolean variable that indicates whether the priority field has been validated
 * or not.
 * @param title - The input field for the task title.
 * @param desc - The "desc" parameter is a reference to an HTML input element that contains the
 * description of a task.
 * @param cat - This parameter represents the category of the task. It is used in the function to check
 * if a category has been selected or not.
 * @param date - This parameter is a variable that holds the value of the date input field.
 * @returns a boolean value - true if all the required fields are filled out, and false if any of the
 * required fields are empty.
 */
function returnCheckedInputs(checkTitle, checkDesc, checkCat, checkAssigned, checkDate, checkPrio, title, desc, cat, date) {
    if (title.value == 0) { document.getElementById('titleValidationText').classList.remove('d-none'); }
    else { checkTitle = true; document.getElementById('titleValidationText').classList.add('d-none'); }
    if (desc.value == 0) { document.getElementById('descValidationText').classList.remove('d-none'); }
    else { checkDesc = true; document.getElementById('descValidationText').classList.add('d-none'); }
    if (cat.textContent == 'Select a Category') { document.getElementById('catValidationText').classList.remove('d-none'); }
    else { checkCat = true; document.getElementById('catValidationText').classList.add('d-none'); }
    if (assignedContacts.length == 0) { document.getElementById('assignedValidationText').classList.remove('d-none'); }
    else { checkAssigned = true; document.getElementById('assignedValidationText').classList.add('d-none'); }
    if (date.value == 0) { document.getElementById('dateValidationText').classList.remove('d-none'); }
    else { checkDate = true; document.getElementById('dateValidationText').classList.add('d-none'); }
    if (prio.length == 0) { document.getElementById('prioValidationText').classList.remove('d-none'); }
    else { checkPrio = true; document.getElementById('prioValidationText').classList.add('d-none'); }
    if (checkTitle && checkDesc && checkCat && checkAssigned && checkDate && checkPrio) { return true; }
    else return false;
}


/**
 * The function removes an object from an array based on its ID property.
 * @param arr - an array of objects that have an "id" property
 * @param id - The `id` parameter is a unique identifier that is used to find and remove an object from
 * the `arr` array. The function searches for an object in the array that has a matching `id` property
 * and removes it from the array.
 * @returns the updated array after removing the object with the specified id.
 */
function removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
    if (objWithIdIndex > -1) { arr.splice(objWithIdIndex, 1); }
    return arr;
}

/**
 * The function assigns a task to a contact and updates the UI accordingly.
 * @param i - The index of the contact in the `contacts` array that is being assigned a task.
 */
function assignTask(i) {
    let checkbox = document.getElementById(`contact${contacts[i].id}`);
    let tickId = document.getElementById(`tickId${i}`);
    let assignedTask = document.getElementById('assignedPeople');
    let assignedTaskNote = document.getElementById('assignedValidationText');
    if (!checkbox.checked) { assignedContacts.push({
            'name': contacts[i].name,
            'initials': contacts[i].initials,
            'id': contacts[i].id,
            'color': contacts[i].color
        }); tickId.classList.remove('d-none'); checkbox.checked = true;
    }else if (checkbox.checked) { removeObjectWithId(assignedContacts, contacts[i].id); checkbox.checked = false; tickId.classList.add('d-none'); }
    renderContactBubbles(); checkAssigned = true;
    if (assignedTask.textContent != 0) { assignedTaskNote.classList.add('d-none'); }
}

/**
 * This function renders contact bubbles based on assigned contacts' initials.
 */
function renderContactBubbles() {
    let render = document.getElementById('renderContactBubbles');
    render.innerHTML = '';
    let firstLetter;
    for (let i = 0; i < assignedContacts.length; i++) {
        firstLetter = assignedContacts[i].initials;
        render.innerHTML += `
        <div class="contact-display" style="background-color:${contacts[i].color} ;">${firstLetter}</div>`
    }
}


/**
 * The function sets the selected priority and color, resets previously selected colors, and hides a
 * validation message.
 * @param selected - The parameter "selected" is a variable that represents the index of the selected
 * priority in an array called "priorities". The function uses this index to access the corresponding
 * priority and color values from the "priorities" array and store them in an object called "prio". The
 * function also calls two
 */
function selectedPrio(selected) {
    prio = [
        {
            priority: `${priorities[selected].priority}`,
            color: `${priorities[selected].color}`
        }
    ]
    setSelectedColor(selected);
    resetSelectedColor(selected);
    document.getElementById('prioValidationText').classList.add('d-none');
}


/**
 * The function selects a category and updates the chosen category display.
 * @param cat - The parameter `cat` is a variable that represents the category selected by the user. It
 * is used to access the corresponding color and category name from the `categoryColors` object.
 */
function selectCategory(cat) {
    category.splice(0, 1);
    let categoryText = document.getElementById(`${cat}`).textContent;
    let chosenCat = document.getElementById('category');
    let chosenCatNote = document.getElementById('catValidationText');
    document.getElementById('selectedCategory').innerHTML = `<div class="selected-category"><span>${categoryText}</span><span class="circle" style="background-color:${categoryColors[cat].color}"></span></div>`
    document.getElementById('showCat').classList.add('d-none');
    document.getElementById('category').style.borderBottom = "1px solid lightgray";
    document.getElementById('category').style.borderBottomLeftRadius = "8px";
    document.getElementById('category').style.borderBottomRightRadius = "8px";
    category.push(
        {color: categoryColors[cat].color,
        category: `${categoryColors[cat].category}`}
    ); if (chosenCat.textContent != 0) { checkCat = true; chosenCatNote.classList.add('d-none'); }
}


/**
 * The function sets the background color and image filter of a selected element based on its index in
 * an array.
 * @param index - The index parameter is an integer value representing the index of the priority object
 * in the priorities array. It is used to access the specific priority object and its properties.
 */
function setSelectedColor(index) {
    let selected = document.getElementById(`${priorities[index].priority}`);
    selected.style.backgroundColor = `${priorities[index]['color']}`;
    let selectedImg = document.getElementById(`img-${priorities[index].priority}`);
    selectedImg.style = `filter: brightness(0) invert(1)`;
    selected.style.color = `white`;
}


/**
 * The function resets the selected color of a priority and updates the count of low, medium, and
 * urgent priorities.
 * @param index - The index parameter is an integer that represents the index of the selected priority
 * in an array called "priorities".
 */
function resetSelectedColor(index) {
    if (prio[0].priority == 'low') { low++; medium = 0; urgent = 0; }
    else if (prio[0].priority == 'medium') { medium++; low = 0; urgent = 0; }
    else if (prio[0].priority == 'urgent') { urgent++; low = 0; medium = 0; }
    for (let i = 0; i < priorities.length; i++) {
        if (i != index) {
            document.getElementById(`${priorities[i].priority}`).style.backgroundColor = 'white';
            document.getElementById(`${priorities[i].priority}`).style.color = 'black';
            document.getElementById(`img-${priorities[i].priority}`).style = `filter: brightness(1) invert(0)`;}
} if (low == 2 || medium == 2 || urgent == 2) {
        document.getElementById(`${priorities[index].priority}`).style.backgroundColor = 'white';
        document.getElementById(`${priorities[index].priority}`).style.color = 'black';
        document.getElementById(`img-${priorities[index].priority}`).style = `filter: brightness(1) invert(0)`;
        prio.splice(0, 1);
        low = 0; medium = 0; urgent = 0;}
}



/**
 * The function redirects the user to the "board.html" page when called.
 */
function closeAddTask() {
    document.location = "board.html";
}


/**
 * This function saves a task by converting it to a JSON string and storing it using the setItem
 * method.
 */
async function saveTask() {
    await setItem('task', JSON.stringify(tasks));
}


/**
 * The function saves a JSON string representation of category colors under the key 'cat' using the
 * asynchronous function setItem().
 */
async function saveCat() {
    await setItem('cat', JSON.stringify(categoryColors));
}


/**
 * The function deletes a task from an array and saves the updated array.
 * @param i - The index of the task to be deleted from the "tasks" array.
 */
function deleteTask(i) {
    tasks.splice(i, 1);
    saveTask();
}


/**
 * The function adds a subtask to a list and displays all subtasks in an HTML container.
 */
function displaySubTask() {
    let subInput = document.getElementById('subtask-content');
    let displayContainer = document.getElementById('displaySub');
    displayContainer.innerHTML = '';
    if (subInput.value != 0) {
        subtaskName.push(subInput.value);
        bool.push('false');
    } for (let i = 0; i < subtaskName.length; i++) { displayContainer.innerHTML += returnSubtaskHTML(i); bool[i] = "false"; }
    subInput.value = '';
}


/**
 * The function removes the "d-none" class from an element with the ID "deleteSubTaskTextId".
 */
function deleteSubtaskInput() {
    document.getElementById('deleteSubTaskTextId').classList.remove('d-none');
}


/**
 * The function hides the delete subtask text if the subtask input value is zero.
 */
function onSubtaskFocusOut() {
    let subtaskInputId = document.getElementById('subtask-content');
    if (subtaskInputId.value == 0) { let deleteSubtaskText = document.getElementById('deleteSubTaskTextId'); deleteSubtaskText.classList.add('d-none'); }
}

/**
 * The function clears the input field for a subtask and hides a delete button.
 */
function emptySubtaskText() {
    let deleteSubtaskText = document.getElementById('deleteSubTaskTextId');
    let subtaskInputId = document.getElementById('subtask-content');
    subtaskInputId.value = '';
    deleteSubtaskText.classList.add('d-none');
}


/**
 * The function returns HTML code for a subtask with a checkbox, subtask name, and delete button.
 * @param i - The index of the subtask in the `subtaskName` array.
 * @returns a string of HTML code that represents a subtask container with a checkbox, subtask name,
 * and a delete button. The HTML code is generated dynamically using the value of the parameter `i` and
 * the values of the `subtaskName` array.
 */
function returnSubtaskHTML(i) {
    return `
    <div class="subtask-div-container">
        <div class="subtask-left-side">
            <input onclick="checkSubtask(${i})" type="checkbox" name="subtask" id="subtask${i}">
            ${subtaskName[i]}
        </div>
        <div class="subtask-right-side">
            <img onclick="deleteSubTask(${i})" class="add-task-trash-pic" src="src/img/trash.png">
        </div>
    </div>`
}


/**
 * The function deletes a subtask from an array and updates the display of the remaining subtasks.
 * @param i - The index of the subtask to be deleted from the arrays `subtaskName` and `bool`.
 */
function deleteSubTask(i) {
    subtaskName.splice(i, 1);
    bool.splice(i, 1);
    displaySubTask();
}


/**
 * This function generates a unique ID for a new task based on the existing tasks' IDs.
 * @returns The function `getId()` returns a number, which is either 1 if the `tasks` array is empty,
 * or the maximum id value in the `tasks` array incremented by 1.
 */
function getId() {
    if (tasks.length === 0) {
        return 1;
    } else {
        let ids = [];
        for (let i = 0; i < tasks.length; i++) {
            ids.push(tasks[i].id);
        }
        let maxId = Math.max.apply(Math, ids);
        maxId++;
        return maxId;
    }
}






// let count = 0;

// function openCalender() {
//     document.querySelector('.date_input_container input').setAttribute('type', 'date');
//     document.querySelector('.date_input_container img').classList.add('d-none');
//     document.querySelector('.date_input_container input').showPicker();
//     count++;
// }

// function closeCalender(element) {
//     let dateInput = document.querySelector('.date_input_container input');
//     dateInput.setAttribute('type', 'text');
//     dateInput.value= formatDate(dateInput.value);
//     document.querySelector('.date_input_container img').classList.remove('d-none');
//     if (count == 1) {
//         element.blur();
//     }
// }

// function formatDate(date) {
//     let dateArray = [];
//     let substringStart = 0;
//     for (let i = 0; i < date.length; i++) {
//         if(date.charAt(i) === '-') {
//             let substring = date.slice(substringStart, i);
//             dateArray.unshift(substring);
//             substringStart = i + 1;
//         }
//     }
//     let substring = date.slice(substringStart, date.length);
//     dateArray.unshift(substring);
//     let newDate = dateArray.toString();
//     newDate = newDate.replaceAll(',', '/');
//     return newDate;
// }

// function setCount() {
//     count = 0;
// }