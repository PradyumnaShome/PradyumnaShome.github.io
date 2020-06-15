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
