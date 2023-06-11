/*____________________________________Input Regex_______________________________________*/

const regName1 = new RegExp('^[a-zA-ZäöüßÄÖÜ]+$');
const regName2 = new RegExp('^[A-Za-zÄäÜüÖöß\\s]+$');
const regName3 = new RegExp('^(?!.* {2})[A-Za-zÄäÜüÖöß\\s]+$');
const regName4 = new RegExp('^(?!.* {2})[a-zA-Z][a-zA-Z]*([ ]+[a-zA-Z][a-zA-Z]*)+$');
const regPhone1 = new RegExp('^[0-9+]+$');
const regPhone2 = new RegExp('^[0-9+][0-9\\s]*$');
const regPhone3 = new RegExp('^(?!.* {2})[0-9+][0-9\\s]*$');
const regPhone4 = new RegExp('^(?!.* {2})[0-9+][0-9\\s]{8,}$');
const regEmail= new RegExp(`^[a-zA-Z0-9äÄüÜöÖß_.+-]{3,30}@[a-zA-Z0-9-ß]{3,9}\.[a-z]{2,3}$`);
const regPassword = new RegExp(`^.{7,}$`)


/*__________________________________Input JSON Array____________________________________*/

let contactInputs = [
    {
        'inputID' : 'inputName',
        'inputlenght' : 2,
        'regex' : [regName1, regName2, regName3, regName4],
        'errorReportID' : 'nameError',
        'errorReportText' : ['error: name is not valid', 'error: first char must be a letter', 'error: only letters excepted', 'error: spaces in row are not excepted'],
        'validReportText' : 'valid firstname (secondname) lastname'
    },
    {
        'inputID' : 'inputEmail',
        'inputlenght' : 7,
        'regex' : [regEmail, regEmail, regEmail, regEmail],
        'errorReportID' : 'emailError',
        'errorReportText' : ['error: email is not valid'],
        'validReportText' : 'valid email'
    },
    {
        'inputID' : 'inputPhone',
        'inputlenght' : 9,
        'regex' : [regPhone1, regPhone2, regPhone3, regPhone4],
        'errorReportID' : 'phoneError',
        'errorReportText' : ['error: phone number is not valid', 'error: first char must be a number or +', 'error: only numbers excepted', 'error: spaces in row are not excepted'],
        'validReportText' : 'valid phone number'
    }
];

let loginInputs = [
    {
        'inputID' : 'login_email_input',
        'inputlenght' : 7,
        'regex' : [regEmail, regEmail, regEmail, regEmail],
        'errorReportID' : 'login_email_error',
        'errorReportText' : ['error: email is not valid'],
        'validReportText' : 'valid email'
    },
    {
        'inputID' : 'login_password_input',
        'inputlenght' : 6,
        'regex' : [regPassword, regPassword, regPassword, regPassword],
        'errorReportID' : 'login_password_error',
        'errorReportText' : ['error: note password length (>6)'],
        'validReportText' : 'valid password'
    }
];

let signupInputs = [
    {
        'inputID' : 'signup_name_input',
        'inputlenght' : 2,
        'regex' : [regName1, regName2, regName3, regName4],
        'errorReportID' : 'signup_name_error',
        'errorReportText' : ['error: name is not valid', 'error: first char must be a letter', 'error: only letters excepted', 'error: spaces in row are not excepted'],
        'validReportText' : 'valid firstname (secondname) lastname'
    },
    {
        'inputID' : 'signup_email_input',
        'inputlenght' : 7,
        'regex' : [regEmail, regEmail, regEmail, regEmail],
        'errorReportID' : 'signup_email_error',
        'errorReportText' : ['error: email is not valid'],
        'validReportText' : 'valid email'
    },
    {
        'inputID' : 'signup_password_input',
        'inputlenght' : 6,
        'regex' : [regPassword, regPassword, regPassword, regPassword],
        'errorReportID' : 'signup_password_error',
        'errorReportText' : ['error: note password length (>6)'],
        'validReportText' : 'valid password'
    }
];

let forgotPasswordInput = [
    {
        'inputID' : 'forgot_password_email_input',
        'inputlenght' : 7,
        'regex' : [regEmail, regEmail, regEmail, regEmail],
        'errorReportID' : 'forgot_password_email_error',
        'errorReportText' : ['error: email is not valid'],
        'validReportText' : 'valid email'
    }
];

