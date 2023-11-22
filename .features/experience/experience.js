const EMPLOYMENT_TYPE_MAP = {
    C: 'Contract',
    F: 'Full-time',
    I: 'Internship',
    P: 'Part-time',
};

/**
 * Fetches experience data from a remote JSON file and populates the
 * DOM with the data.
 *
 * @returns {Promise<void>} A Promise that resolves once the experience
 * data has been fetched and the DOM has been updated.
 *
 * @throws {Error} An error is thrown if the experience data cannot be
 * fetched or if there is an error updating the DOM.
 */
async function getExperience() {
    const response = await fetch(".features/experience/experience.json");
    const data = await response.json();
    const experienceTemplate = document.querySelector('#experience-template');
    const experienceContainer = document.querySelector('#experience-container');
    const experienceTagListContainer = document.querySelector('#experience-tag-list');
    const allTags = new Set();

    data.forEach(experienceData => {
        const { position, company, employmentType, startDate, expertiseAreas } = experienceData;
        const instance = experienceTemplate.content.cloneNode(true);
        let endDate = experienceData.endDate;

        if (endDate === 'P') {
            const today = new Date();
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const year = today.getFullYear().toString();
            endDate = `${month}${year}`;
        }

        instance.querySelector('h2').textContent = position;
        instance.querySelector('p:nth-of-type(1)').textContent = `${company} (${EMPLOYMENT_TYPE_MAP[employmentType] || 'Invalid employment type'})`;
        instance.querySelector('p:nth-of-type(2)').textContent = `${formatDate(startDate, endDate)}`;

        const tagTemplate = instance.querySelector('#tag-clone');
        const tagsContainer = instance.querySelector('#tags');
        const tags = expertiseAreas.map(tagName => {
            const tagInstance = tagTemplate.cloneNode(true);
            allTags.add(tagName);
            tagInstance.id = `tag-${tagName}`;
            tagInstance.textContent = `#${tagName}`;
            return tagInstance;
        });
        tagsContainer.append(...tags);

        const clonedTag = tagsContainer.querySelector('#tag-clone');
        tagsContainer.removeChild(clonedTag);

        const tagElements = tagsContainer.querySelectorAll('p');
        addTagListeners(tagElements);

        experienceContainer.appendChild(instance);
    });

    const tagList = Array.from(allTags);
    tagList.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.textContent = `#${tag}`;
        tagElement.classList.add('tag', 'not-selectable');
        tagElement.addEventListener('click', () => {
            // Show only relevant experiences
            const selectedTag = tag;
            const isSelected = tagElement.classList.contains('selected');
            if (isSelected) {
                // Deselect tag if already selected
                deselectAllTags();
            } else {
                filterExperiencesByTag(selectedTag);
            }
        });
        tagElement.selected = false;
        experienceTagListContainer.appendChild(tagElement);
    });
}

/**
 * Adds click event listeners to the given tags, which filter the experiences
 * displayed based on the tag that was clicked.
 *
 * @param {NodeListOf<Element>} tags - A collection of DOM elements representing the tags.
 */
function addTagListeners(tags) {
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Show only relevant experiences
            const selectedTag = tag.textContent.slice(1);
            const isSelected = tag.classList.contains('selected');

            if (isSelected) {
                // Deselect tag if already selected
                deselectAllTags();
            } else {
                // Deselect all tags and filter experiences by selected tag
                tags.forEach(tag => {
                    tag.classList.remove('selected');
                });
                filterExperiencesByTag(selectedTag);
            }
        });
    });
}

/**
 * Deselects all tags in the experiences and shows all experiences.
 */
function deselectAllTags() {
    const experiences = experienceContainer.querySelectorAll('.experience');
    experiences.forEach(experience => {
        experience.style.display = 'block';
        const experienceTags = experience.querySelectorAll('.tag');
        experienceTags.forEach(tag => tag.classList.remove('selected'));
    });
    const filterTags = experienceTagListContainer.querySelectorAll('.tag');
    filterTags.forEach(filterTag => {
        filterTag.classList.remove('selected')
    })
}


/**
 * Filters the list of experiences to only show those that contain the selected tag, and highlights
 * the selected tag in each experience.
 *
 * @param {string} selectedTag - The tag to filter experiences by.
 */
function filterExperiencesByTag(selectedTag) {
    const filterTags = experienceTagListContainer.querySelectorAll('.tag');
    Array.from(filterTags).filter(tag => tag.textContent !== `#${selectedTag}`)
        .forEach(tag => tag.classList.remove('selected'))
    Array.from(filterTags).filter(tag => tag.textContent === `#${selectedTag}`)
        .forEach(tag => tag.classList.add('selected'))
    const experiences = experienceContainer.querySelectorAll('.experience');
    experiences.forEach(experience => {
        const experienceTags = experience.querySelectorAll('.tag');
        Array.from(experienceTags).filter(tag => tag.textContent !== `#${selectedTag}`)
            .forEach(tag => tag.classList.remove('selected'));
        const isRelevant = Array.from(experienceTags).some(tag => tag.textContent === `#${selectedTag}`);
        if (isRelevant) {
            experience.style.display = 'block';
        } else {
            experience.style.display = 'none';
        }
        Array.from(experienceTags).filter(tag => tag.textContent === `#${selectedTag}`)
            .forEach(tag => tag.classList.add('selected'));
    });
}