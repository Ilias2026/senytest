const currDate = new Date()
const currYear = currDate.getFullYear()

function calculateDaysInterval(date1, date2) {
    return (new Date(date1) - new Date(date2)) / (1000 * 60 * 60 * 24)
}

function formatDateShort(date, options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
}) {
    if (!date) return ''
    if (!(date instanceof Date)) {
        date = new Date(date)
    }
    return date.toLocaleString('en-US', options);
}

function formatDateSmall(date) {
    if (!(date instanceof Date)) {
        date = new Date(date)
    }
    if (date.getFullYear() === currYear) {
        return formatDateShort(date, {
            month: 'short',
            day: 'numeric'
        })
    }
    return formatDateShort(date)
}

function formatDateHTML(date) {
    if (!date) return ''
    if (!(date instanceof Date)) {
        date = new Date(date)
    }
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

function getTimeCase(time, divider) {
    const offset = time - (time % divider)
    return {
        rest: time - offset,
        t: offset / divider
    }
}

/**
 * 
 * @param {number} time time in seconds
 */
function readableSeconds(time) {
    const hours = getTimeCase(time, 3600)
    const minutes = getTimeCase(hours.rest, 60)
    const seconds = getTimeCase(minutes.rest, 1)
    return `${hours.t}H ${minutes.t}M ${seconds.t}S`
}

const date = {
    calculateDaysInterval,
    formatDateShort,
    formatDateSmall,
    formatDateHTML,
    readableSeconds
}

export default date;