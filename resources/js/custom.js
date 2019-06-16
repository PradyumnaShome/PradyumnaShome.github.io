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
  }
}
