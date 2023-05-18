/**
 * Generates the complete contact list by looping through the alphabet array and adding the contacts to the respective letters
 */
function loadContacts() {
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
 * @param {string} element - The Id for the element in which the individual contact groups with the respective contacts are generated
 * @param {string} x - The current letter from the loop through the alphabet as a lowercase letter
 */
function renderLetterGroups(element, x) {
    let matchAmount = 0;
    for (let i = 0; i < contacts.length; i++) {
        let y = getFirstChar(i);
        if (x === y && matchAmount == 0) {
            let upperCaseLetter = x.toUpperCase();
            element.innerHTML += createContactGroup(x, upperCaseLetter);
            matchAmount++;
            break;
        }
    }
}

/**
 * Adds contacts to the corresponding containers 
 * Contacts are separated into a new array according to the initial letter
 * from the iteration through the new array the first letters of the surnames are determined, at the same time the array is sorted alphabetically
 * then the contact templates are generated and the appropriate background-color is assigned to the initials
 * 
 * @param {string} x - The current letter from the loop through the alphabet as a lowercase letter
 */
function renderContacts(x) {
    let contactSubList = document.getElementById(`group${x}`);
    if (contactSubList) {
        contactSubList.innerHTML = '';
        let names = [];
        filterContactsByChar(names, x);
        createContacts(x, contactSubList, names);
    }
}

/**
 * Iterates through the new array of seperated contacts and determie the first letters of the surname, at the same time the array is sorted alphabetically
 * then the contact templates are generated and the appropriate background-color is assigned to the initials
 * 
 * @param {*} x - The current letter from the loop through the alphabet as a lowercase letter
 * @param {*} element  - The Id for the element in which the contacts are generated
 * @param {Array.<{id: Number, name: String, email: String, phone: String, color: String}>} names - Array for seperated contacts 
 */
function createContacts(x, element, names) {
    for (let i = 0; i < names.length; i++) {
        let y = getFirstCharofLastname(i, names);
        x = x.toUpperCase();
        element.innerHTML += createContact(x, y, names[i]['name'], names[i]['email'],  names[i]['id']);
        document.getElementById(`contactInitials${names[i]['id']}`).style.backgroundColor = names[i]['color'];
    }
}

/**
 * Seperate contacts into a new array according to the initial letter by looping through the contact array
 * than the array is sorted alphabetically
 * 
 * @param {Array.<{id: Number, name: String, email: String, phone: String, color: String}>} names - Array for seperated contacts
 * @param {string} x - The current letter from the loop through the alphabet as a lowercase letter
 */
function filterContactsByChar(names, x) {
    for (let i = 0; i < contacts.length; i++) {
        let y = getFirstChar(i);
        if (x === y) {
            names.push(contacts[i]);
        }
    }
    names = sortFilteredContacts(names);
}

/**
 * Sort the new array alphabetically
 * 
 * @param {Array.<{id: Number, name: String, email: String, phone: String, color: String}>} names - Array for seperated contacts
 * @returns {Array.<{id: Number, name: String, email: String, phone: String, color: String}>} - Alphabetically sorted array
 */
function sortFilteredContacts(names) {
    return names.sort((a, b) => {
        if (a.name < b.name) {
        return -1;
        }
    });
}

/**
 * Returns first letter of the name as a lowercase letter
 * 
 * @param {number} i - Index of contact
 * @returns {string} - first letter of the name of the contact as a lowercase letter
 */
function getFirstChar(i) {
    let char = contacts[i]['name'];
    char = char.charAt(0);
    char = char.toLowerCase();
    return char;
}

/**
 * Returns the first letter of the lastname as a uppercase letter
 * 
 * @param {number} i - Index of seperated contacts
 * @param {Array.<{id: Number, name: String, email: String, phone: String, color: String}>} array - Array for seperated contacts
 * @returns {string} - first letter of the lastname as a uppercase letter
 */
function getFirstCharofLastname(i, array) {
    let char = array[i]['name'];
    let index = char.lastIndexOf(' ');
    char = char.charAt(index + 1);
    char = char.toUpperCase();
    return char;
}

/**
 * Displays and fills container for contact information 
 * 
 * @param {number} id - ID of contact
 */
function openContactInfo(id) {
    document.getElementById('contactInfoContainer').style.transform = 'translateX(0)';
    addContactInformation(id);
}

/**
 * fills container for contact information with contact data
 * 
 * @param {number} id - ID of contact
 */
function addContactInformation(id) {
    document.getElementById('infoInitials').innerHTML = getInitial(id);
    document.getElementById('infoInitials').style.backgroundColor = contacts[id]['color'];
    document.getElementById('infoName').innerHTML = contacts[id]['name'];
    document.getElementById('infoEmail').innerHTML = contacts[id]['email'];
    document.getElementById('infoPhone').innerHTML = contacts[id]['phone'];
    document.getElementById('editContactLink').setAttribute('onclick', `openContactMenu('edit',${id})`);
}

/**
 * Returns the initials of the contact in capital letters
 * 
 * @param {number} id - ID of contact
 * @returns {string} - Initials of contact
 */
function getInitial(id) {
    let charFirstname = getFirstChar(id);
    charFirstname = charFirstname.toUpperCase();
    let charLastname = getFirstCharofLastname(id, contacts);
    return `${charFirstname}${charLastname}`;
}

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
    changeContactMenuElements('contactOptionEditContactButtons', 'contactOptionAddContactButtons');
    changeContactMenuElements('editContactInitials', 'addContactUserImg');
    clearContactMenuInputs();
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
    changeContactMenuElements('contactOptionAddContactButtons', 'contactOptionEditContactButtons');
    changeContactMenuElements('addContactUserImg', 'editContactInitials');
    fillEditContactMenuElements(id);
}

