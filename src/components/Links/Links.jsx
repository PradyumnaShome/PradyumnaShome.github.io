import React from 'react';
import linksList from './linksList.yaml';

export default function Links() {
    return <section className="links">
                <h3 className="subheading">Links</h3>
                <ol>
                {
                    linksList.links.map((item, index) => {
                        return <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrre">{item.text}</a></li>
                    })
                }
                </ol>
    </section>
}