let resetPasswordInputs = [
    {
        'inputID' : 'new_password_input',
        'inputlenght' : 6,
        'regex' : [regPassword, regPassword, regPassword, regPassword],
        'errorReportID' : 'new_password_error',
        'errorReportText' : ['error: note password length (>6)'],
        'validReportText' : 'valid password'
    },
    {
        'inputID' : 'confirm_password_input',
        'inputlenght' : 6,
        'regex' : [regPassword, regPassword, regPassword, regPassword],
        'errorReportID' : 'confirm_password_error',
        'errorReportText' : ['error: note password length (>6)'],
        'validReportText' : 'valid password'
    }
];


/*___________________________________Error Report Array__________________________________*/

let contactErrorReports = ['nameError', 'emailError', 'phoneError'];
let loginErrorReports = ['login_email_error', 'login_password_error'];
let signupErrorReports = ['signup_name_error', 'signup_email_error', 'signup_password_error'];
let forgotPasswordErrorReport = ['forgot_password_email_error'];
let resetPasswordErrorReport = ['new_password_error', 'confirm_password_error'];


/*_______________________________Input Validation Functions_______________________________*/

/**
 * checks after every typed char if input is valid
 * if input is valid or not, a report will be displayed
 * 
 * @param {number} index - index of inputfield
 */
function checkInputOnkeyUp(inputArray, index) {
    let input = document.getElementById(inputArray[index].inputID).value;
    if (firstCharisNotValid(inputArray[index].regex[0], input)) {
        displayError(inputArray[index].errorReportID, inputArray[index].errorReportText[1]);
    } else if (charIsNotValid(inputArray[index].regex[1], input)) {
        displayError(inputArray[index].errorReportID, inputArray[index].errorReportText[2]);
    } else if (twoSpacesInRow(inputArray[index].regex[2], input)) {
        displayError(inputArray[index].errorReportID, inputArray[index].errorReportText[3]);
    } else {
        document.getElementById(inputArray[index].errorReportID).style.color = 'var(--white-color)';
    }
}

/**
 * checks after leaving inputfield if input is valid
 * if input is valid or not, a report will be displayed
 * 
 * @param {number} index - index of inputfield
 */
function checkInputOnblur(inputArray, index) {
    let input = document.getElementById(inputArray[index].inputID).value;
    if (charIsNotValid(inputArray[index].regex[3], input)) {
        displayError(inputArray[index].errorReportID, inputArray[index].errorReportText[0]);
    } else if (input == '') {
        document.getElementById(inputArray[index].errorReportID).style.color = 'var(--white-color)';
    }
    displayValidInputs(inputArray);
}

/**
 * checks after leaving inputfield if every input is valid
 *  if input is valid, a report will be displayed
 */
function displayValidInputs(inputArray) {
    for (let i = 0; i < inputArray.length; i++) {
        let input = document.getElementById(inputArray[i].inputID).value;
        if (charIsNotValid(inputArray[i].regex[3], input) == false && input.length >= inputArray[i].inputlenght) {
            document.getElementById(inputArray[i].errorReportID).innerHTML = inputArray[i].validReportText;
            document.getElementById(inputArray[i].errorReportID).style.color = 'var(--darkGreen-color)';
        }
    }
}

/**
 * Returns the number of the valid inputs
 * 
 * @param {Array.<String>} errorReportArray - Array of error report ids
 * @returns {Number}
 */
function checkValidInputs(errorReportArray) {
    let count = 0;
    for (let i = 0; i < errorReportArray.length; i++) {
        let errorReport = document.getElementById(errorReportArray[i]);
        let color = window.getComputedStyle(errorReport, null).getPropertyValue('color');
        if (color == 'rgb(0, 127, 28)') {
            count++;
        }
    }
    return count;
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
    return reg.test(input) == false && input.length >= 1;
}

/**
 * Returns true if there are two spaces in row or false if not
 * 
 * @param {string} reg - regular expression
 * @param {string} input - input value
 * @returns {boolean}
 */
function twoSpacesInRow(reg, input) {
    return reg.test(input) == false && input.length > 1;
}

/**
 * Closes all error reports
 */
function closeErrorReports(errorReportArray) {
    for (let i = 0; i < errorReportArray.length; i++) {
        document.getElementById(errorReportArray[i]).style.color = 'var(--white-color)';
    }
}

/**
 * Clears the inputfields of the array
 */
function clearInputs(inputsArray) {
    for (let i = 0; i < inputsArray.length; i++) {
        document.getElementById(inputsArray[i].inputID).value = '';
    }
}