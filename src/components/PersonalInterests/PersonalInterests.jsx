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
    
    return <section className="PersonalInterests">
        <h3 className="subheading">Personal interests</h3>
        <div id="personal-interests-container">
            {personalInterestsList.list.map((interest, index) => {
                const content = interest.trim();
                return <div key={index}
                /* linear-gradient(19deg, rgba(77, 216, 215, 0.54) 0%, rgba(99, 26, 232, 0.706) 100%); */
                /*linear-gradient(121deg, rgba(63, 223, 177, 0.498) 0%, rgba(19, 202, 33, 0.443) 100%);*/
                style={{background: `linear-gradient(226deg, rgba(76, 69, 178, 0.345) 0%, rgba(198, 27, 38, 0.54) 100%)`}} className="personal-interest-item" dangerouslySetInnerHTML={{ __html: renderMarkdown(remarkProcessor, content) }} />
            })}
        </div>
    </section>
}