import React from "react";
import researchData from "./research.yaml";
import markdownIt from "markdown-it";
import htmlToReact from "html-to-react";
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
    const authors = props.authors;
    const MY_FULL_NAME = "Pradyumna Shome";
    let authorList = [];

    const md = markdownIt({
        html: true,
        linkify: false
    });
    const htmlToReactParser = new htmlToReact.Parser();

    authors.forEach((author, idx) => {
        let prefix = "";
        if (idx > 0 && idx != authors.length - 1) {
            prefix = ", ";
        } else if (idx == authors.length - 1) {
            prefix = ", and ";
        }

        authorList.push(prefix);
        const renderedAuthor = htmlToReactParser.parse(md.render(author));
        if (author.startsWith(MY_FULL_NAME)) {
            authorList.push(<span class="author-highlight">{renderedAuthor}</span>);
        } else {
            authorList.push(<span>{renderedAuthor}</span>);
        }
    });
    return authorList;
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