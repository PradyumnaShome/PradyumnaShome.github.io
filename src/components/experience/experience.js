import React, { setState, Component } from "react";
import experienceData from "./experience.yaml";
import markdownIt from "markdown-it";
import htmlToReact from "html-to-react";

const ExperienceItemDescription = function (props) {
    const md = markdownIt({
        html: true,
        linkify: true
    });
    const htmlToReactParser = new htmlToReact.Parser();
    const description = props.data;
    if (!description) {
        return null;
    }
    return <article className="description">
        <strong id="icon" className="fa fa-play collapse-button collapse" onClick={(event) => handleCollapsing(event, props)} />
            Details
            <ul className="collapsible collapsed">
            {
                description.map((bulletPoint, bulletIndex) => {
                    if (Array.isArray(bulletPoint)) {
                        return <ul>
                            {
                                bulletPoint.map((subItem, subItemIndex) => {
                                    return <li key={subItemIndex}>
                                        {subItem}
                                    </li>
                                })
                            }
                        </ul>
                    }
                    debugger;
                    return <li key={bulletIndex}>
                        {htmlToReactParser.parse(md.render(bulletPoint))}
                    </li>;
                })
            }
        </ul>
    </article>
}

const ExperienceItem = function (props) {
    const item = props.data;
    const itemClassName = "experience-item experience-active experience-" + item.type;

    return <section className={itemClassName}>
        <img src={item.icon} alt="" />
        <header>
            <span className="organization">
                <a href={item.link}>{item.organization}</a>
            </span>
            <span className="role">
                {item.role}
                <span className="separator">·</span>
                <span className="duration">{item.duration}</span>
            </span>
        </header>
        <ExperienceItemDescription data={item.description} />
    </section>
}

const handleCollapsing = (event) => {
    const COLLAPSED_ELEMENT_CLASSNAME = "collapsed";

    // Make the description visible
    const elementDescription = event.currentTarget.nextElementSibling;
    elementDescription.classList.toggle(COLLAPSED_ELEMENT_CLASSNAME);

    // Toggle the appearance of the collapse button/arrow
    if (event.currentTarget.classList.contains("collapse")) {
        event.currentTarget.classList.remove("collapse");
        event.currentTarget.classList.add("expand");
    } else {
        event.currentTarget.classList.remove("expand");
        event.currentTarget.classList.add("collapse");
    }
}

const ExperienceItemList = (props) => {
    const experienceThis = props.experienceThis;
    return <section className="experience-items">
        {
            experienceData.map((item, index) => {
                if (experienceThis.state.visibleSection === "all" || experienceThis.state.visibleSection === item.type) {
                    return <ExperienceItem data={item} key={index} />
                }
            })
        }
    </section>
}

export default class Experience extends Component {
    constructor() {
        super();
        this.state = {
            "visibleSection": "all"
        };
    }

    render() {

        const setVisibleSection = (event, newSection) => {
            // Update active tab
            let previousTab = document.querySelector('.tablink-active');
            previousTab.classList.remove("tablink-active");
            event.target.classList.add("tablink-active");

            // Display relevant experience items
            let newState = { "visibleSection": newSection };
            this.setState(newState);
        }

        const experienceThis = this;


        return <section id="experience" className="main special">
            <header className="major">
                <h2>Experience</h2>
            </header>
            <section className="experience-tab-selector">
                <button className="tablinks tablink-active"
                    onClick={(event) => setVisibleSection(event, 'all')}>All</button>
                <button className="tablinks"
                    onClick={(event) => setVisibleSection(event, 'industry')}>Industry</button>
                <button className="tablinks"
                    onClick={(event) => setVisibleSection(event, 'research')}>Research</button>
                <button className="tablinks"
                    onClick={(event) => setVisibleSection(event, 'teaching')}>Teaching</button>
            </section>
            <ExperienceItemList experienceThis={experienceThis} />
        </section>
    }
}