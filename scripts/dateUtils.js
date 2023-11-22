/**
 * Calculates the duration between two dates in months.
 *
 * @param {string} startDate - The start date in the format "MMYYYY".
 * @param {string} endDate - The end date in the format "MMYYYY".
 * @returns {string} The duration between the two dates in years and months.
 */
function calculateDuration(startDate, endDate) {
    const startMonth = parseInt(startDate.substring(0, 2));
    const startYear = parseInt(startDate.substring(2));
    const endMonth = parseInt(endDate.substring(0, 2));
    const endYear = parseInt(endDate.substring(2));

    const months = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years > 0 && remainingMonths > 0) {
        return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
    } else if (years > 0) {
        return `${years} yr${years > 1 ? 's' : ''}`;
    } else {
        return `${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
    }
}

/**
 * Returns a formatted string representing the start and end date of a job,
 * along with the duration of the job.
 *
 * @param {string} startDate - The start date of the job in MMYYYY format.
 * @param {string} endDate - The end date of the job in MMYYYY format.
 * @returns {string} A string formatted as "Month Year - Month Year (Duration)",
 * where "Month Year" is the parsed start and end date, and "Duration" is the
 * difference between the start and end date in years and months.
 */
function formatDate(startDate, endDate) {
    const duration = calculateDuration(startDate, endDate);
    const formattedStartDate = parseDate(startDate);
    const formattedEndDate = parseDate(endDate);

    return `${formattedStartDate} - ${formattedEndDate} (${duration})`;
}

/**
 * Formats a date string in the format "MMYYYY" to the format "Month Year".
 *
 * @param {string} dateString - The date string to be formatted.
 * @returns {string} The formatted date string.
 */
function parseDate(dateString) {
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    const monthIndex = parseInt(dateString.substring(0, 2)) - 1;
    const year = dateString.substring(2);

    return monthNames[monthIndex].substring(0, 3) + " " + year;
}