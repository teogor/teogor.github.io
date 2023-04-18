const projectsTemplate = document.querySelector("#projects-template");
const projectsContainer = document.querySelector("#projects-container");

fetch('https://assets.teogor.dev/json/projects.json')
    .then(response => response.json())
    .then(projectsData => {
        projectsData.forEach(({ description, link, title, tools }) => {
            const instance = projectsTemplate.content.cloneNode(true);
            const linkElement = instance.querySelector("a");
            const titleElement = instance.querySelector(".text-2xl");
            const descriptionElement = instance.querySelector(".text-lg:nth-of-type(1)");
            const toolsElement = instance.querySelector(".text-lg:nth-of-type(2)");

            linkElement.href = link;
            titleElement.innerText = title;
            descriptionElement.innerText = description;
            toolsElement.innerText = tools;

            projectsContainer.appendChild(instance);
        });
    })
    .catch(error => {
        console.error(error);
    });
