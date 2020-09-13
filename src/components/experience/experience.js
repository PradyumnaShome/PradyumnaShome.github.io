import React, { setState, Component } from "react";
import experienceData from "./experience.yaml";
import markdownIt from "markdown-it";
import htmlToReact from "html-to-react";

function ExperienceItem(props) {
    const md = markdownIt({
        html: true,
        linkify: true
    });
    const htmlToReactParser = new htmlToReact.Parser();
    const item = props.data;
    const itemClassName = "experience-item experience-active experience-" + item.type;
    return <section className={itemClassName}>
        <img src={item.icon} alt="" />
        <h3>
            <span className="organization">
                <a href={item.link}>{item.organization}</a>
            </span>
            <span className="role">
                {item.role}
                <span className="separator">·</span>
                <span className="duration">{item.duration}</span>
            </span>
        </h3>
        <article className="description">
            <ul>
                {
                    item.description.map((bulletPoint, bulletIndex) => {
                        return <li key={bulletIndex}>
                            {htmlToReactParser.parse(md.render(bulletPoint))}
                        </li>;
                    })
                }
            </ul>
        </article>
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

        const ExperienceItemList = () => {
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
            <ExperienceItemList />
        </section>
    }
}