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
                    <h2>About</h2>
                </header>
                <section>
                    <p>
                        I'm Co-Founder and Founding Engineer at <a href="https://playfuldesign.app">Playful</a>, teaching AI to co-design with people. I like building socio-technical systems that marry deep CS problems with clear user wins. Lately that's consumer AI for design, with roots in confidential computing, microarchitectural side-channel attacks, and human-AI collaboration. I enjoy making hard tech feel friendly—privacy-preserving crypto for Web3, simple interfaces for AI agents—and explaining it in plain English to whoever's in the room.
                    </p>
                    <div className="info-cards">
                        <div className="info-card">
                            <img src="/images/computer-security-and-privacy-card-icon.png" alt="Security" className="info-icon" />
                            <h3 className="info-title">Computer Security & Privacy</h3>
                            <ul className="project-list">
                                <li>Microarchitectural Side-Channel Attacks</li>
                                <li>Confidential Computing for Web3</li>
                                <li>Security and Privacy of Generative AI Chatbots</li>
                            </ul>
                        </div>
                        <div className="info-card">
                            <img src="/images/ai-card-icon.png" alt="AI" className="info-icon" />
                            <h3 className="info-title">Artificial Intelligence</h3>
                            <ul className="project-list">
                                <li>Why Johnny Can't Use Agents</li>
                                <li>Consumer AI for Design</li>
                            </ul>
                        </div>
                        <div className="info-card">
                            <img src="/images/software-engineering-card-logo.png" alt="Software Engineering" className="info-icon" />
                            <h3 className="info-title">Software Engineering</h3>
                            <ul className="project-list">
                                <li>Messenger Growth</li>
                                <li>Meta Privacy Control Infrastructure</li>
                                <li>Test Plan Generation Automation</li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section className="button-container">
                    <button onClick={onResumeButtonClick}>View Résumé</button>
                    <button onClick={onCvButtonClick}>View Curriculum Vitae</button>
                </section>
                <section className="resume-container">
                    <object data="documents/Pradyumna_Shome_Resume.pdf"
                        type="application/pdf">
                            Your browser does not support PDFs. You can <a href="documents/Pradyumna_Shome_Resume.pdf">download it here</a>.
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
                            Your browser does not support PDFs. You can <a href="documents/Pradyumna_Shome_Curriculum_Vitae.pdf">download it here</a>.
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
