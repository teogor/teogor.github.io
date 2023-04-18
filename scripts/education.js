import { formatDate } from './dateUtils.js';

const educationTemplate = document.querySelector("#education-template");
const educationContainer = document.querySelector("#education-container");

/**
 * Fetches education data from a remote JSON file and populates the
 * DOM with the data.
 *
 * @returns {Promise<void>} A Promise that resolves once the education
 * data has been fetched and the DOM has been updated.
 *
 * @throws {Error} An error is thrown if the education data cannot be
 * fetched or if there is an error updating the DOM.
 */
async function getEducation() {
    const response = await fetch('https://assets.teogor.dev/json/education.json');
    const data = await response.json();

    data.forEach(educationData => {
        const {school, degree, fieldOfStudy, startDate, endDate} = educationData;
        const instance = educationTemplate.content.cloneNode(true);
        instance.querySelector('h2').textContent = school;
        instance.querySelector('p:nth-of-type(1)').textContent = `${degree}`;
        instance.querySelector('p:nth-of-type(2)').textContent = `${fieldOfStudy}`;
        instance.querySelector('p:nth-of-type(3)').textContent = `${formatDate(startDate, endDate)}`;
        educationContainer.appendChild(instance);
    });
}

window.addEventListener("load", function() {
    getEducation().catch(error => {
        console.error(error);
    });
});