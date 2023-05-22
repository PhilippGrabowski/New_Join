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