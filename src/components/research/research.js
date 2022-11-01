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
                        <strong className="paper-title">
                            <a href={item.link}>
                                {item.title}</a>
                        </strong>,
                        <ul className="venue-list">
                        {
                            item.venues.map((venue, idx) => {
                                return <li key={idx}>
                                    {venue.name}, {venue.date}
                                </li>
                            })
                        }
                        </ul>
                </li>
            })}
        </ol>
    </section>
}

export function AuthorList(props) {
    const allCollaborators = researchData.collaborators;
    const authors = props.authors;
    const MY_FULL_NAME = "Pradyumna Shome";

    if (authors.length === 1) {
        const author = authors[0];
        const authorLink = allCollaborators[author]?.url ?? `https://google.com/search?q=${author}`;
        const authorLinkElement = <a href={authorLink} target="_blank" rel="noreferrer">{author}</a>;
        return <span key={author} className="author-highlight">{authorLinkElement}</span>
    }
    return authors.map((author, idx) => {
        let getPrefix = (idx, list) => {
            if (idx > 0 && idx !== list.length - 1) {
                return ", ";
            } else if (idx === list.length - 1) {
                return ", and ";
            }
        }

        const authorLink = allCollaborators[author]?.url ?? `https://google.com/search?q=${author}`;
        const authorLinkElement = <a href={authorLink} target="_blank" rel="noreferrer">{author}</a>;
        let authorSpan = <span key={author}>{authorLinkElement}</span>;
        if (author.startsWith(MY_FULL_NAME)) {
            authorSpan = <span key={author} className="author-highlight">{authorLinkElement}</span>;
        }

        const prefix = getPrefix(idx, authors);
        return [prefix, authorSpan];
    });
}

export function Publications() {
    if (researchData.peerReviewedPublications.length === 0) {
        return null;
    }

    return <section>
        <h3 className="subheading">Publications</h3>
        <h4 className="subheading">Peer-Reviewed</h4>
        <ol>
            {researchData.peerReviewedPublications.map((item, idx) => {
                return <li key={idx}>
                    <strong className="paper-title">
                        <a href={"documents/papers/" + item.link} target="_blank" rel="noreferrer">
                            {item.title}</a>
                    </strong>
                    <p>
                        <AuthorList authors={item.authors} />
                        . <span className={"publication-" + item.type}>{item.venue}</span>. {item.date}.
                    </p>
                    <AwardList item={item}/>
                </li>
            })}
        </ol>
        <h4 className="subheading">Other</h4>
        <ol>
            {researchData.otherPublications.map((item, idx) => {
                return <li key={idx}>
                    <strong className="paper-title">
                        <a href={"documents/papers/" + item.link} target="_blank" rel="noreferrer">
                            {item.title}</a>
                    </strong>
                    <p>
                        <AuthorList authors={item.authors} />
                    </p>
                    <AwardList item={item}/>
                </li>
            })}
        </ol> 
    </section>
}

export function AwardList(props) {
    if (!props || !props.item || !props.item.awards || props.item.awards.length === 0) {
        return null;
    }
    const awardList = props.item.awards;

    return <ul className="award-list">
        {
        awardList.map((award, _) => {
            return <li key={award} className="award">🏆 {award}</li>; 
        })
        }
    </ul>
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