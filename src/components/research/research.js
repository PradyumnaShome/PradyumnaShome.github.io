import React from "react";
import researchData from "./research.yaml";
import './research.css';

export function Talks() {
    if (researchData.talks.length === 0) {
        return null;
    }

    return <section>
        <h3 className="subheading">Talks</h3>
        <ol>
            {researchData.talks.map((item, idx) => {
                return <li key={idx}>
                    <p>
                        <strong className="paper-title">
                            <a href={item.link}>
                                {item.title}</a>
                        </strong>, {item.venue}, {item.date}
                    </p>
                </li>
            })}
        </ol>
    </section>
}

export function Publications() {
    if (researchData.publications.length == 0) {
        return null;
    }

    return <section>
        <h3 className="subheading">Publications</h3>
        <ol>
            {researchData.publications.map((item, idx) => {
                return <li key={idx}>
                    <p>
                        <strong className="paper-title">
                            <a href={item.link}>
                                {item.title}</a>
                        </strong>; item.authors; {item.venue}, {item.date}
                    </p>
                </li>
            })}
        </ol>
    </section>
}

export default function Research() {
    return <section id="research" className="main special">
        <header className="major">
            <h2>Research</h2>
        </header>
        <Talks />
        <Publications />
    </section>
}