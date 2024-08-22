import React from 'react';
import './personal.css';
import PersonalInterests from '../PersonalInterests/PersonalInterests';

export default function Personal() {
    return <section id="music" className="main special">
        <header className="major">
            <h2>Personal</h2>
        </header>
        <PersonalInterests/>
    </section>
}