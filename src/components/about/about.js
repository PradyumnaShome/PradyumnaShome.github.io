import React from 'react';
import { Link } from 'gatsby';

import './about.css';


export default function About() {
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
                        I am a senior majoring in <a href="https://cs.illinois.edu">Computer Science</a> at the <a href="https://illinois.edu">University of Illinois at Urbana-Champaign</a>, advised by <a href="http://cwfletcher.net">Chris Fletcher</a>. On campus, I've been involved in research, teaching, and the student community. As a member of <a href="https://spri.engr.illinois.edu">Security and Privacy Research at Illinois</a>, I work in the domain of hardware and systems security, where I study microarchitectural side-channel attacks. I am also interested in privacy-preserving computation, usable security, Internet security and privacy, and distributed systems. I am the lead course assistant for <a href="http://cs241.cs.illinois.edu">Illinois CS 241: System Programming</a>. In the past, I've helped organize <a href="https://hackillinois.org">HackIllinois</a> and the <a href="https://reflectionsprojections.org">Reflections | Projections technology conference</a>. I've had industry experience through software engineering internships at <a href="https://facebook.com">Facebook (*)</a>, <a href="https://salesforce.com">Salesforce</a>, and <a href="https://virtusa.com">Virtusa</a>. </p>
                    <h3 className="subheading">Meeting me / getting in touch</h3> <p>
                        If you'd like to get to know me personally or meet me (e.g. just to chat, or for a meal), I welcome such opportunities; click the link below. Please be sure to leave a short note about yourself and why you'd like to meet me. Short of that, feel free to add me on Facebook (again, with a note, please), or email me. I love meeting new people, and find cultivating good relationships with people to be a source of strength. </p>
                    <section className="button-container">
                        <button onClick={onResumeButtonClick}>Meet Pradyumna</button>
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
                        tech news,
                        venture capitalism
                    </p>
                    <h3 className="subheading">Hiring me</h3>
                    <p>
                        I'm looking for opportunities in the security, privacy, and systems space. Please reach out via email if you're offering the following opportunities!
                        <ul>
                            <li>Graduate Research Assistant (Ph.D.) - starting Fall 2021</li>
                            <li>Research/Software Engineering Intern - starting Summer 2021</li>
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