/*____________________________________Alphabet Array____________________________________*/

let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


/*___________________________Render Contact List Functions______________________________*/

/**
 * Loads and generates the contact list
 */
async function LoadContactList() {
    await loadContacts();
    renderContactList();
}

/**
 * Generates the complete contact list by looping through the alphabet array and adding the contacts to the respective letters
 */
function renderContactList() {
    let contactList = document.getElementById('listContainer');
    contactList.innerHTML = '';
    for (let i = 0; i < alphabet.length; i++) {
        let letter = alphabet[i];
        renderLetterGroups(contactList, letter);
        renderContacts(letter);
    }
}

/**
 * Generates the containers for the letters to which the contacts will be assigned
 * when iterating through the contact array, the first letter of the contact name is compared with the letter of the alphabet
 * only if a match is made once, a container is generated for the corresponding letter
 * 
 * @param {string} element - Id for the element in which the individual contact groups with the respective contacts are generated
 * @param {string} letter - Current letter from the loop through the alphabet as a uppercase letter
 */
function renderLetterGroups(element, letter) {
    let matchAmount = 0;
    for (let i = 0; i < contacts.length; i++) {
        let char = getFirstChar(contacts[i].name);
        if (letter === char && matchAmount == 0) {
            element.innerHTML += createContactGroup(letter);
            matchAmount++;
            break;
        }
    }
}

/**
 * Adds contacts to the corresponding containers 
 * Contacts are separated into a new array according to the initial letter, at the same time the array is sorted alphabetically
 * then the contact templates are generated and the appropriate background-color is assigned to the initials
 * 
 * @param {string} letter - Current letter from the loop through the alphabet as a uppercase letter
 */
function renderContacts(letter) {
    let contactSubList = document.getElementById(`group${letter}`);
    if (contactSubList) {
        contactSubList.innerHTML = '';
        let names = [];
        filterContactsByChar(names, letter);
        createContacts(contactSubList, names);
    }
}

/**
 * Iterates through the new array of seperated contacts to generate the contact templates
 * then the appropriate background-color is assigned to the initials
 * 
 * @param {string} element  - Id for the element in which the contacts are generated
 * @param {Array.<{id: Number, name: String, initials: String, email: String, phone: String, color: String}>} names - Array for seperated contacts 
 */
function createContacts(element, names) {
    for (let i = 0; i < names.length; i++) {
        element.innerHTML += createContact(names[i]);
        document.getElementById(`contactInitials${names[i].id}`).style.backgroundColor = names[i].color;
    }
}

/**
 * Seperate contacts into a new array according to the initial letter by looping through the contact array
 * than the array is sorted alphabetically
 * 
 * @param {Array.<{id: Number, name: String, initials: String, email: String, phone: String, color: String}>} names - Array for seperated contacts
 * @param {string} letter - Current letter from the loop through the alphabet as a uppercase letter
 */
function filterContactsByChar(names, letter) {
    for (let i = 0; i < contacts.length; i++) {
        let char = getFirstChar(contacts[i].name);
        if (letter === char) {
            names.push(contacts[i]);
        }
    }
    names = sortFilteredContacts(names);
}

/**
 * Sort the new array alphabetically
 * 
 * @param {Array.<{id: Number, name: String, initials: String, email: String, phone: String, color: String}>} names - Array for seperated contacts
 * @returns {Array.<{id: Number, name: String, initials: String, email: String, phone: String, color: String}>} - Alphabetically sorted array
 */
function sortFilteredContacts(names) {
    return names.sort((a, b) => {
        if (a.name < b.name) {
        return -1;
        }
    });
}


/*__________________________Contact Information Functions________________________________*/

/**
 * Displays and fills container for contact information 
 * 
 * @param {number} id - ID of contact
 */
function openContactInfo(id) {
    if (window.innerWidth <= 670) {
        document.getElementById('contactList').style.display = 'none';
        document.getElementById('newContactButton').style.display = 'none';
        document.getElementById('contactInfo').style.display = 'unset';
        displayContactInfoButtons(id);
    }
    document.getElementById('contactInfoContainer').style.transform = 'translateX(0)';
    addContactInformation(id);
}

/**
 * Displays the mobile contact-info buttons
 * 
 * @param {number} id - ID of contact
 */
function displayContactInfoButtons(id) {
    let contactIndex =  getIndexOfContact(id);
    document.getElementById('mobilContactInfoButtonContainer').innerHTML = createContactInfoButtons(contactIndex);
    document.getElementById('mobilContactInfoButtonContainer').style.display = 'flex';
}

/**
 * fills container for contact information with contact data
 * 
 * @param {number} id - ID of contact
 */
