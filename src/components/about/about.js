import React, { useRef, useState } from 'react';
import './about.css';
import ResponsiveImage from '../ResponsiveImage';
import TopicIcon from '../TopicIcon';


export default function About() {
    const [resumeOpen, setResumeOpen] = useState(false);
    const [cvOpen, setCvOpen] = useState(false);
    const resumeToggle = useRef(null);
    const cvToggle = useRef(null);

    return <section id="about" className="main special">
        <div className="spotlight">
            <div className="content">
                <header className="major">
                    <h2>About</h2>
                </header>
                <section>
                    <p>
                        I’m Co-Founder and Founding Engineer at <a href="https://playfuldesign.app" className="playful-link-about" aria-label="Playful website"><ResponsiveImage imageKey="/images/logo_simple.png" alt="Playful" className="playful-logo-about" sizes="96px" /></a>, building AI agents for graphic design. I spend my time on how the agents behave, how people interact with them, and how to make the iOS app fast and responsive.
                    </p>
                    <p>
                        My background spans computer security, privacy, and human-AI collaboration. I’m interested in the gap between a technically capable system and one that people can understand, trust, and use.
                    </p>
                    <p>
                        Outside work, I’m learning French and German, exploring cafés, and daydreaming about Europe.
                    </p>
                    <div className="info-cards">
                        <div className="info-card">
                            <TopicIcon name="shield-check" />
                            <h3 className="info-title">Computer Security & Privacy</h3>
                            <ul className="project-list">
                                <li>Microarchitectural Side-Channel Attacks</li>
                                <li>Confidential Computing for Web3</li>
                                <li>Security and Privacy of Generative AI Chatbots</li>
                            </ul>
                        </div>
                        <div className="info-card">
                            <TopicIcon name="brain-circuit" />
                            <h3 className="info-title">Artificial Intelligence</h3>
                            <ul className="project-list">
                                <li>Why Johnny Can't Use Agents</li>
                                <li>Consumer AI for Design</li>
                            </ul>
                        </div>
                        <div className="info-card">
                            <TopicIcon name="code-xml" />
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
                    <button ref={resumeToggle} aria-expanded={resumeOpen} aria-controls={resumeOpen ? "resume-panel" : undefined} onClick={() => setResumeOpen(!resumeOpen)}>View Résumé</button>
                    <button ref={cvToggle} aria-expanded={cvOpen} aria-controls={cvOpen ? "cv-panel" : undefined} onClick={() => setCvOpen(!cvOpen)}>View Curriculum Vitae</button>
                </section>
                {resumeOpen && <section id="resume-panel" className="resume-container">
                    <object data="documents/Pradyumna_Shome_Resume.pdf"
                        type="application/pdf">
                            Your browser does not support PDFs. You can <a href="documents/Pradyumna_Shome_Resume.pdf">download it here</a>.
                    </object>
                    <section className="button-container">
                        <button type="button" className="button" onClick={() => { setResumeOpen(false); resumeToggle.current?.focus(); }}>Hide</button>
                        <a className="button"
                            href="documents/Pradyumna_Shome_Resume.pdf">Download</a>
                    </section>
                </section>}
                {cvOpen && <section id="cv-panel" className="cv-container">
                    <object
                        data="documents/Pradyumna_Shome_Curriculum_Vitae.pdf"
                        type="application/pdf">
                            Your browser does not support PDFs. You can <a href="documents/Pradyumna_Shome_Curriculum_Vitae.pdf">download it here</a>.
                    </object>
                    <section className="button-container">
                        <button type="button" className="button" onClick={() => { setCvOpen(false); cvToggle.current?.focus(); }}>Hide</button>
                        <a className="button"
                            href="documents/Pradyumna_Shome_Curriculum_Vitae.pdf">Download</a>
                    </section>
                </section>}
            </div>
        </div>
    </section>
}
