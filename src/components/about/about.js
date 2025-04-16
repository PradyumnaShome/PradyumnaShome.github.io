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
                        I'm a Researcher at <a href="https://cmu.edu">Carnegie Mellon University</a> within the <a href="https://cylab.cmu.edu">CyLab Security and Privacy Institute</a> and <a href="https://hcii.cmu.edu">Human-Computer Interaction Institute</a>. I hold an MS in Computer Science from the <a href="https://gatech.edu">Georgia Institute of Technology</a>, where my work explored microarchitectural side-channel attacks and usable security.
                        I'm passionate about building privacy-preserving systems that are accessible to both developers and end-users, leveraging applied cryptography and confidential computing. Recently, I’ve been investigating privacy challenges in generative AI chatbots.
                    </p> 
                    <p> 
                        I founded the <a href="https://securityseminar.cc.gatech.edu">Georgia Institute of Technology Security Seminar</a>, a vibrant forum where students and faculty engage with cutting-edge security and privacy research presented at leading academic conferences. 
                    </p>
                    <p> 
                        Prior to my MS, I was a Software Engineer on Messenger Growth at <a href="https://meta.com">Meta</a> in the San Francisco Bay Area.
                        I earned a BS in <a href="https://cs.illinois.edu">Computer Science</a> from the <a href="https://illinois.edu">University of Illinois Urbana-Champaign</a>, advised by <a href="http://cwfletcher.net">Chris Fletcher</a>.
                    </p>
                    <h3 className="subheading">Meeting me</h3>
                    <p>
                        I'd love to meet you! If you want to set up a time to chat, I only ask that you leave a short note about yourself and why you're interesting in getting in touch. I recommend starting with email or <s>Twitter</s> X.
                    </p>
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
