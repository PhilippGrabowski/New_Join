/*___________________________________________Settings____________________________________________*/

let confirmations = ['create_account_confirm', 'reset_password_confirm', 'send_email_confirm', 'email_used_confirm'];


/*_______________________________________Animation Functions_________________________________________*/

/**
 * Starts the animation of the logo and login menu
 */
function loginAnimation() {
    setTimeout(() => {
        animateLogo();
    }, 1000)
    setTimeout(() => {
        animateLoginMenus();
    }, 1500)
}

/**
 * Moves the logo to the upper left corner of the screen 
 */
function animateLogo() {
    document.getElementById('login_logo').style.top = '5.5rem';
    document.getElementById('login_logo').style.left = '5.3vw';
    document.getElementById('login_logo').style.scale = '1.0';
}

/**
 * Displays the login menu signup container
 */
function animateLoginMenus() {
    document.getElementById('signup_head_container').classList.remove('d-none');
    document.getElementById('login_container').classList.remove('d-none');
}


/*_______________________________________Switch Menu Functions_________________________________________*/

/**
 * Toggles login menu between signup and forgot password menu
 * 
 * @param {Array.<String>} inputArray - Array of input ids
 * @param {Array.<String>} errorReportArray - Array of error report ids
 */
function toggleLoginMenu(menu, inputArray, errorReportArray) {
    if (menu == 'signup') {
        toggleMenu('login_container', 'signup_container', 'signup_head_container');
    } else {
        toggleMenu('login_container', 'forgot_password_container', 'signup_head_container');
    }
    clearInputs(inputArray);
    closeErrorReports(errorReportArray);
}

/**
 * Displays or hides the elements passed as parameters
 * 
 * @param {String} element1 - Id of element
 * @param {String} element2 - Id of element
 * @param {String} element3 - Id of element
 */
function toggleMenu(element1, element2, element3) {
    document.getElementById(element1).classList.toggle('d-none');
    document.getElementById(element2).classList.toggle('d-none');
    document.getElementById(element3).classList.toggle('d-none');
}

/**
 * Toggles between forgot password and reset password menu
 * 
 * @param {Array.<String>} inputArray - Array of input ids
 * @param {Array.<String>} errorReportArray - Array of error report ids
 */
function toggleResetMenu(inputArray, errorReportArray) {
    document.getElementById('forgot_password_container').classList.toggle('d-none');
    document.getElementById('reset_password_container').classList.toggle('d-none');
    clearInputs(inputArray);
    closeErrorReports(errorReportArray);
}


/*__________________________________________Submit Functions___________________________________________*/

/**
 * Creates a new account and animates the confirmation
 */
function signup() {
    let count = checkValidInputs(signupErrorReports);
    let email = document.getElementById('signup_email_input').value;
    email = email.toLowerCase();
    if (count == 3 && checkExistingAccount(email)) {
        createAccount(email);
        confirmAnimation(0);
        setTimeout(() => {
            toggleMenu('login_container', 'signup_container', 'signup_head_container');
        }, 2500);
    }
}

/**
 * checks if the email is already in use
 * if yes, a message will be displayed, if not, it returns true
 * 
 * @param {String} email - Email of login input
 * @returns {boolean}
 */
function checkExistingAccount(email) {
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].email === email) {
            confirmAnimation(3);
            break;
        } else {
            return true;
        }
    }
}

/**
 * Creates a new account, pushs and saves it into the accounts array
 */
function createAccount(email) {
    let name =  firstLettersToUpperCase();
    let password = document.getElementById('signup_password_input').value;
    let account = {
        'name' : name,
        'email' : email,
        'password' : password
    }
    accounts.push(account);
    saveAccount();
}

/**
 * changes the array accounts from json array to string and saves it in the remote storage
 */
async function saveAccount() {
    await setItem('account', JSON.stringify(accounts));
}

/**
 * Checks email and password to enter the join
 */
function login() {
    let email = document.getElementById('login_email_input').value;
    let password = document.getElementById('login_password_input').value;
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].email === email) {
            checkPassword(password, i);
            break
        } else {
            displayError('login_email_error', 'error: email is not known');
        }
    }
}

/**
 * Checks the password
 * 
 * @param {String} password - password entered in input
 * @param {Number} index - Index of accounts array
 */
