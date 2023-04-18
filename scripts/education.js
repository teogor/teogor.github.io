import { formatDate } from './dateUtils.js';

const educationTemplate = document.querySelector("#education-template");
const educationContainer = document.querySelector("#education-container");

fetch('https://assets.teogor.dev/json/education.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(educationData => {
            const {school, degree, fieldOfStudy, startDate, endDate} = educationData;
            const instance = educationTemplate.content.cloneNode(true);
            instance.querySelector('h2').textContent = school;
            instance.querySelector('p:nth-of-type(1)').textContent = `${degree}`;
            instance.querySelector('p:nth-of-type(2)').textContent = `${fieldOfStudy}`;
            instance.querySelector('p:nth-of-type(3)').textContent = `${formatDate(startDate, endDate)}`;
            educationContainer.appendChild(instance);
        });
    });