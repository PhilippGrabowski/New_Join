/**
 * Returns the html for the low priority symbol
 * 
 * @returns {html}
 */
function createLowPriority() {
    return `<i class='bx bx-chevrons-down low'></i>`
}

/**
 * Returns the html for the urgent priority symbol
 * 
 * @returns {html}
 */
function createUrgentPriority() {
    return `<i class='bx bx-chevrons-up urgent'></i>`
}

/**
 * Returns the html for the medium priority symbol
 * 
 * @returns {html}
 */
function createMediumPriority() {
    return `<div class="medium_container flex-column">
    <i class='bx bx-minus medium upper_minus'></i>
    <i class='bx bx-minus medium lower_minus'></i></div>`
}