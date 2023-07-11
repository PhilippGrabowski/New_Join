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
        <div class="cat" id="cat${i}">
            ${categoryColors[i].category}<span class="circle" style="background-color: ${categoryColors[i].color};"></span>
        </div>
        <img class="add-task-trash-pic" src="src/img/trash.png" onclick="event.stopPropagation(), deleteCategory(${i})">
    </div>`;
}

/**
 * The function returns an HTML string that represents a form for creating a new category.
 * @returns a string of HTML code.
 */
function returnCreateNewCategoryHTML(){
    return `
    <input id="newCatText" class="title-input" type="text" maxlength="30" placeholder="New Category name" onclick="event.stopPropagation()">
        <img onclick="displayNewCategory(),event.stopPropagation() " class="tick-icon" src="src/img/tick.png">
        <img onclick="displayCategories(),event.stopPropagation(), displayCategoryHTML()" class="x-icon" src="src/img/x.png">
    <div id="categoryColors" onclick="event.stopPropagation()">
    
    </div>
    `;
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
 * The function returns HTML code for adding a new contact with input fields for email and buttons for
 * deleting and creating the contact.
 * @returns a string of HTML code that creates a container for adding a new contact. The container
 * includes an input field for the contact email, a delete icon, and a tick icon.
*/
function returnAddNewContactHTML(assigned) {
    return `
    <div class="add-contact-container">
    <input class="title-input" placeholder="Contact email" type="email" maxlength="31" id="newContact">
    <div>
    <img src="src/img/x.png" onclick="displayContacts(), resetFirstRender()" class="x-icon">
    <img src="src/img/tick.png" onclick="createContact(${assigned})" class="tick-icon">
    </div>
    </div>
    `
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
    <div onclick="openAssignedTo('showAssigned', 'assigned'), event.stopPropagation()" id="assigned" class="assigned-dropdown-div cursor">
    <div id="assignedPeople">Assigned to</div>
    <img  class="cursor" src="src/img/dropdown-arrow.svg">
    </div>
    <div class="d-none" id="showAssigned">
    </div>
    <div class="contact-bubble-container">
    <div id="renderContactBubbles">
    </div>
    <div id="renderContinousContactBubbles">
    </div>
    </div>
    <div id="assignedValidationText"  class="d-none validation-text">Please assign the Task</div>
    `
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