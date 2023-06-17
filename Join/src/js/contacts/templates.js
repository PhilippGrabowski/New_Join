/**
 * Returns the HTML-Template for the container for the matching letter
 * 
 * @param {string} letter - matching letter as a uppercase letter
 * @returns {html.template}
 */
function createContactGroup(letter) {
    return `<div class="contact_group flex-column">
    <div class="letter flex-row">${letter}</div>
    <div class="line_container flex-row"><div class="horizontalLine"></div></div>
    <div id="group${letter}" class="contact_sublist flex-column"></div></div>`;
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
    return `<div id="${contact.id}" class="contact list_contact flex-row curser" onclick="openContactInfo(${contact.id})">
    <div id="contact_initials${contact.id}" class="contact_initials grid">${contact.initials}</div>
    <div class="contact_name flex-column">
        <span class="contact_sublist_name">${contact.name}</span>
        <span class="contact_sublist_email">${contact.email}</span>
    </div></div>`;
}

/**
 * Returns the HTML-Template for the contact-info buttons
 * 
 * @param {number} index - index of contact
 * @returns {html.template}
 */
function createContactInfoButtons(index) {
    return `<i id="mobile_contact_trash" class='bx bx-trash' onclick="deleteContact(${index})"></i>
    <img id="mobile_edit_contact_img" class="edit_contact_img" src="src/img/frame100.svg" alt="" onclick="">`
}