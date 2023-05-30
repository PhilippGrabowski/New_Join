const regName1 = new RegExp('^[a-zA-ZäöüßÄÖÜ]+$');
const regName2 = new RegExp('^[A-Za-zÄäÜüÖöß\\s]+$');
const regName3 = new RegExp('^(?!.* {2})[A-Za-zÄäÜüÖöß\\s]+$');
const regName4 = new RegExp('^(?!.* {2})[a-zA-Z][a-zA-Z]*([ ]+[a-zA-Z][a-zA-Z]*)+$');
const regPhone1 = new RegExp('^[0-9+]+$');
const regPhone2 = new RegExp('^[0-9+][0-9\\s]*$');
const regPhone3 = new RegExp('^(?!.* {2})[0-9+][0-9\\s]*$');
const regPhone4 = new RegExp('^(?!.* {2})[0-9+][0-9\\s]{8,}$');
const regEmail= new RegExp(`^[a-zA-Z0-9äÄüÜöÖß_.+-]{3,30}@[a-zA-Z0-9-ß]{3,9}\.[a-z]{2,3}$`);
let contacts = [];
let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let inputs = [
    {
        'inputID' : 'contactNameInput',
        'inputlenght' : 2,
        'regex' : [regName1, regName2, regName3, regName4],
        'errorReportID' : 'nameError',
        'errorReportText' : ['error: name is not valid', 'error: first char must be a letter', 'error: only letters excepted', 'error: spaces in row are not excepted'],
        'validReportText' : 'valid firstname (secondname) lastname'
    },
    {
        'inputID' : 'contactEmailInput',
        'inputlenght' : 7,
        'regex' : [regEmail, regEmail, regEmail, regEmail],
        'errorReportID' : 'emailError',
        'errorReportText' : ['error: email is not valid'],
        'validReportText' : 'valid email'
    },
    {
        'inputID' : 'contactPhoneInput',
        'inputlenght' : 9,
        'regex' : [regPhone1, regPhone2, regPhone3, regPhone4],
        'errorReportID' : 'phoneError',
        'errorReportText' : ['error: phone number is not valid', 'error: first char must be a number or +', 'error: only numbers excepted', 'error: spaces in row are not excepted'],
        'validReportText' : 'valid phone number'
    }
];
let errorReports = ['nameError', 'emailError', 'phoneError'];


/*______________________________Storage Functions_______________________________*/

/**
 * Loads and converts the JSON string, of the key contact, into a object from the remote storage
 * than pushs the loaded data into the contact list
 */
async function loadContacts() {
    contacts = [];
    let contact = await getItem('contact');
    contact = JSON.parse(contact['data']['value']);
    for (let i = 0; i < contact.length; i++) {
        let loadedContact = contact[i];
        contacts.push(loadedContact);  
    }
}

/**
 * methode to retrieve the saved value associated with a specified key from the storage
 * 
 * @param {string} key - Key where item has been saved
 * @returns {}
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
}

/**
 * 
 * 
 * @param {string} key 
 * @param {*} value 
 * @returns {}
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

/**
 * changes the array contacts from json array to string and saves it in the remote storage
 */
async function saveContacts() {
    await setItem('contact', JSON.stringify(contacts));
}
