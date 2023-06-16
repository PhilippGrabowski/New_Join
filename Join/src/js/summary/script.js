/*____________________________________________Settings________________________________________________*/

let taskAmountElements = ['to_do_amount', 'summary_task_in_progress_amount', 'summary_awaiting_feedback_amount', 'done_amount'];
let stat = ['to-do', 'in-progress', 'awaiting-feedback', 'done'];
let priorities = ['urgent', 'medium', 'low'];


/*___________________________________________Greeting Functions_______________________________________*/


/**
 * a greeting is generated depending on the time
 * depending on the screen size, the greeting of the mobile version is additionally generated
 */
async function renderGreeting() {
    await loadAccounts();
    let onlineAccountIndex = getOnlineAccountIndex();
    let greeting = document.getElementById('greeting');
    let mobileGreeting = document.getElementById('mobile_greeting');
    let hour = getHour();
    if (secondMobileGreeting(onlineAccountIndex)) {
        document.getElementById('mobile_greeting_container').classList.add('d-none');
        renderGreetingText(hour, greeting, onlineAccountIndex);
    } else if (firstMobileGreeting(onlineAccountIndex)) {
        renderMobileGreetingText(hour, greeting, mobileGreeting, onlineAccountIndex);
    } else {
        renderGreetingText(hour, greeting, onlineAccountIndex);
    }
}

/**
 * Returns the Index of the online account or -1 for guest login
 * 
 * @returns {Number}
 */
function getOnlineAccountIndex() {
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].online === true) {
            return i;
        } else if (i === accounts.length - 1) {
            return -1;
        }
    }
}

/**
 * Returns true if the if request matches or false if not
 * 
 * @param {Number} index - Index of accounts array
 * @returns {Boolean}
 */
function firstMobileGreeting(index) {
    if (index >= 0) {
        return ((window.innerWidth <= 1096 && window.innerHeight <= 768) || (window.innerWidth <= 1300 && window.innerHeight > 768))
            && accounts[index].greeting == 0;
    } else {
        return ((window.innerWidth <= 1096 && window.innerHeight <= 768) || (window.innerWidth <= 1300 && window.innerHeight > 768))
            && index == -1;
    }
}

/**
 * Returns true if the if request matches or false if not
 * 
 * @param {Number} index - Index of accounts array
 * @returns {Boolean}
 */
function secondMobileGreeting(index) {
    if ((index >= 0 && accounts[index].greeting == 1) || index == -1) {
        return true;
    } else {
        return false;
    }
}

/**
 * Generates greeting and the name of online account for mobile version
 * 
 * @param {Number} hour - Hour of the current time
 * @param {*} greeting - Greeting container
 * @param {*} mobileGreeting - Mobile greeting container
 * @param {Number} index - Index of accounts array
 */
function renderMobileGreetingText(hour, greeting, mobileGreeting, index) {
    renderGreetingText(hour, mobileGreeting, index);
    renderGreetingText(hour, greeting, index);
    setTimeout(() => {
        document.getElementById('mobile_greeting_container').classList.add('d-none');
    }, 2000);
}

/**
 * Generates greeting and the name of online account
 * 
 * @param {number} hour - Hour of the current time
 */
function renderGreetingText(hour, greeting, index) {
    if (hour >= 6 && hour <= 11) {
        greeting.innerHTML = 'Good morning,';
    } else if (hour >= 12 && hour <= 18) {
        greeting.innerHTML = 'Good afternoon,';
    } else if (hour >= 19 && hour <= 23) {
        greeting.innerHTML = 'Good evening,';
    } else {
        greeting.innerHTML = 'Good night,';
    }
    renderAccountName(index);
}

/**
 * Generates the name of the online account or Guest
 * 
 * @param {Number} index - Index of accounts array
 */
async function renderAccountName(index) {
    if (index >= 0) {
        fillAccountName(accounts[index].name);
        accounts[index].greeting = 1;
        await saveAccount();
    } else {
        fillAccountName('Guest');
    }
}

/**
 * Generates the name of the online account for all account_name containers
 * 
 * @param {String} accountName - Name of the account
 */
function fillAccountName(accountName) {
    let nameContainer = document.querySelectorAll('.account_name');
    nameContainer.forEach(name => {
        name.innerHTML = accountName;
    });
}

/**
 * Returns the hour of the current time
 *
 * @returns {Number}
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
    if ((window.innerWidth <= 1096 && window.innerHeight <= 768) || (window.innerWidth <= 1300 && window.innerHeight > 768)) {
        document.getElementById('mobile_greeting_container').classList.add('d-none');
    }
})

/*__________________________________Render Board - Summary Functions___________________________________*/

