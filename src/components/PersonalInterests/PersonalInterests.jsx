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
    if (!personalInterestsList.categories || Object.keys(personalInterestsList.categories).length === 0) {
        return null;
    }

    return <section className="PersonalInterests">
        <h3 className="subheading">Personal Interests</h3>
        <div className="personal-interests-categories">
            {Object.entries(personalInterestsList.categories).map(([category, interests], categoryIndex) => (
                <div key={categoryIndex} className="interest-category">
                    <h4 className="category-title">{category}</h4>
                    <div className="category-interests">
                        {interests.map((interest, index) => {
                            const content = interest.trim();
                            return <div key={index} className="personal-interest-item" dangerouslySetInnerHTML={{ __html: renderMarkdown(remarkProcessor, content) }} />
                        })}
                    </div>
                </div>
            ))}
        </div>
    </section>
}