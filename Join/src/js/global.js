function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* looping through  */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
    getActiveLink();
}

function getActiveLink() {
    if(window.location.href.indexOf("summary") > -1){
        var element = document.getElementById("summaryLink");
        element.classList.add("active");
    }
    if(window.location.href.indexOf("board") > -1){
        var element = document.getElementById("boardLink");
        element.classList.add("active");
    }
    if(window.location.href.indexOf("add-task") > -1){
        var element = document.getElementById("addTaskLink");
        element.classList.add("active");
    }
    if(window.location.href.indexOf("contacts") > -1){
        var element = document.getElementById("contactsLink");
        element.classList.add("active");
    }
    if(window.location.href.indexOf("legal-notice") > -1){
        var element = document.getElementById("legalNoticeLink");
        element.classList.add("active");
    }
}

function openHeaderMenu() {
    if (window.innerWidth >= 468) {
        document.getElementById('headerMenu').classList.remove('d-none');
    } else {
        document.getElementById('mobileHeaderMenu').classList.remove('d-none');
    }
    
}

function closeHeaderMenu() {
    let headerMenu = document.getElementById('headerMenu');
    let mobileHeaderMenu = document.getElementById('mobileHeaderMenu');
    if (headerMenu.classList.contains('d-none') === false && window.innerWidth >= 468) {
        headerMenu.classList.add('d-none');
    }
    if (mobileHeaderMenu.classList.contains('d-none') === false && window.innerWidth < 468) {
        mobileHeaderMenu.classList.add('d-none');
    }
}

function openHelp() {
    document.location = 'help.html';
}

function stopPropagation(event) {
    event.stopPropagation();
}