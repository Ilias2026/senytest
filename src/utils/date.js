const currDate = new Date()
const currYear = currDate.getFullYear()

/**
 * 
 * @param {any} date 
 * @returns {Date}
 */
function checkDate(date) {
    if (!date) return false
    if (!(date instanceof Date)) {
        date = new Date(date)
    }
    return date
}

function calculateDaysInterval(date1, date2) {
    return (new Date(date1) - new Date(date2)) / (1000 * 60 * 60 * 24)
}

function formatDateShort(date, options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
}) {
    if(!(date = checkDate(date))) return ''
    return date.toLocaleString('en-US', options);
}

function formatDateSmall(date) {
    if(!(date = checkDate(date))) return ''
    if (date.getFullYear() === currYear) {
        return formatDateShort(date, {
            month: 'short',
            day: 'numeric'
        })
    }
    return formatDateShort(date)
}

function formatDateHTML(date) {
    if(!(date = checkDate(date))) return ''
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

//calculate the number of a time unit is in provided seconds (exp: how many hours are in 7200 seconds => 2 hours)
function getTimeCase(time, divider) {
    const offset = time - (time % divider)
    return {
        rest: time - offset,
        t: offset / divider
    }
}

/**
 * make time seconds readable in hours, minutes and seconds
 * @param {number} time time in seconds
 */
function readableSeconds(time) {
    const hours = getTimeCase(time, 3600)
    const minutes = getTimeCase(hours.rest, 60)
    const seconds = getTimeCase(minutes.rest, 1)
    return `${hours.t}H ${minutes.t}M ${seconds.t}S`
}


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
function getDayName(date) {
    if(!(date = checkDate(date))) return ''
    return days[date.getDay()]
}

const date = {
    calculateDaysInterval,
    formatDateShort,
    formatDateSmall,
    formatDateHTML,
    readableSeconds,
    getDayName,
}

export default date;