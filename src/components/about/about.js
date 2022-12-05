import React from 'react';
import PersonalInterests from '../PersonalInterests/PersonalInterests';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';
import Links from'../Links/Links';

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
                    <h3 className="subheading">Biography</h3>
                    <CollapsibleSection heading="Full" heading-size="medium" visible={true}>
                    <p>
                        I'm a PhD student in Computer Science at the <a href="https://gatech.edu">Georgia Institute of Technology</a> advised by <a href="https://faculty.cc.gatech.edu/~genkin/">Daniel Genkin</a>. My research interests lie in  <a href="https://scp.cc.gatech.edu">computer security and privacy</a>, focusing on hardware security and microarchitectural side-channel attacks. I founded and organize the <a href="https://securityseminar.cc.gatech.edu">Georgia Institute of Technology Security Seminar</a>, a venue for students and faculty to present, learn about, and discuss cutting-edge security and privacy research papers published at leading academic conferences.
                    </p>
                    <p>
                        Before my PhD, I was a Software Engineer on Messenger Growth at <a href="https://meta.com">Meta</a> and lived in the San Francisco Bay Area.
                        I earned a Bachelor of Science in <a href="https://cs.illinois.edu">Computer Science</a> from the <a href="https://illinois.edu">University of Illinois Urbana-Champaign</a> where I was advised by the fantastic <a href="http://cwfletcher.net">Chris Fletcher</a>.
                    </p>
                    </CollapsibleSection>

                    <CollapsibleSection heading="Short" heading-size="medium" visible={false}>
                        <p>
                        Pradyumna Shome is a PhD student in Computer Science at the Georgia Institute of Technology, researching hardware security and microarchitectural side-channel attacks. His research has been published at ISCA and has won an Honorable Mention at the Intel Hardware Security Academic Award. Prior to his PhD, he graduated with a BS in Computer Science from the University of Illinois Urbana-Champaign advised by Christopher W. Fletcher, and then worked as a Software Engineer at Meta. He has been on the Shadow Program Committee for the IEEE Symposium on Security &amp; Privacy, as the sole undergrad.
                        </p>
                        </CollapsibleSection>
                    <h3 className="subheading">Meeting me</h3>
                    <p>
                        I'd love to meet you! If you want to set up a time to chat, I only ask that you leave a short note about yourself and why you're interesting in getting in touch. I recommend starting with email or Twitter.
                    </p>
                    <PersonalInterests/>
                    <Links/>
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