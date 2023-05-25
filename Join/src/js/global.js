function includeHTML() {
    let z, i, elmnt, file, xhttp;
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
    if (window.location.href.indexOf("summary") > -1) {
        addActiveBgr('summary_link', 'mobile_summary_link');
    }
    if (window.location.href.indexOf("board") > -1) {
        addActiveBgr('board_link', 'mobile_board_link');
    }
    if (window.location.href.indexOf("add-task") > -1) {
        addActiveBgr('add_task_link', 'mobile_add_task_link');
    }
    if (window.location.href.indexOf("contacts") > -1) {
        addActiveBgr('contact_link', 'mobile_contact_link');
    }
    if (window.location.href.indexOf("legal-notice") > -1) {
        let element = document.getElementById("legal_notice_link");
        element.classList.add("active");
    }
}

window.addEventListener('resize', () => {
    getActiveLink();
});

function addActiveBgr(id1, id2) {
    let element = document.getElementById(id1);
    let element2 = document.getElementById(id2);
    if (window.innerWidth <= 468) {
        element2.classList.add("active");
    } else {
        element.classList.add("active");
    }
}

function openHeaderMenu() {
    if (window.innerWidth >= 468) {
        document.getElementById('header_menu').classList.remove('d-none');
    } else {
        document.getElementById('mobile_header_menu').classList.remove('d-none');
    }
    
}

function closeHeaderMenu() {
    let headerMenu = document.getElementById('header_menu');
    let mobileHeaderMenu = document.getElementById('mobile_header_menu');
    if (headerMenu.classList.contains('d-none') === false && window.innerWidth >= 468) {
        headerMenu.classList.add('d-none');
    }
    if (mobileHeaderMenu.classList.contains('d-none') === false && window.innerWidth < 468) {
        mobileHeaderMenu.classList.add('d-none');
    }
}

function toggleHelp() {
    document.getElementById('help_link').classList.toggle('d-none');
    document.getElementById('help_includer').classList.toggle('d-none');
}

function stopPropagation(event) {
    event.stopPropagation();
}