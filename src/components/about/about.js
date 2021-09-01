import React from 'react';

import './about.css';


export default function About() {
    const internalRedirectTo = (linkSuffix) => window.location.href = "/meet";
    const onResumeButtonClick = () => {
        const introSection = document.querySelector("section#about");
        const resumeContainer = document.querySelector(".resume-container");
        const resumeContainerIsVisible = resumeContainer.style.display === "block";
        if (resumeContainerIsVisible) {
            resumeContainer.style.display = "none";
            introSection.scrollIntoView();
        } else {
            resumeContainer.style.display = "block";
            resumeContainer.scrollIntoView();
        }
    };

    const onCvButtonClick = () => {
        const introSection = document.querySelector("section#about");
        const resumeContainer = document.querySelector(".cv-container");
        const resumeContainerIsVisible = resumeContainer.style.display === "block";
        if (resumeContainerIsVisible) {
            resumeContainer.style.display = "none";
            introSection.scrollIntoView();
        } else {
            resumeContainer.style.display = "block";
            resumeContainer.scrollIntoView();
        }
    };

    return <section id="about" className="main special">
        <div className="spotlight">
            <div className="content">
                <header className="major">
                    <h2>About Me</h2>
                </header>
                <section>
                    <h3 className="subheading">Bio</h3>
                    <p>
                        Hello! I'm an incoming Software Engineer at Facebook, based in the San Francisco Bay Area.
                        I grew up in Bangalore and moved to Champaign-Urbana in 2017 to pursue a Bachelor of Science in <a href="https://cs.illinois.edu">Computer Science</a> at the <a href="https://illinois.edu">University of Illinois Urbana-Champaign</a>, where I was fortunate to be advised by <a href="http://cwfletcher.net">Chris Fletcher</a>.
                        As a member of <a href="https://spri.engr.illinois.edu">Security and Privacy Research at Illinois</a>, I researched microarchitectural side-channel attacks, which resulted in a conference paper at <a href="https://www.iscaconf.org/isca2021/program/#v-a">ISCA</a>.
                        I was heavily involved as a Course Assistant for <a href="http://cs241.cs.illinois.edu">Illinois CS 241: System Programming</a> under <a href="https://cs.illinois.edu/about/people/faculty/angrave">Lawrence Angrave</a>, and helped organize <a href="https://hackillinois.org">HackIllinois</a> and the <a href="https://reflectionsprojections.org">Reflections | Projections technology conference</a>.
                        During breaks from school, I interned at <a href="https://about.facebook.com">Facebook</a> on Privacy Control Infrastructure, <a href="https://salesforce.com">Salesforce</a> on Records Experience, and <a href="https://virtusa.com">Virtusa</a> in the Media and Content Division.
                    </p>
                    <h3 className="subheading">Meeting me</h3>
                    <p>
                        I'd love to meet you! If you want to set up a time to chat, I only ask that you leave a short note about yourself and why you're interesting in getting in touch. I recommend starting with email or Twitter.
                    </p>
                    <h3 className="subheading">Personal interests</h3>
                    <p>
                        Board game strategies,
                        bubble tea places around the world,
                        education,
                        electronic music,
                        investing,
                        Marvel comics and the Marvel Cinematic Universe (MCU), 
                        mental health,
                        music production,
                        philosophy,
                        productivity tips,
                        psychology,
                        romantic relationships,
                        startups,
                        table tennis,
                        tennis,
                        technology,
                        venture capitalism,
                        Western art music
                    </p>
                </section>
                <section className="button-container">
                    <button onClick={onResumeButtonClick}>View Résumé</button>
                    <button onClick={onCvButtonClick}>View Curriculum Vitae</button>
                </section>
                <section className="resume-container">
                    <object data="documents/Pradyumna_Shome_Resume.pdf"
                        type="application/pdf">
                    </object>
                    <section className="button-container">
                        <a className="button" onClick={onResumeButtonClick}>Hide</a>
                        <a className="button"
                            href="documents/Pradyumna_Shome_Resume.pdf">Download</a>
                    </section>
                </section>
                <section className="cv-container">
                    <object
                        data="documents/Pradyumna_Shome_Curriculum_Vitae.pdf"
                        type="application/pdf">
                    </object>
                    <section className="button-container">
                        <a className="button" onClick={onCvButtonClick}>Hide</a>
                        <a className="button"
                            href="documents/Pradyumna_Shome_Curriculum_Vitae.pdf">Download</a>
                    </section>
                </section>
            </div>
        </div>
    </section>
}