import React from 'react'
import Helmet from 'react-helmet'
import Waypoint from 'react-waypoint'

import Layout from '../components/layout'
import Header from '../components/header/header'

import './meet.css';


class Meet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stickyNav: false
        }
    }

    _handleWaypointEnter = () => {
        this.setState(() => ({ stickyNav: false }));
    }

    _handleWaypointLeave = () => {
        this.setState(() => ({ stickyNav: true }));
    }

    render() {

        const redirectToMeeting = linkType => window.location.href = "https://woven.com/c/pradyumnashome16/" + linkType;

        return (
            <Layout>
                <Helmet title="Pradyumna Shome" />

                <Header />

                <Waypoint
                    onEnter={this._handleWaypointEnter}
                    onLeave={this._handleWaypointLeave}
                >
                </Waypoint>

                <section id="meet" className="main special">
                    <div className="spotlight">
                        <div className="content">
                            <header className="major">
                                <h2>Meet Me</h2>
                                Hi there! Thanks for your interest in meeting me.
                                Please select one of the links below to schedule time.
                            </header>

                            <section className="scheduling-links">
                                <p>
                                    <button onClick={() => redirectToMeeting("30-minutes")}>30 Minutes</button>
                                </p>
                                <p>
                                    <button onClick={() => redirectToMeeting("60-minutes")}>60 Minutes</button>
                                </p>
                            </section>
                        </div>
                    </div>
                </section>
            </Layout >
        )
    }
}

export default Meet
