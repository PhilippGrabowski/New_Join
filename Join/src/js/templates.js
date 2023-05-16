/**
 * Returns the HTML-Template for the container for the matching letter
 * 
 * @param {string} charLowCase - matching letter as a lowercase letter
 * @param {string} charUpperCase - matching letter as a uppercase letter
 * @returns {html.template}
 */
function createContactGroup(charLowCase, charUpperCase) {
    return `<div class="contactGroup flex-column">
    <div class="letter flex-row">${charUpperCase}</div>
    <div class="horizontalLine"></div>
    <div id="group${charLowCase}" class="contactSubList flex-column"></div></div>`;
}

/**
 * Returns the HTML-Template for the contact
 * 
 * @param {string} x - First letter of the firstname as a uppercase letter
 * @param {string} y - First letter of the lastname as a uppercase letter
 * @param {string} name - Name of the contact (firstname and lastname)
 * @param {string} email - Email of the contact
 * @param {number} id - ID of the contact
 * @returns {html.template}
 */
function createContact(x, y, name, email, id) {
    return `<div class="contact flex-row curser" onclick="openContactInfo(${id})">
    <div id="contactInitials${id}" class="contactInitials grid">${x}${y}</div>
    <div class="contactName flex-column">
        <span class="contactSubListName">${name}</span>
        <span class="contactSubListEmail">${email}</span>
    </div></div>`;
}