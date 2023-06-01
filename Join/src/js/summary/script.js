/*____________________________________________Settings________________________________________________*/

let taskAmountElements = ['to_do_amount', 'summary_task_in_progress_amount', 'summary_awaiting_feedback_amount', 'done_amount'];
let stat = ['to-do', 'in-progress', 'awaiting-feedback', 'done'];


/*___________________________________________Greeting Functions_______________________________________*/


/**
 * a greeting is generated depending on the time
 * depending on the screen size, the greeting of the mobile version is additionally generated
 */
function renderGreeting() {
    let greeting = document.getElementById('greeting');
    let mobileGreeting = document.getElementById('mobile_greeting');
    let hour = getHour();
    if ((window.innerWidth <= 1096 && window.innerHeight <= 768) || (window.innerWidth <= 1300 && window.innerHeight > 768)) {
        renderGreetingText(hour, mobileGreeting);
        renderGreetingText(hour, greeting);
        setTimeout(() => {
            document.getElementById('mobile_greeting_container').classList.add('d-none');
        }, 2000);
    } else {
        renderGreetingText(hour, greeting);
    }
}

/**
 * Generated greeting
 * 
 * @param {number} hour - Hour of the current time
 */
function renderGreetingText(hour, greeting) {
    if (hour >= 6 && hour <= 11) {
        greeting.innerHTML = 'Good morning,';
    } else if (hour >= 12 && hour <= 18) {
        greeting.innerHTML = 'Good afternoon,';
    } else if (hour >= 19 && hour <= 23) {
        greeting.innerHTML = 'Good evening,';
    } else {
        greeting.innerHTML = 'Good night,';
    }
}

/**
 * Returns the hour of the current time
 */
function getHour() {
    let date = new Date();
    let hour = date.getHours();
    return hour;
}

/**
 * Hides mobile greeting while resizing window 
 */
window.addEventListener('resize', function() {
    if (window.innerWidth <= 1096) {
        document.getElementById('mobile_greeting_container').classList.add('d-none');
    }
})

/*__________________________________Render Board - Summary Functions___________________________________*/

async function fillSummaryContent() {
    await loadTasks();
    fillTaskAmounts();
    
    
    let task = tasks.filter(t => t['priorities'] === stat[i]);
}

/**
 * Sets the total number ogf tasks and the number of tasks according to the status 
 */
function fillTaskAmounts() {
    document.getElementById('summary_task_in_bord_amount').innerHTML = tasks.length;
    for (let i = 0; i < taskAmountElements.length; i++) {
        let taskAmountElement = document.getElementById(taskAmountElements[i]);
        let task = tasks.filter(t => t['status'] === stat[i]);
        taskAmountElement.innerHTML = task.length;
    }
}


/*_____________________________General Functions________________________________*/

/**
 * Rewrite SVG files read by img tags to inline codes for changing attributes
 */
window.addEventListener('load', function() {
    deSVG('.edit_task_img', true);
});

