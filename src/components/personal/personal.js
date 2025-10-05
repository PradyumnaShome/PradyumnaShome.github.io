import React from 'react';
import './personal.css';
import PersonalInterests from '../PersonalInterests/PersonalInterests';

export default function Personal() {
    return <section id="personal" className="main special">
        <header className="major">
            <h2>Writings & Interests</h2>
        </header>
        <h3 className="subheading">Technical Writings</h3>
        <div className="writings-grid">
            <a href="https://cmu-spuds.github.io/why-johnny-can-t-use-agents/" className="writing-card">
                <div className="writing-icon">🤖</div>
                <div className="writing-title">Why Johnny Can't Use Agents</div>
                <div className="writing-meta">SPUD Lab at CMU HCII and CyLab</div>
            </a>
            <a href="https://pradyumnashome.medium.com/the-emotional-labor-in-exploratory-work-c2bf2f38a955" className="writing-card">
                <div className="writing-icon">💭</div>
                <div className="writing-title">The Emotional Labor in Exploratory Work</div>
                <div className="writing-meta">Medium</div>
            </a>
            <a href="https://collective.flashbots.net/t/closing-the-intel-tdx-page-fault-side-channel-or-the-case-for-tdexit-notify/3775" className="writing-card">
                <div className="writing-icon">📝</div>
                <div className="writing-title">Closing the Intel TDX Page Fault Side Channel</div>
                <div className="writing-meta">Flashbots Collective</div>
            </a>
            <a href="https://collective.flashbots.net/t/intel-tdx-security-and-side-channels/3648" className="writing-card">
                <div className="writing-icon">🔒</div>
                <div className="writing-title">Intel TDX Security and Side Channels</div>
                <div className="writing-meta">Flashbots Collective</div>
            </a>
            <a href="https://collective.flashbots.net/t/crypto-crossroads-reflections-from-an-ic3-summer-camp-rookie/3589" className="writing-card">
                <div className="writing-icon">💭</div>
                <div className="writing-title">Crypto Crossroads: IC3 Summer Camp Reflections</div>
                <div className="writing-meta">Flashbots Collective</div>
            </a>
            <a href="https://medium.com/@pradyumnashome/undergraduate-research-in-computer-science-lessons-growth-advice-804bdabb4a1c" className="writing-card">
                <div className="writing-icon">🎓</div>
                <div className="writing-title">Undergraduate Research in Computer Science</div>
                <div className="writing-meta">Medium</div>
            </a>
            <a href="https://medium.com/fair-bytes/adversarial-machine-learning-an-overview-1b0a078f5ee0" className="writing-card">
                <div className="writing-icon">🤖</div>
                <div className="writing-title">Adversarial Machine Learning: An Overview</div>
                <div className="writing-meta">Medium</div>
            </a>
        </div>
        <PersonalInterests/>
    </section>
}