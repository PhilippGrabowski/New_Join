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

function toggleLogoutLink() {
    document.getElementById('logoutLink').classList.toggle('d-none');
}

function openHelp() {
    document.location = 'help.html';
}