function addContactInformation(id) {
    let index = getIndexOfContact(id);
    document.getElementById('infoInitials').innerHTML = contacts[index].initials;
    document.getElementById('infoInitials').style.backgroundColor = contacts[index].color;
    document.getElementById('infoName').innerHTML = contacts[index].name;
    document.getElementById('infoEmail').innerHTML = contacts[index].email;
    document.getElementById('infoPhone').innerHTML = contacts[index].phone;
    document.getElementById('editContactLink').setAttribute('onclick', `openContactMenu('edit',${id})`);
    if (window.innerWidth <= 600) {
    document.getElementById('mobilEditContactImg').setAttribute('onclick', `openContactMenu('edit',${id})`);
    }
}

/**
 * Closes container for contact information and opens contact list for mobile Version
 */
function closeContactInfo() {
    document.getElementById('contactList').style.display = 'unset';
    document.getElementById('newContactButton').style.display = 'flex';
    document.getElementById('contactInfo').style.display = 'none';
    document.getElementById('mobilContactInfoButtonContainer').style.display = 'none';
    document.getElementById('contactInfoContainer').style.transform = 'translateX(150%)';
}


/*_____________________________Contact Add/Edit Menu Functions_____________________________*/

/**
 * Opens either the add-contact or edit-contact menu depending on the passed string
 * 
 * @param {string} option - can be add or edit to open the corresponding menu
 * @param {number} id - ID of the contact for edit
 */
function openContactMenu(option, id) {
    switch (option) {
        case 'add':
            openAddContactMenu();
        break;
        case 'edit':
            openEditContactMenu(id);
        break;
    }
    document.getElementById('partitionWindow').classList.remove('d-none');
    document.getElementById('contactOptionMenu').style.transform = 'translateX(0)';
}

/**
 * Opens the add-contact menu
 */
function openAddContactMenu() {
    document.getElementById('contactOption').innerHTML = 'Add contact';
    document.getElementById('addContactHeadline').classList.remove('d-none');
    document.getElementById('contactForm').setAttribute('onsubmit', 'addContact(); return false;');
    switchContactElements('contactOptionEditContactButtons', 'contactOptionAddContactButtons');
    switchContactElements('editContactInitials', 'addContactUserImg');
    clearInputs(contactErrorReports);
}

/**
 * Opens the edit-contact menu
 * 
 * @param {number} id - Contact-ID for edit contact
 */
function openEditContactMenu(id) {
    document.getElementById('contactOption').innerHTML = 'Edit contact';
    document.getElementById('addContactHeadline').classList.add('d-none');
    document.getElementById('contactForm').setAttribute('onsubmit', 'saveContact(); return false;');
    switchContactElements('contactOptionAddContactButtons', 'contactOptionEditContactButtons');
    switchContactElements('addContactUserImg', 'editContactInitials');
    fillEditContactMenuElements(id);
}

/**
 * Changes the option-menu elements from add-contact-menu to edit-contact-menu and vice versa
 * 
 * @param {string} element1 - ID of the Container for hiding the element
 * @param {string} element2 - ID of the Container for displaying the element
 */
function switchContactElements(element1, element2) {
    document.getElementById(element1).classList.add('d-none');
    document.getElementById(element2).classList.remove('d-none');
}

/**
 * Fills the elements with the contact data and add the Initials
 * 
 * @param {number} id - Contact-ID for edit contact
 */
function fillEditContactMenuElements(id) {
    let index =  getIndexOfContact(id);
    fillEditContactMenuInputs(index);
    fillEditContactMenuInitials(index);
    addOnclickFunctions(index);
}

/**
 * Fills the inputs with the contact data
 * 
 * @param {number} index - Index of contact
 */
function fillEditContactMenuInputs(index) {
    document.getElementById('inputName').value = contacts[index].name;
    document.getElementById('inputEmail').value = contacts[index].email;
    document.getElementById('inputPhone').value = contacts[index].phone;
}

/**
 * Fills the Initial circle with the contact data
 * 
 * @param {number} index - Index of contact
 */
function fillEditContactMenuInitials(index) {
    document.getElementById('editContactInitials').innerHTML = contacts[index].initials;
    document.getElementById('editContactInitials').style.backgroundColor = contacts[index].color;
}

/**
 * Adds onclick functions to the edit-contact-menu buttons
 * 
 * @param {number} index - Index of contact
 */
function addOnclickFunctions(index) {
    document.getElementById('deleteContactButton').setAttribute('onclick', `deleteContact(${index})`);
    document.getElementById('saveContactButton').setAttribute('onclick', `saveContact(${index})`);
}

