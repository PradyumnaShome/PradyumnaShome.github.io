import React from 'react';
import Helmet from 'react-helmet'
import Waypoint from 'react-waypoint'
import Layout from '../components/layout'
import Header from '../components/header/header'
import Recipes from '../components/recipes/recipes'

export default class Cooking extends React.Component {
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

        return (
            <Layout>
                <Helmet title="Pradyumna Shome" />

                <Header />

                <Waypoint
                    onEnter={this._handleWaypointEnter}
                    onLeave={this._handleWaypointLeave}
                >
                </Waypoint>
                <div id="main">
                    <section id="intro" className="main special">
                        <div class="spotlight">
                            <div class="content">
                                <header class="major">
                                    <h2>Cooking</h2>
                                    <Recipes/>
                                </header>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        )
    }
}