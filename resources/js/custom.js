function onResumeButtonClick(event) {
  const introSection = document.querySelector("section#intro");
  const resumeContainer = document.querySelector(".resume-container");
  const resumeContainerIsVisible = resumeContainer.style.display === "block";
  if (resumeContainerIsVisible) {
    resumeContainer.style.display = "none";
    introSection.scrollIntoView();
  } else {
    resumeContainer.style.display = "block";
    resumeContainer.scrollIntoView();
    gtag("event", "resume.view", {});
  }
}

function onCvButtonClick(event) {
  const introSection = document.querySelector("section#intro");
  const resumeContainer = document.querySelector(".cv-container");
  const resumeContainerIsVisible = resumeContainer.style.display === "block";
  if (resumeContainerIsVisible) {
    resumeContainer.style.display = "none";
    introSection.scrollIntoView();
  } else {
    resumeContainer.style.display = "block";
    resumeContainer.scrollIntoView();
    gtag("event", "cv.view", {});
  }
}

/**
 * Filters the experience items by type.
 * @param {event} event The click event.
 * @param {section} section The section the user wants to switch to.
 */
function filterByExperienceType(event, section) {
  // Make currently active tab and tab link inactive
  const openTabs = document.querySelectorAll("section.experience-item");

  const ACTIVE_EXPERIENCE_CLASS = "experience-active";
  const ACTIVE_TABITEM_CLASS = "tablink-active";

  openTabs.forEach(openTab => {
    const shouldDisplayTab = section == "all" || openTab.classList.contains("experience-"+section);
    if (shouldDisplayTab) {
      if (!openTab.classList.contains(ACTIVE_EXPERIENCE_CLASS)) {
        openTab.classList.add(ACTIVE_EXPERIENCE_CLASS);
      }
    } else {
      openTab.classList.remove(ACTIVE_EXPERIENCE_CLASS)
    }
  })

  const openTabLink = document.querySelector("button.tablinks." + ACTIVE_TABITEM_CLASS);
  openTabLink.classList.toggle(ACTIVE_TABITEM_CLASS);
  event.currentTarget.classList.toggle(ACTIVE_TABITEM_CLASS);
  gtag("event", `section.${section}.view`, {});
}

window.onload = () => {
  getExperienceList().then(list => {
    renderExperience(list);
  }).catch(error => {
    console.log(error);
  });
  getResearchOutput().then(output => {
    renderResearch(output);
  }).catch(error => {
    console.log(error);
  });
}

const getContent = async url => {
  const response = await fetch(url);
  const responseText = await response.text();
  return await jsyaml.load(responseText);
}

// Reads and parses experience list file
const getExperienceList = async () => {
    return getContent("/resources/content/experience.yaml");
}

// Reads and parses research list file
const getResearchOutput = async () => {
    return getContent("/resources/content/research.yaml");
}

// Generates an individual experience item card with data
const generateExperienceItem = (itemData) => {
    let experienceElement = document.createElement("section");
    experienceElement.classList.add("experience-item", "experience-active", "experience-" + itemData.type);
    
    let experienceImage = document.createElement("img");
    experienceImage.setAttribute("src", itemData.icon);
    experienceElement.appendChild(experienceImage);

    // Heading
    let experienceHeading = document.createElement("h3");

    let experienceOrganization = document.createElement("span");
    experienceOrganization.classList.add("organization");

    // Heading -> Link
    let experienceOrganizationLink = document.createElement("a");
    experienceOrganizationLink.setAttribute("href", itemData.link);
    
    experienceOrganizationLink.innerHTML = itemData.organization;
    experienceOrganization.appendChild(experienceOrganizationLink);
    experienceHeading.appendChild(experienceOrganization);

    // Heading -> Role
    let experienceRole = document.createElement("span");
    experienceRole.classList.add("role");

    let experienceSeparator = document.createElement("span");
    experienceSeparator.classList.add("separator");
    experienceSeparator.innerHTML = " · ";

    let experienceDuration = document.createElement("span");
    experienceDuration.classList.add("duration");
    experienceDuration.innerHTML = itemData.duration;

    experienceRole.innerText = itemData.role;
    experienceRole.appendChild(experienceSeparator);
    experienceRole.appendChild(experienceDuration);

    experienceHeading.appendChild(experienceRole);
    
    experienceElement.appendChild(experienceHeading);

    // Description
    let experienceDescription = document.createElement("article");
    experienceDescription.classList.add("description");
    
    let experienceDescriptionList = document.createElement("ul");

    let experienceDescriptionListItems = itemData.description.map(textItem => {
      let bulletPoint = document.createElement("li");
      bulletPoint.innerHTML = textItem;
      return bulletPoint;
    });
    experienceDescriptionListItems.forEach(item => {
      experienceDescriptionList.appendChild(item);
    })
    experienceDescription.appendChild(experienceDescriptionList);
    experienceElement.appendChild(experienceDescription);

    return experienceElement;
}

// Uses a list of experiences to render the experience section
const renderExperience = (experienceList) => {
    const experienceSection = document.getElementById("experience");

    experienceList.forEach((item) => {
        experienceSection.appendChild(generateExperienceItem(item));
    });
}

const generateTalkItem = itemData => {
  const researchItem = document.createElement("li");
  const titleItem = document.createElement("strong");

  const titleLink = document.createElement("a");
  titleLink.setAttribute("href", itemData.link); 
  titleLink.innerText = itemData.title;
  titleItem.appendChild(titleLink);

  researchItem.appendChild(titleItem);

  const otherText = document.createElement("text");
  otherText.textContent = ", " + itemData.venue + ", " + itemData.date;
  researchItem.appendChild(otherText);

  return researchItem;
}

const generatePublicationItem = itemData => {
  const researchItem = document.createElement("li");
  const titleItem = document.createElement("strong");

  const titleLink = document.createElement("a");
  titleLink.setAttribute("href", itemData.link); 
  titleLink.innerText = itemData.title;
  titleLink.classList.add("paper-title");
  titleItem.appendChild(titleLink);

  researchItem.appendChild(titleItem);

  const authors = document.createElement("text");
  // To allow custom formatting in the YAML
  authors.innerHTML = "; " + itemData.authors;
  authors.classList.add("paper-authors");
  researchItem.appendChild(authors);

  const otherText = document.createElement("text");
  otherText.textContent = "; " + itemData.venue + ", " + itemData.date;
  researchItem.appendChild(otherText);

  return researchItem;
};

// Uses a list of research output to render the research section
const renderResearch = (researchOutput) => {
    const talksSection = document.querySelector("#research .talks ol");
    const talksList = researchOutput.talks;

    talksList.forEach((item) => {
        talksSection.appendChild(generateTalkItem(item));
    });

    const publicationsSection = document.querySelector("#research .publications ol");
    const publicationsList = researchOutput.publications;

    publicationsList.forEach((item) => {
        publicationsSection.appendChild(generatePublicationItem(item));
    });
}