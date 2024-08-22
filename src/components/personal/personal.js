import React from 'react';
import './personal.css';
import PersonalInterests from '../PersonalInterests/PersonalInterests';

export default function Personal() {
    return <section id="personal" className="main special">
        <header className="major">
            <h2>Personal</h2>
            <h3>Writings</h3>
            <ul>
                <li>
                    <a href="https://collective.flashbots.net/t/closing-the-intel-tdx-page-fault-side-channel-or-the-case-for-tdexit-notify/3775">
                        Closing the Intel TDX Page Fault Side Channel, or, The Case for TDExit-Notify
                    </a>
                </li>
                <li>
                    <a href="https://collective.flashbots.net/t/intel-tdx-security-and-side-channels/3648">
                        Intel TDX Security and Side Channels
                    </a>
                </li>
                <li>
                    <a href="https://collective.flashbots.net/t/crypto-crossroads-reflections-from-an-ic3-summer-camp-rookie/3589">
                        Crypto Crossroads: Reflections from an IC3 Summer Camp Rookie
                    </a>
                </li>
                <li>
                    <a href="https://medium.com/@pradyumnashome/undergraduate-research-in-computer-science-lessons-growth-advice-804bdabb4a1c">
                        Undergraduate Research in Computer Science: Lessons, Growth, Advice
                    </a>
                </li>
                <li>
                    <a href="https://medium.com/fair-bytes/adversarial-machine-learning-an-overview-1b0a078f5ee0">Adversarial Machine Learning: An Overview</a>
                </li>
            </ul>
        </header>
        <PersonalInterests/>
    </section>
}