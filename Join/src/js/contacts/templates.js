/**
 * Returns the HTML-Template for the container for the matching letter
 * 
 * @param {string} letter - matching letter as a uppercase letter
 * @returns {html.template}
 */
function createContactGroup(letter) {
    return `<div class="contactGroup flex-column">
    <div class="letter flex-row">${letter}</div>
    <div class="line-container flex-row"><div class="horizontalLine"></div></div>
    <div id="group${letter}" class="contactSubList flex-column"></div></div>`;
}

/**
 * Returns the HTML-Template for the contact
 * 
 * @param {object} contact - the contact object
 * @param {number} contact.id - ID of the contact object
 * @param {string} contact.name - Name of the contact object
 * @param {string} contact.initials - Initials of the contact object
 * @param {string} contact.email - Email of the contact object
 * @param {string} contact.phone - Phone number of the contact object
 * @param {string} contact.color - Assigned color of the contact object
 * @returns {html.template}
 */
function createContact(contact) {
    return `<div id="${contact.id}" class="contact flex-row curser" onclick="openContactInfo(${contact.id})">
    <div id="contactInitials${contact.id}" class="contactInitials grid">${contact.initials}</div>
    <div class="contactName flex-column">
        <span class="contactSubListName">${contact.name}</span>
        <span class="contactSubListEmail">${contact.email}</span>
    </div></div>`;
}

/**
 * Returns the HTML-Template for the contact-info buttons
 * 
 * @param {number} index - index of contact
 * @returns {html.template}
 */
function createContactInfoButtons(index) {
    return `<i id="mobilContactTrash" class='bx bx-trash' onclick="deleteContact(${index})"></i>
    <img id="mobilEditContactImg" class="editContactImg" src="src/img/frame100.svg" alt="" onclick="">`
}