/**
 * Changes the option-menu elements from add-contact-menu to edit-contact-menu and vice versa
 * 
 * @param {string} element1 - ID of the Container for hiding the element
 * @param {string} element2 - ID of the Container for displaying the element
 */
function changeContactMenuElements(element1, element2) {
    document.getElementById(element1).classList.add('d-none');
    document.getElementById(element2).classList.remove('d-none');
}

/**
 * Fills the elements with the contact data and add the Initials
 * 
 * @param {number} id - Contact-ID for edit contact
 */
function fillEditContactMenuElements(id) {
    let contactIndex =  getIndexOfContact(id);
    fillEditContactMenuInputs(contactIndex);
    document.getElementById('editContactInitials').innerHTML = getInitial(contactIndex);
    document.getElementById('editContactInitials').style.backgroundColor = contacts[contactIndex]['color'];
    document.getElementById('deleteContactButton').setAttribute('onclick', `deleteContact(${contactIndex})`);
    document.getElementById('saveContactButton').setAttribute('onclick', `saveContact(${contactIndex})`);
}

/**
 * Returns the index of the contact from the contact array
 * 
 * @param {number} id - Contact-ID for searching the index from contact array
 * @returns {number} - Index of contact
 */
function getIndexOfContact(id) {
    for (let i = 0; i < contacts.length; i++) {
        if (id === contacts[i]['id']) {
            return i;
        }
    }
}

/**
 * Fills the inputs with the contact data
 * 
 * @param {number} index - Index of contact
 */
function fillEditContactMenuInputs(index) {
    document.getElementById('contactNameInput').value = contacts[index]['name'];
    document.getElementById('contactEmailInput').value = contacts[index]['email'];
    document.getElementById('contactPhoneInput').value = contacts[index]['phone'];
}

/**
 * Close the Contact-Option-Menu
 */
function closeContactMenu() {
    document.getElementById('contactOptionMenu').style.transform = 'translateX(150%)';
    document.getElementById('partitionWindow').classList.add('d-none');
    closeErrorReports();
}

/**
 * Closes all error reports
 */
function closeErrorReports() {
    for (let i = 0; i < errorReports.length; i++) {
        document.getElementById(errorReports[i]).style.color = 'var(--white-color)';
    }
}

/**
 * Add a new contact to the contact list
 * Displays and fills container for contact information
 * Displays confirmation when Contact successfully created
 */
