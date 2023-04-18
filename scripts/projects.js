const projectsTemplate = document.querySelector("#projects-template");
const projectsContainer = document.querySelector("#projects-container");

/**
 * Fetches projects data from a remote JSON file and populates the
 * DOM with the data.
 *
 * @returns {Promise<void>} A Promise that resolves once the projects
 * data has been fetched and the DOM has been updated.
 *
 * @throws {Error} An error is thrown if the projects data cannot be
 * fetched or if there is an error updating the DOM.
 */
async function getProjects() {
    const response = await fetch('https://assets.teogor.dev/json/projects.json');
    const data = await response.json();

    data.forEach(({ description, link, title, tools }) => {
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
}

window.addEventListener("load", function() {
    getProjects().catch(error => {
        console.error(error);
    });
});