/**
 * Fills all summary informations
 */
async function fillSummaryContent() {
    await loadTasks();
    fillTaskAmounts();
    fillUpcomingTaskContainer();
}

/**
 * Sets the total number of tasks and the number of tasks according to the status 
 */
function fillTaskAmounts() {
    document.getElementById('summary_task_in_bord_amount').innerHTML = tasks.length;
    for (let i = 0; i < taskAmountElements.length; i++) {
        let taskAmountElement = document.getElementById(taskAmountElements[i]);
        let task = tasks.filter(t => t.status === stat[i]);
        taskAmountElement.innerHTML = task.length;
    }
}

/**
 *  sets the number of tasks according to the priority of the deadline that ends next as well as the priority symbol and deadline date
 */
function fillUpcomingTaskContainer() {
    if (tasks.length == 0) {
        document.querySelector('.upcoming_task_container').classList.add('d-none');
    } else {
        for (let i = 0; i < 3; i++) {
            let task = tasks.filter(t => t.priority[0].priority === priorities[i]);
            if (task.length > 0) {
                renderUpcomingPriority(task, i);
                document.getElementById('deadline_date').innerHTML = getDeadlineDate(task);
                break;
            }
        }   
    }
}

/**
 * Renders and fills the task amount according to the priority
 * 
 * @param {Array.<{title: String, description: String, duedate: String, priority: Array, category: Array,
 *         subtask: Array, assigned: Array, status: String, id: Number}>} task - Priority filterd task array 
 * @param {number} i - Number of loop through filtered task
 */
function renderUpcomingPriority(task, i) {
    document.getElementById('priority_symbol').innerHTML = renderSymbol(i);
    document.getElementById('priority_symbol').style.backgroundColor = task[0].priority[0].color;
    document.getElementById('priority_amount').innerHTML = task.length;
    document.getElementById('priority').innerHTML = firstLetterToUpperCase(priorities[i]);
}

/**
 * creates the symbol according to the priority
 * 
 * @param {number} i - Number of loop through filtered task
 * @returns {html}
 */
function renderSymbol(i) {
    switch (i) {
        case 0:
            return createUrgentPriority();
        case 1:
            return createMediumPriority();
        case 2:
            return createLowPriority();
    }
}

/**
 * Returns the priority where the first letter is an uppercase letter
 * priority is converted to an array of all characters and the first char is converted to an uppercase letter
 * then the array is converted back to a string
 * 
 * @returns {string} - Name of contact
 */
function firstLetterToUpperCase(priority) {
    let prio = priority
    let chars = Array.from(prio);
    chars[0] = chars[0].toUpperCase();
    prio = chars.join('');
    return prio;
}

/**
 * Returns the deadline date of the task according to the priority which is next
 * the due dates of the tasks are pushed into an array and sorted
 * the next date is determined and returned in an appropriate format
 * 
 * @param {Array.<{title: String, description: String, duedate: String, priority: Array, category: Array,
 *         subtask: Array, assigned: Array, status: String, id: Number}>} task - Priority filterd task array 
 * @returns {string}
 */
function getDeadlineDate(task) {
    let dates = [];
    dates = getDueDates(task, dates);
    let deadlineDate = dates[dates.length - 1];
    deadlineDate = formatDate(deadlineDate);
    return deadlineDate;
}

/**
 * Creates a list of all due dates and returns it sorted
 * 
 * @param {Array.<{title: String, description: String, duedate: String, priority: Array, category: Array,
 *         subtask: Array, assigned: Array, status: String, id: Number}>} task - Priority filterd task array 
 * @param {Array} dates - Due dates array
 * @returns {Array}
 */
function getDueDates(task, dates) {
    for (let i = 0; i < task.length; i++) {
        let date = new Date(task[i].duedate);
        dates.push(date);
    }
    dates.sort(function (a, b) {
        return b - a;
    });
    return dates;
}

/**
 * Returns the next due date in an appropriate format
 * 
 * @param {Date} date - Next due date
 * @returns {string}
 */
function formatDate(date) {
    let deadlineDate = date.toLocaleDateString("en-Us", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
    return deadlineDate;
}

/*_____________________________General Functions________________________________*/

/**
 * Rewrite SVG files read by img tags to inline codes for changing attributes
 */
window.addEventListener('load', function() {
    deSVG('.edit_task_img', true);
});

