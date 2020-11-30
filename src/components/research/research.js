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
                        </strong>,
                        {
                            item.venues.map((venue, idx) => {
                                return <p>
                                    {venue.name}, {venue.date}
                                </p>
                            })
                        }
                    </p>
                </li>
            })}
        </ol>
    </section>
}

export function AuthorList(props) {
    const allCollaborators = researchData.collaborators;
    const authors = props.authors;
    const MY_FULL_NAME = "Pradyumna Shome";

    return authors.map((author, idx) => {
        let getPrefix = (idx, list) => {
            if (idx > 0 && idx !== list.length - 1) {
                return ", ";
            } else if (idx === list.length - 1) {
                return ", and ";
            }
        }

        const authorLink = allCollaborators[author]?.url ?? `https://google.com/search?q=${author}`;
        const authorLinkElement = <a href={authorLink} target="_blank" rel="noopener">{author}</a>;
        let authorSpan = <span>{authorLinkElement}</span>;
        if (author.startsWith(MY_FULL_NAME)) {
            authorSpan = <span class="author-highlight">{authorLinkElement}</span>;
        }

        const prefix = getPrefix(idx, authors);
        return [prefix, authorSpan];
    });
}

export function Publications() {
    if (researchData.publications.length === 0) {
        return null;
    }

    return <section>
        <h3 className="subheading">Publications</h3>
        <ol>
            {researchData.publications.map((item, idx) => {
                return <li key={idx}>
                    <strong className="paper-title">
                        <a href={item.link}>
                            {item.title}</a>
                    </strong>
                    <p>
                        <AuthorList authors={item.authors} />
                        . <span className={"publication-" + item.type}>{item.venue}</span>. {item.date}.
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