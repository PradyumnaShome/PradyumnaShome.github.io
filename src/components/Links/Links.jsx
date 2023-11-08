import React from 'react';
import linksList from './linksList.yaml';

import "./links.css"

// Interesting pieces of advice, bookmarks, and other things of note
export default function Links() {
    return <section id="links" className="main special">
        <div className="spotlight">
            <div className="content">
                <header className="major">
                    <h2>Links</h2>
                </header>
                <section>
                    {
                        linksList.map((item, index) => {
                            return <LinksCategory key={index} category={item} />;
                        })
                    }
                </section>
            </div>
        </div>
    </section>
}

export function LinksCategory(props) {
    const category = props["category"];
    const title = category.type;
    const links = category.links;

    return <section>
        <h3>{title}</h3>
        <ol>
            {
                links.map((item, index) => {
                    return <li key={index}>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">{item.text}</a>
                        <p>{item.description}</p>
                    </li>
                })
            }
        </ol>
    </section>
}