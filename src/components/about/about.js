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
                        I am a senior majoring in <a href="https://cs.illinois.edu">Computer Science</a> at the <a href="https://illinois.edu">University of Illinois at Urbana-Champaign</a>, advised by <a href="http://cwfletcher.net">Chris Fletcher</a>.
                        On campus, I've been involved in research, teaching, and the student community.
                        As a member of <a href="https://spri.engr.illinois.edu">Security and Privacy Research at Illinois</a>, I research microarchitectural side-channel attacks, in the domain of software and hardware systems security.
                        I am also interested in applied cryptography, Web, and usable security.
                        I am the Lead Course Assistant for <a href="http://cs241.cs.illinois.edu">Illinois CS 241: System Programming</a>.
                        In the past, I've helped organize <a href="https://hackillinois.org">HackIllinois</a> and the <a href="https://reflectionsprojections.org">Reflections | Projections technology conference</a>.
                        I've had industry experience through software engineering internships at <a href="https://salesforce.com">Salesforce</a> and <a href="https://virtusa.com">Virtusa</a>.
                        Most recently, I was a Software Engineering Intern in the Privacy and Data Use organization at <a href="https://facebook.com">Facebook</a>, working on Privacy Control Infrastructure.
                    </p>
                    <h3 className="subheading">Meeting me / getting in touch</h3> <p>
                        If you'd like to get to know me personally or meet me (e.g. just to chat, or for a meal), I welcome such opportunities. Either click the link below, email me, use the contact form, or connect with me on social media. Please be sure to leave a short note about yourself and why you'd like to meet me. I love meeting new people, and find cultivating good relationships with people to be a source of strength. </p>
                    <section className="button-container">
                        <button onClick={() => { internalRedirectTo("/meet") }}>Schedule A Meeting</button>
                    </section>
                    <h3 className="subheading">Non-academic interests / Things I enjoy talking about</h3>
                    <p>
                        Board game strategies,
                        bubble tea places around the world,
                        education,
                        electronic music,
                        investing,
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
                        venture capitalism
                    </p>
                    <h3 className="subheading">Hiring me</h3>
                    <p>
                        I'm looking for opportunities in the security, privacy, and systems space. Please reach out via email if you're offering the following opportunities!
                        <ul>
                            <li>Graduate Research Assistant (Ph.D.) - starting Fall 2021</li>
                            <li>Research Intern - starting Summer 2021</li>
                        </ul>
                    </p>
                </section>
                <section className="button-container">
                    <button onClick={onResumeButtonClick}>View Résumé</button>
                    <button onClick={onCvButtonClick}>View Curriculum Vitae</button>
                </section>
                <section className="resume-container">
                    <object data="resources/documents/Pradyumna_Shome_Resume.pdf"
                        type="application/pdf">
                    </object>
                    <section className="button-container">
                        <a className="button" onClick={onResumeButtonClick}>Hide</a>
                        <a className="button"
                            href="resources/documents/Pradyumna_Shome_Resume.pdf">Download</a>
                    </section>
                </section>
                <section className="cv-container">
                    <object
                        data="resources/documents/Pradyumna_Shome_Curriculum_Vitae.pdf"
                        type="application/pdf">
                    </object>
                    <section className="button-container">
                        <a className="button" onClick={onCvButtonClick}>Hide</a>
                        <a className="button"
                            href="resources/documents/Pradyumna_Shome_Curriculum_Vitae.pdf">Download</a>
                    </section>
                </section>
            </div>
        </div>
    </section>
}