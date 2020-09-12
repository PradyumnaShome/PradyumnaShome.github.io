import React from "react";
import awards from "./awards.yaml";
import './awards.css';

export function AwardList() {
    if (awards.length === 0) {
        return null;
    }

    return <section>
        {
            Object.keys(awards).reverse().map(year => {
                return <section key={year}>
                    <h3 className="subheading" key={year}>{year}</h3>
                    <ol>
                        {
                            awards[year].map((award, index) => {
                                return <li key={index}>
                                    {award}
                                </li>
                            })
                        }
                    </ol>
                </section>
            })
        }
    </section>
}

export default function Awards() {
    return <section id="awards" className="main special">
        <header className="major">
            <h2>Awards and Honors</h2>
        </header>
        <AwardList />
    </section>
}