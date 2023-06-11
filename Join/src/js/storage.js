/*_______________________________Remote Storage________________________________*/

const STORAGE_TOKEN = 'D4DBS7MA276TXS8PQ3TJKAHG12EW5IEPOBMLYDL9';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


/*____________________________________Data_____________________________________*/

let tasks = [];
let contacts = [];
let accounts = [];
let loginData = [];
/*______________________________Storage Functions_______________________________*/

/**
 * Loads and converts the JSON string, of the key task, into a object from the remote storage
 * than pushs the loaded data into the taskinprogress array
 */
async function loadTasks() {
    tasks = [];
    let task = await getItem('task');
    task = JSON.parse(task['data']['value']);
    for (let i = 0; i < task.length; i++) {
        let loadedTask = task[i];
        tasks.push(loadedTask);  
    }
}

async function loadCat() {
    categoryColors = [];
    let cat = await getItem('cat');
    cat = JSON.parse(cat['data']['value']);
    for (let i = 0; i < cat.length; i++) {
        let loadedCat = cat[i];
        categoryColors.push(loadedCat);  
    }
}

/**
 * Loads and converts the JSON string, of the key contact, into a object from the remote storage
 * than pushs the loaded data into the contacts array
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
 * Loads and converts the JSON string, of the key account, into a object from the remote storage
 * than pushs the loaded data into the accounts array
 */
async function loadAccounts() {
    accounts = [];
    let account = await getItem('account');
    account = JSON.parse(account['data']['value']);
    for (let i = 0; i < account.length; i++) {
        let loadedAccount = account[i];
        accounts.push(loadedAccount);  
    }
}

/**
 * Loads and converts the JSON string, of the key login, into a object from the remote storage
 * than pushs the loaded data into the loginData array
 */
async function loadLoginData() {
    loginData = [];
    let login = await getItem('login');
    login = JSON.parse(login['data']['value']);
    for (let i = 0; i < login.length; i++) {
        let loadedLoginData = login[i];
        loginData.push(loadedLoginData);  
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
 * Searches for an existing task if a task has been saved by a key
 * 
 * @param {*} key - Key where task has been stored
 * @returns {}
 */
async function getTask(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        }
        else {
            return res;
        }
    });
}