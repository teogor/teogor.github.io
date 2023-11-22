import {parseDate} from '../../scripts/dateUtils.js';

const honorsAndAwardsTemplate = document.querySelector("#honors-and-awards-template");
const honorsAndAwardsContainer = document.querySelector("#honors-and-awards-container");

/**
 * Fetches honors and awards data from a remote JSON file and populates the
 * DOM with the data.
 *
 * @returns {Promise<void>} A Promise that resolves once the honors and awards
 * data has been fetched and the DOM has been updated.
 *
 * @throws {Error} An error is thrown if the honors and awards data cannot be
 * fetched or if there is an error updating the DOM.
 */
async function getHonorsAndAwards() {
    const response = await fetch(".features/education/honors-and-awards.json");
    const data = await response.json();

    data.forEach(educationData => {
        const {title, place, associatedWith, issuer, issueDate} = educationData;
        const instance = honorsAndAwardsTemplate.content.cloneNode(true);
        instance.querySelector('h2').textContent = `${title}`;
        if (associatedWith === "N/A") {
            instance.querySelector('p:nth-of-type(1)').style.display = "none";
        } else {
            instance.querySelector('p:nth-of-type(1)').textContent = `${associatedWith}`;
        }
        instance.querySelector('p:nth-of-type(2)').textContent = `Issued by ${issuer}`;
        instance.querySelector('p:nth-of-type(3)').textContent = `${formatAward(issueDate, place)}`;
        honorsAndAwardsContainer.appendChild(instance);
    });
}

window.addEventListener("load", function() {
    getHonorsAndAwards().catch(error => {
        console.error(error);
    });
});

/**
 * Returns the ordinal suffix for a given number.
 *
 * @param {number} num - The number to get the suffix for.
 * @returns {string} The ordinal suffix for the number (e.g. "1st", "2nd", "3rd", etc.).
 */
function addOrdinalSuffix(num) {
    if (num <= 0) return `${num}`;

    switch (num % 100) {
        case 11:
        case 12:
        case 13:
            return num + "th";
        default:
            switch (num % 10) {
                case 1:
                    return num + "st";
                case 2:
                    return num + "nd";
                case 3:
                    return num + "rd";
                default:
                    return num + "th";
            }
    }
}

/**
 * Returns a string containing the formatted issue date and place with ordinal suffix,
 * only if the place is not equal to 0.
 * @param {string} issueDate - The date the honor/award was issued (in MMYYYY format)
 * @param {number} place - The place the honor/award was received
 * @returns {string} - A string containing the formatted issue date and place with ordinal suffix,
 * only if the place is not equal to 0
 */
function formatAward(issueDate, place) {
    if (place !== 0) {
        return `${parseDate(issueDate)}, ${addOrdinalSuffix(place)} Place`;
    } else {
        return `${parseDate(issueDate)}`;
    }
}