async function checkPassword(password, index) {
    if (accounts[index].password === password) {
        await rememberLoginData(index);
        document.location.href = 'summary.html';
    } else {
        displayError('login_password_error', 'error: wrong password');
    }
}

/**
 * If checkbox is checked it saves the login data
 * 
 * @param {Number} index - Index of accounts array
 */
async function rememberLoginData(index) {
    let checkbox = document.getElementById('remember');
    if (checkbox.checked) {
        loginData = [];
        loginData.push({
            email: accounts[index].email,
            password: accounts[index].password
        });
        await setItem('login', JSON.stringify(loginData));
    } else {
        loginData = [];
        await setItem('login', JSON.stringify(loginData));
    }
}

/**
 * Fills the inputfiels with login data if login data exists
 */
async function loadInputs() {
    await loadLoginData();
    if (loginData.length == 1) {
        document.getElementById('login_email_input').value = loginData[0].email;
        document.getElementById('login_password_input').value = loginData[0].password;
        let checkbox =  document.getElementById('remember');
        let checked = document.createAttribute("checked");
        checkbox.setAttributeNode(checked);
    }
}

/**
 * After checking valid input, this function sends an email for change password
 */
function sendEmail() {
    let count = checkValidInputs(forgotPasswordErrorReport);
    let existingEmail = checkExistingEmail();
    if (count == 1 && existingEmail) {
        // Send mail
        confirmAnimation(2);
        setTimeout(() => {
            toggleResetMenu(resetPasswordInputs, resetPasswordErrorReport);
        }, 2500);
    }
}

/**
 * Returns true, if email exists, if not it displays an error message
 * 
 * @returns {boolean}
 */
function checkExistingEmail() {
    let email = document.getElementById('forgot_password_email_input').value;
    for (let i = 0; i < accounts.length; i++) {
        if (email === accounts[i].email) {
            document.getElementById('reset_password_form').setAttribute('onsubmit', `resetPassword(${i}); return false;`);
            return true;
        }
    }
    displayError(forgotPasswordErrorReport[0], 'error: unknown email');
}

/**
 * Resets the password of the account with the corresponding index from the accounts array
 * 
 * @param {Number} index - Index of accounts array
 */
async function resetPassword(index) {
    let newPassword = document.getElementById('new_password_input').value;
    let count = checkValidInputs(resetPasswordErrorReport);
    if (count == 2) {
        accounts[index].password = newPassword;
        await saveAccount()
        confirmAnimation(1);
        setTimeout(() => {
            toggleMenu('login_container', 'reset_password_container', 'signup_head_container');
        }, 2500);
    }
}


/*__________________________________________Confirm Functions___________________________________________*/

/**
 * Shows the confirmation and hide it after 2 seconds
 * 
 * @param {Number} index - Index of confirmations array
 */
function confirmAnimation(index) {
    showConfirmation(index);
    setTimeout(() => {
        hideConfirmation(index);
    }, 2000);
}

/**
 * Shows the confirmation
 * 
 * @param {Number} index - Index of confirmations array
 */
function showConfirmation(index) {
    for (let i = 0; i < confirmations.length; i++) {
        document.getElementById(confirmations[i]).classList.add('d-none');
    }
    document.querySelector('.confirmation_container').classList.remove('d-none');
    document.getElementById(confirmations[index]).classList.remove('d-none');
    document.querySelector('.confirmation_container').style.transform = 'translateY(0vh)';
}

/**
 * Hides the confirmation
 * 
 * @param {Number} index - Index of confirmations array
 */
function hideConfirmation(index) {
    document.querySelector('.confirmation_container').style.transform = 'translateY(60vh)';
    document.getElementById(confirmations[index]).classList.remove('d-none');
    document.querySelector('.confirmation_container').classList.remove('d-none');
}


/*__________________________________________Global Functions___________________________________________*/

/**
 * Returns the firstname (if exist secondname) and lastname where the first letter is an uppercase letter
 * name is converted to an array of all characters
 * while looping through the array, after each blank character the following character is converted to an uppercase letter
 * then the array is converted back to a string
 * 
 * @returns {string} - Name of contact
 */
function firstLettersToUpperCase() {
    let name = document.getElementById('signup_name_input').value;
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