import React from "react";
import awards from "./awards.yaml";
import './awards.css';

export function AwardList() {
    if (awards.length === 0) {
        return null;
    }

    return <section>
            <ol>
                {
                    awards.map((award, index) => {            
                                return <li key={index}>
                                    {award.name} ({award.year})
                                </li>                 
                        }
                    )
                }
            </ol>
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