/**
 * Close the Contact-Option-Menu
 */
function closeContactMenu() {
    document.getElementById('contactOptionMenu').style.transform = 'translateX(150%)';
    document.getElementById('partitionWindow').classList.add('d-none');
    closeErrorReports(contactErrorReports);
}


/*_________________________Add/Edit/Delete Contact Functions___________________________*/

/**
 * Add a new contact to the contact list
 * Displays and fills container for contact information
 * Displays confirmation when Contact successfully created
 */
function addContact() {
    let newContact = createNewContact();
    if (contactNotAdded(newContact)) {
        contacts.push(newContact);
        saveContacts();
        closeContactMenu();
        clearInputs(contactErrorReports);
        openContactInfo(newContact.id);
        renderContactList();
        document.getElementById(`${newContact.id}`).scrollIntoView();
        showContactConfirmation(newContact.id, 'Contact successfully created');
    }
}

/**
 * Creates and returns a new contact object
 * 
 * @returns {object} - new contact object
 */
function createNewContact() {
    let id = getIdForNewContact();
    let name = firstLettersToUpperCase();
    let initials = createInitials();
    let email = emailToLowerCase();
    let phone = document.getElementById('inputPhone').value;
    let color = createRandomRGBColor();
    let newContact = {
        'id' : id,
        'name' : name,
        'initials' : initials,
        'email' : email,
        'phone' : phone,
        'color' : color
    };
    return newContact;
}

/**
 * Generates and returns a new ID number for new contact while iterating through the contacts array and getting the max id
 * 
 * @returns {number} - new ID number for new contact
 */
function getIdForNewContact() {
    if (contacts.length === 0) {
        return 1;
    } else {
        let ids = [];
        for (let i = 0; i < contacts.length; i++) {
            ids.push(contacts[i].id);
        }
        let maxId = Math.max.apply(Math, ids);
        maxId++;
        return maxId;
    }
}

/**
 * Returns the firstname (if exist secondname) and lastname where the first letter is an uppercase letter
 * name is converted to an array of all characters
 * while looping through the array, after each blank character the following character is converted to an uppercase letter
 * then the array is converted back to a string
 * 
 * @returns {string} - Name of contact
 */
function firstLettersToUpperCase() {
    let name = document.getElementById('inputName').value;
    name = name.toLowerCase();
    let chars = Array.from(name);
    chars[0] = chars[0].toUpperCase();
    for (let i = 0; i < chars.length; i++) {
        if (chars[i] === ' ') {
            chars[i + 1] = chars[i + 1].toUpperCase();
        }
    }
    name = chars.join('');
    return name;
}

/**
 * Determines the first letter of first and last name and returns these initials 
 * 
 * @returns {string} - Initials of contact
 */
function createInitials() {
    let name = document.getElementById('inputName').value;
    let firstInitial = getFirstChar(name);
    let secondInitial = getFirstCharofLastname(name);
    return `${firstInitial}${secondInitial}`
}

/**
 * Returns email to lowercase
 * 
 * @returns {string} - Email of conatact
 */
function emailToLowerCase() {
    let email = document.getElementById('inputEmail').value;
    email = email.toLowerCase();
    return email;
}

/**
 * Saves edit contact informations
 * 
 * @param {number} index - index of contact
 */
function saveContact(index) {
    changeContactData(index);
    addContactInformation(contacts[index].id);
    closeContactMenu();
    renderContactList();
    document.getElementById(`${contacts[index].id}`).scrollIntoView();
    showContactConfirmation(contacts[index].id, 'Contact successfully edit');
}

/**
 * Changes the contact data and saves it
 * 
 * @param {number} index - index of contact
 */
function changeContactData(index) {
    contacts[index].name = firstLettersToUpperCase();
    contacts[index].initials = createInitials();;
    contacts[index].email = emailToLowerCase();
    contacts[index].phone = document.getElementById('inputPhone').value;
    saveContacts();
}

/**
 * Deletes contact from the contact list
 * 
 * @param {number} index - index of contact
 */
function deleteContact(index) {
    contacts.splice(index, 1);
    saveContacts();
    document.getElementById('contactInfoContainer').style.transform = 'translateX(150%)';
    if (window.innerWidth <= 600) {
        closeContactInfo();
    } else {
        closeContactMenu();
    }
    renderContactList();
    showDeleteContactConfirmation();
}

/**
 * Displays the confirmation for 2 seconds that a contact added successfully
 * 
 * @param {number} id - ID of new contact
 */
