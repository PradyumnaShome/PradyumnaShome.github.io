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
}

// Reads and parses experience list file
const getExperienceList = async () => {
    const response = await fetch("/resources/content/experience.yaml");
    const responseText = await response.text();
    return await jsyaml.load(responseText);
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