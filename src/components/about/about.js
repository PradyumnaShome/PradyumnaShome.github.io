import React from 'react';
import PersonalInterests from '../PersonalInterests/PersonalInterests';

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
                    <p>
                        I'm a PhD student in Computer Science at the <a href="https://gatech.edu">Georgia Institute of Technology</a>. My research interests lie broadly in  <a href="https://scp.cc.gatech.edu">computer security and privacy</a>. I founded and organize the <a href="https://securityseminar.cc.gatech.edu">Georgia Institute of Technology Security Seminar</a>, a venue for students and faculty to present, learn about, and discuss cutting-edge security and privacy research papers published at leading academic conferences. Previously, I worked on hardware security and microarchitectural side-channel attacks.
                    </p>
                    <p>
                        Before my PhD, I was a Software Engineer on Messenger Growth at <a href="https://meta.com">Meta</a> and lived in the San Francisco Bay Area.
                        I earned a Bachelor of Science in <a href="https://cs.illinois.edu">Computer Science</a> from the <a href="https://illinois.edu">University of Illinois Urbana-Champaign</a> where I was advised by the fantastic <a href="http://cwfletcher.net">Chris Fletcher</a>.
                    </p>
                    <h3 className="subheading">Meeting me</h3>
                    <p>
                        I'd love to meet you! If you want to set up a time to chat, I only ask that you leave a short note about yourself and why you're interesting in getting in touch. I recommend starting with email or Twitter.
                    </p>
                    <PersonalInterests/>
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
