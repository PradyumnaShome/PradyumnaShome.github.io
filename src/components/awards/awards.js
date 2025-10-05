import React from "react";
import awards from "./awards.yaml";
import './awards.css';

export function AwardCategory({title, awardsList}) {
    if (!awardsList || awardsList.length === 0) {
        return null;
    }

    return <div className="award-category">
        <h3 className="subheading">{title}</h3>
        <ol>
            {
                awardsList.map((award, index) => {
                    return <li key={index}>
                        {award.name} ({award.year})
                    </li>
                })
            }
        </ol>
    </div>
}

export default function Awards() {
    return <section id="awards" className="main special">
        <header className="major">
            <h2>Awards</h2>
        </header>
        <AwardCategory title="Academic" awardsList={awards.academic} />
        <AwardCategory title="Community" awardsList={awards.community} />
    </section>
}