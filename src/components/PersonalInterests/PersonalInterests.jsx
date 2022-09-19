import React from 'react';
import personalInterestsList from './personalInterestsList.yaml';

export default function PersonalInterests() {
    if (personalInterestsList.list.length === 0) {
        return null;    
    }
    return <section className="PersonalInterests">
        <h3 className="subheading">Personal interests</h3>
        <p>
            {personalInterestsList.list.join(", ")}
        </p>
    </section>
}