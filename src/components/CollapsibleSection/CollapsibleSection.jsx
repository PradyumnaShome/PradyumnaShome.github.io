import React, { useState } from 'react';
import './CollapsibleSection.css';

export default function CollapsibleSection(props) {
    const [isContentVisible, setContentVisible] = useState(props.visible);

    if(!'heading-size' in props || !'heading' in props || !'visible' in props){
        return null;
    }

    const headingSize = props['heading-size'];
    let renderedHeading = "";
    if (headingSize.toLowerCase() === "large") {
        renderedHeading = <h2>{props.heading}</h2>
    }
    if (headingSize.toLowerCase() === "medium") {
        renderedHeading = <h3>{props.heading}</h3>;
    } else if (headingSize.toLowerCase() === "small") {
        renderedHeading = <h4>{props.heading}</h4>;
    }

    function toggleIsContentVisible (event) {
        event.target.classList.toggle("visible");
        setContentVisible(!isContentVisible);
    }

    if (isContentVisible) {
        return <section className="CollapsibleSection">
        <span className="visible" onClick={(event) => toggleIsContentVisible(event)}>&#9654;</span>
        {renderedHeading}
        {
            props.children
        }
    </section>
    }

    return <section className="CollapsibleSection">
        <span onClick={(event) => toggleIsContentVisible(event)}>&#9654;</span>
        {renderedHeading}
    </section>
}