function showContactConfirmation(id, confirmation) {
    document.getElementById('contactConfirmation').innerHTML = confirmation;
    document.getElementById('contactConfirmation').style.transform = 'translateY(0%)';
    document.getElementById(`${id}`).style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    setTimeout(() => {
        document.getElementById('contactConfirmation').style.transform = 'translateY(400%)';
        document.getElementById(`${id}`).style.backgroundColor = 'var(--white-color)';
    }, 2000);
}

/**
 * Displays the confirmation for 2 seconds that a contact was deleted successfully
 */
function showDeleteContactConfirmation() {
    document.getElementById('contactConfirmation').innerHTML = 'Contact successfully deleted';
    document.getElementById('contactConfirmation').style.transform = 'translateY(0%)';
    setTimeout(() => {
        document.getElementById('contactConfirmation').style.transform = 'translateY(1000%)';
    }, 2000);
}

/**
 * Checks if the new created contact already exist by iterating through the contact list
 * if the name and the email or phone number matches with a contact from the contact list, it opens a info container
 * if not it returns true
 * 
 * @param {object} newContact - new created contact
 * @param {number} newContact.id - id of created contact
 * @param {string} newContact.name - name of created contact
 * @param {string} newContact.email - email of created contact
 * @param {string} newContact.phone - phone of created contact
 * @param {string} newContact.color - background-color for initial container of created contact
 * @returns {boolean}
 */
function contactNotAdded(newContact) {
    for (i = 0; i < contacts.length; i++) {
        if (contacts[i].name === newContact.name && contacts[i].email === newContact.email) {
            openExistingContactInfo(i, 'email');
            return false;
        } else if (contacts[i].name === newContact.name && contacts[i].phone === newContact.phone) {
            openExistingContactInfo(i, 'phone number');
            return false;
        }
    }
    return true;
}

/**
 * Opens the info container about a existing contact
 * 
 * @param {number} index - index of existing contact
 * @param {string} contactdata - the matching input (email or phone number)
 */
function openExistingContactInfo(index, contactdata) {
    switchContactElements('contactForm', 'existingContactInfo');
    document.getElementById('matchingInputsReport').innerHTML = `The contact with name and ${contactdata} already exist.`;
    document.getElementById('showContactButton').setAttribute('onclick', `showExistingContact(${index})`);
}

/**
 * Opens the contact info container of the existing contact
 * 
 * @param {number} index index of existing contact
 */
function showExistingContact(index) {
    openContactInfo(contacts[index]['id']);
    closeContactMenu();
    switchContactElements('existingContactInfo', 'contactForm');
}


/*_____________________________General Functions________________________________*/

/**
 * Returns first letter of the name as a uppercase letter
 * 
 * @param {string} contactName - Name of contact
 * @returns {string} - first letter of the name of the contact as a uppercase letter
 */
function getFirstChar(contactName) {
    let name = contactName;
    let char = name.charAt(0);
    char = char.toUpperCase();
    return char;
}

/**
 * Returns the first letter of the lastname as a uppercase letter
 * 
 * @param {string} contactName - Name of contact
 * @returns {string} - first letter of the lastname as a uppercase letter
 */
function getFirstCharofLastname(contactName) {
    let name = contactName;
    let index = name.lastIndexOf(' ');
    let char = name.charAt(index + 1);
    char = char.toUpperCase();
    return char;
}

/**
 * Returns the index of the contact from the contact array
 * 
 * @param {number} id - Contact-ID for searching the index from contact array
 * @returns {number} - Index of contact
 */
function getIndexOfContact(id) {
    for (let i = 0; i < contacts.length; i++) {
        if (id === contacts[i].id) {
            return i;
        }
    }
}

/**
 * Generates and returns a random RGB-Color
 * 
 * @returns {string} - random color
 */
function createRandomRGBColor() {
    let red = getRandomInt(0, 255);
    let green = getRandomInt(0, 255);
    let blue = getRandomInt(0, 255);
    return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * Generates and returns a random number between a min and max (min and max are included)
 * 
 * @param {number} min - The minimum value
 * @param {number} max - The maximum value
 * @returns {number} - random number
 */
function getRandomInt (min, max) {
    min = Math.ceil(min); // Runded immer auf und gibt Ganzzahl zurück
    max = Math.floor(max); // Runded immer ab und gibt Ganzzahl zurück
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * changes the array contacts from json array to string and saves it in the remote storage
 */
async function saveContacts() {
    await setItem('contact', JSON.stringify(contacts));
}

/**
 * Rewrite SVG files read by img tags to inline codes for changing attributes
 */
window.addEventListener('load', function() {
    deSVG('.editContactImg', true);
    deSVG('.addTaskImg', true);
});