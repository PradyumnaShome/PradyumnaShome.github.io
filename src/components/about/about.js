import React from 'react';

import './about.css';


export default function About() {
    const onResumeButtonClick = () => {
        debugger;
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
                        I am a rising senior majoring in <a href="https://cs.illinois.edu">Computer Science</a> at the <a href="https://illinois.edu">University of Illinois at Urbana-Champaign</a>, with interests in security, systems, and CS education. On campus, I've been involved in research, teaching, and the student community. I currently work on security research at the <a href="http://cwfletcher.net">FPSG</a>, where I study microarchitectural side-channel attacks. I am a lead course assistant for <a href="http://cs241.cs.illinois.edu">Illinois CS 241: System Programming</a>. In the past, I've helped organize <a href="https://hackillinois.org">HackIllinois</a> and the <a href="https://reflectionsprojections.org">Reflections | Projections technology conference</a>. I've had industry experience through software engineering internships at <a href="https://facebook.com">Facebook (*)</a>, <a href="https://salesforce.com">Salesforce</a>, and <a href="https://virtusa.com">Virtusa</a>. </p>
                    <p>
                        I'm open to hearing about research projects and internships relating to computer science, especially relating to security and distributed systems. If you are interested working with me, or discussing professional opportunities, feel free to email or use the contact form at the end of this page. </p>
                    <h3 className="subheading">Meeting me / getting in touch</h3> <p>
                        If you'd like to get to know me
          personally or meet me (e.g. just to chat, or for a meal), I welcome such opportunities; you can schedule time with me <a target="_blank" href="https://pradyumna-shome.youcanbook.me">here</a>. Please be sure to leave a short note about yourself and why you'd like to meet me. Short of that, feel free to add me on Facebook (again, with a note, please), or email me. I love meeting new people, and find cultivating good relationships with people to be a source of strength. </p>
                    <h3 className="subheading">Things I enjoy talking about</h3>
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
                        tech news,
                        VC,
                        and of course, anything and everything computer science.
                            </p>
                </section>
                <section className="button-container">
                    <a className="button button-fancy" onClick={onResumeButtonClick}>View Résumé</a>
                    <a className="button button-fancy" onClick={onCvButtonClick}>View Curriculum Vitae</a>
                </section>
                <section className="resume-container">
                    <object data="resources/documents/Pradyumna_Shome_Resume.pdf"
                        type="application/pdf">
                    </object>
                    <section className="button-container">
                        <a className="button button-fancy" onClick={onResumeButtonClick}>Hide</a>
                        <a className="button button-fancy"
                            href="resources/documents/Pradyumna_Shome_Resume.pdf">Download</a>
                    </section>
                </section>
                <section className="cv-container">
                    <object
                        data="resources/documents/Pradyumna_Shome_Curriculum_Vitae.pdf"
                        type="application/pdf">
                    </object>
                    <section className="button-container">
                        <a className="button button-fancy" onClick={onCvButtonClick}>Hide</a>
                        <a className="button button-fancy"
                            href="resources/documents/Pradyumna_Shome_Curriculum_Vitae.pdf">Download</a>
                    </section>
                </section>
            </div>
        </div>
    </section>
}