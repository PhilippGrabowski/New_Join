function loginAnimation() {
    setTimeout(() => {
        animateLogo();
    }, 1000)
    setTimeout(() => {
        animateLoginMenus();
    }, 1500)
}

function animateLogo() {
    document.getElementById('loginLogo').style.top = '5.5rem';
    document.getElementById('loginLogo').style.left = '5.3vw';
    document.getElementById('loginLogo').style.scale = '1.0';
}

function animateLoginMenus() {
    document.getElementById('signupContainer').classList.remove('d-none');
    document.getElementById('loginContainer').classList.remove('d-none');
}

function toggleLoginMenu(headline) {
    document.getElementById('signupContainer').classList.toggle('d-none');
    document.getElementById('SignupArrowLeft').classList.toggle('d-none');
    document.querySelector('.LoginHeader').innerHTML = headline;
    document.querySelector('.loginInputsContainer').classList.toggle('d-none');
    document.querySelector('.signupInputsContainer').classList.toggle('d-none');
    document.getElementById('loginCheckboxContainer').classList.toggle('d-none');
    document.getElementById('loginButtonsContainer').classList.toggle('d-none');
    document.getElementById('signupButtonsContainer').classList.toggle('d-none');
}

function toggleForgotPasswordMenu() {
    document.getElementById('loginContainer').classList.toggle('d-none');
    document.getElementById('forgotPasswordContainer').classList.toggle('d-none');
    document.getElementById('signupContainer').classList.toggle('d-none');
}

function changeToResetPasswordMenu() {
    document.getElementById('forgotPasswordArrowLeft').setAttribute('onclick', 'changeToForgotPassword()');
    document.querySelector('.forgotpasswordHeader').innerHTML = 'Reset your password';
    document.querySelector('.forgotpasswordSubHeader').innerHTML = 'Change your account password';
    document.getElementById('forgotPasswordEmailInputContainer').classList.add('d-none');
    document.querySelector('.resetPasswordInputsContainer').classList.remove('d-none');
    document.getElementById('forgotpPasswordButton').innerHTML = 'Continue';
    document.getElementById('forgotpPasswordButton').setAttribute('onclick', 'resetPassword()');
}

function changeToForgotPassword() {
    document.getElementById('forgotPasswordArrowLeft').setAttribute('onclick', 'toggleForgotPasswordMenu()');
    document.querySelector('.forgotpasswordHeader').innerHTML = 'I forgot my password';
    document.querySelector('.forgotpasswordSubHeader').innerHTML = `Don't worry! We will send you an email with the instructions to reset your
    password.`;
    document.getElementById('forgotPasswordEmailInputContainer').classList.remove('d-none');
    document.querySelector('.resetPasswordInputsContainer').classList.add('d-none');
    document.getElementById('forgotpPasswordButton').innerHTML = 'Send me the email';
    document.getElementById('forgotpPasswordButton').setAttribute('onclick', 'changeToResetPasswordMenu()');
}

function resetPassword() {
    document.getElementById('forgotPasswordContainer').classList.add('d-none');
    animateLoginMenus();
    changeToForgotPassword();
}