function addContact() {
    let newContact = createNewContact();
    if (contactNotAdded(newContact)) {
        contacts.push(newContact);
        closeContactMenu();
        clearContactMenuInputs();
        loadContacts();
        document.getElementById(`${newContact['id']}`).scrollIntoView();
        openContactInfo(newContact['id']);
        showContactConfirmation(newContact['id'], 'Contact successfully created');
    }
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
 * Creates and returns a new contact object
 * 
 * @returns {object} - new contact object
 */
function createNewContact() {
    let id = getIdForNewContact();
    let name = firstLettersToUpperCase();
    let email = emailToLowerCase();
    let phone = document.getElementById('contactPhoneInput').value;
    let color = createRandomRGBColor();
    let newContact = {
        'id' : id,
        'name' : name,
        'email' : email,
        'phone' : phone,
        'color' : color
    };
    return newContact;
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
    let name = document.getElementById('contactNameInput').value;
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
 * Returns email to lowercase
 * 
 * @returns {string} - Email of conatact
 */
function emailToLowerCase() {
    let email = document.getElementById('contactEmailInput').value;
    email = email.toLowerCase();
    return email;
}

/**
 * Clears the Inputfields of the Contact Menu
 */
function clearContactMenuInputs() {
    document.getElementById('contactNameInput').value = '';
    document.getElementById('contactEmailInput').value = '';
    document.getElementById('contactPhoneInput').value = '';
}

/**
 * Generates and returns a new ID number for new contact
 * 
 * @returns {number} - new ID number for new contact
 */
function getIdForNewContact() {
    let lastId = contacts[contacts.length - 1]['id'];
    lastId++;
    return lastId;
}

/**
 * Saves edit contact informations
 * 
 * @param {*} index - index of contact
 */
function saveContact(index) {
    contacts[index]['name'] = firstLettersToUpperCase();
    contacts[index]['email'] = emailToLowerCase();
    contacts[index]['phone'] = document.getElementById('contactPhoneInput').value;
    addContactInformation(contacts[index]['id']);
    closeContactMenu();
    loadContacts();
    document.getElementById(`${contacts[index]['id']}`).scrollIntoView();
    showContactConfirmation(contacts[index]['id'], 'Contact successfully edit');
}

/**
 * Deletes contact from the contact list
 * 
 * @param {number} index - index of contact
 */
function deleteContact(index) {
    contacts.splice(index, 1);
    document.getElementById('contactInfoContainer').style.transform = 'translateX(150%)';
    closeContactMenu();
    loadContacts();
    showDeleteContactConfirmation();
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
 * Generates and returns a random RGB-Color
 * 
 * @returns 
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
 * @returns 
 */
function getRandomInt (min, max) {
    min = Math.ceil(min); // Runded immer auf und gibt Ganzzahl zurück
    max = Math.floor(max); // Runded immer ab und gibt Ganzzahl zurück
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Rewrite SVG files read by img tags to inline codes for changing attributes
 */
window.addEventListener('load', function() {
    deSVG('.editContactImg', true);
    deSVG('.addTaskImg', true);
});

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
        if (contacts[i]['name'] === newContact['name'] && contacts[i]['email'] === newContact['email']) {
            openExistingContactInfo(i, 'email');
            return false;
        } else if (contacts[i]['name'] === newContact['name'] && contacts[i]['phone'] === newContact['phone']) {
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
    changeContactMenuElements('contactForm', 'existingContactInfo');
    document.getElementById('matchingInputsReport').innerHTML = `The contact with name and ${contactdata} already exist.`;
    document.getElementById('showContactButton').setAttribute('onclick', `showExistingContact(${index})`);
}

/**
 * Opens the contact info container of the existing contact
 * 
 * @param {*} index index of existing contact
 */
function showExistingContact(index) {
    openContactInfo(contacts[index]['id']);
    closeContactMenu();
    changeContactMenuElements('existingContactInfo', 'contactForm');
}

/**
 * checks after each input whether the input is valid
 * if input is not valid, a error report will be displayed
 */
function checkInput(index) {
    let input = document.getElementById(contactInputs[index]['inputID']).value;
    if (firstCharisNotValid(contactInputs[index]['regex'][0], input)) {
        displayError(contactInputs[index]['errorReportID'], contactInputs[index]['errorReportText'][0]);
    } else if (charIsNotValid(contactInputs[index]['regex'][1], input)) {
        displayError(contactInputs[index]['errorReportID'], contactInputs[index]['errorReportText'][1]);
    } else if (twoSpacesInRow(contactInputs[index]['regex'][2], input)) {
        displayError(contactInputs[index]['errorReportID'], contactInputs[index]['errorReportText'][2]);
    } else {
        document.getElementById(contactInputs[index]['errorReportID']).style.color = 'var(--white-color)';
    }
}

/**
 * checks after leaving email input if input is valid
 *  if input is valid or not, a report will be displayed
 */
function checkEmailInput() {
    let input = document.getElementById(contactInputs[1]['inputID']).value;
    if (charIsNotValid(regEmail, input) && input != '') {
        displayError(contactInputs[1]['errorReportID'], contactInputs[1]['errorReportText'][0]);
    } else if (input == '') {
        document.getElementById(contactInputs[1]['errorReportID']).style.color = 'var(--white-color)';
    }
    displayValidInputs();
}

/**
 * checks after leaving inputfield if every input is valid
 *  if input is valid, a report will be displayed
 */
function displayValidInputs() {
    for (let i = 0; i < contactInputs.length; i++) {
        let input = document.getElementById(contactInputs[i]['inputID']).value;
        if (charIsNotValid(contactInputs[i]['regex'][3], input) == false && input.length > contactInputs[i]['inputlenght']) {
            document.getElementById(contactInputs[i]['errorReportID']).innerHTML = contactInputs[i]['validReportText'];
            document.getElementById(contactInputs[i]['errorReportID']).style.color = 'var(--darkGreen-color)';
        }
    }
}

/**
 * Displays an error report
 * 
 * @param {string} errorReport - error report that will be displayed
 */
function displayError(element, errorReport) {
    document.getElementById(element).innerHTML = errorReport;
    document.getElementById(element).style.color = 'var(--red-color)';
}

/**
 * Returns true if first char is not valid or false if it is
 * 
 * @param {string} reg - regular expression
 * @param {string} name - input value
 * @returns {boolean}
 */
function firstCharisNotValid(reg, input) {
    return reg.test(input.charAt(0)) == false && input !== "";
}

/**
 * Returns true if char is not valid or false if it is
 * 
 * @param {string} reg - regular expression
 * @param {string} input - input value
 * @returns {boolean}
 */
function charIsNotValid(reg, input) {
    return reg.test(input) == false && input.length > 1;
}

/**
 * Returns true if there are two spaces in row or false if not
 * 
 * @param {string} reg - regular expression
 * @param {string} input - input value
 * @returns {boolean}
 */
function twoSpacesInRow(reg, name) {
    return reg.test(name) == false && name.length > 1;
}