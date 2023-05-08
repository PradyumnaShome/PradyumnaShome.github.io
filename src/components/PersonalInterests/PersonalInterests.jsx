import React from 'react';
import personalInterestsList from './personalInterestsList.yaml';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import "./PersonalInterests.css";

function renderMarkdown(remarkProcessor, markdown) {
    return remark().use(remarkHtml).processSync(markdown).toString();
}

export default function PersonalInterests() {
    const remarkProcessor = remark().use(remarkHtml);
    if (personalInterestsList.list.length === 0) {
        return null;    
    }
    const zerothInterest = renderMarkdown(remarkProcessor, personalInterestsList.list[0]).trim();
    const otherInterests = personalInterestsList.list.slice(1).map((interest, index) => {
        const content = renderMarkdown(remarkProcessor, interest).trim();
        return <span className="personal-interest"
                     idx={index} 
                     dangerouslySetInnerHTML={{__html: ", " + content}}
        />;
    });
    return <section className="PersonalInterests">
        <h3 className="subheading">Personal interests</h3>
        <p>
            <span className="personal-interest" dangerouslySetInnerHTML={{__html: zerothInterest}}/>
            {otherInterests}
        </p>
    </section>
}