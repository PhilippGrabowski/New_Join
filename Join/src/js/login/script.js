function loginAnimation() {
    setTimeout(() => {
        animateLogo();
    }, 1000)
    setTimeout(() => {
        animateLoginMenus();
    }, 1500)
}

function animateLogo() {
    document.getElementById('login_logo').style.top = '5.5rem';
    document.getElementById('login_logo').style.left = '5.3vw';
    document.getElementById('login_logo').style.scale = '1.0';
}

function animateLoginMenus() {
    document.getElementById('signup_head_container').classList.remove('d-none');
    document.getElementById('login_container').classList.remove('d-none');
}

function toggleMenu(element1, element2, element3) {
    document.getElementById(element1).classList.toggle('d-none');
    document.getElementById(element2).classList.toggle('d-none');
    document.getElementById(element3).classList.toggle('d-none');
}

function toggleResetMenu() {
    document.getElementById('forgot_password_container').classList.toggle('d-none');
    document.getElementById('reset_password_container').classList.toggle('d-none');
}

function sendPassword() {
    toggleResetMenu();
}

function signup() {
    toggleMenu('login_container', 'signup_container', 'signup_head_container');
}

function login() {
    document.getElementById('login_email_error').style.color = 'var(--white-color)';
    document.getElementById('login_password_error').style.color = 'var(--white-color)';
    let email = document.getElementById('login_email_input').value;
    let password = document.getElementById('login_password_input').value;
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].email === email) {
            checkPassword(password, i);
        } else {
            displayError('login_email_error', 'error: email is not known');
        }
    }
}

function checkPassword(password, index) {
    if (accounts[index].password === password) {
        document.location.href = 'summary.html';
    } else {
        displayError('login_password_error', 'error: wrong password');
    }
}



/**
 * checks after leaving inputfield if input is valid
 * if input is valid or not, a report will be displayed
 * 
 * @param {number} index - index of inputfield
 */
function checkInputOnblur2(index) {
    let input = document.getElementById(loginInputs[index].inputID).value;
    if (charIsNotValid(loginInputs[index].regex[3], input)) {
        displayError(loginInputs[index].errorReportID, loginInputs[index].errorReportText[0]);
    } else if (input == '') {
        document.getElementById(loginInputs[index].errorReportID).style.color = 'var(--white-color)';
    }
    displayValidInputs2();
}

/**
 * checks after leaving inputfield if every input is valid
 *  if input is valid, a report will be displayed
 */
function displayValidInputs2() {
    for (let i = 0; i < loginInputs.length; i++) {
        let input = document.getElementById(loginInputs[i].inputID).value;
        if (charIsNotValid(loginInputs[i].regex[3], input) == false && input.length >= loginInputs[i].inputlenght) {
            document.getElementById(loginInputs[i].errorReportID).innerHTML = loginInputs[i].validReportText;
            document.getElementById(loginInputs[i].errorReportID).style.color = 'var(--darkGreen-color)';
        }
    }
}