import React from 'react'
import Helmet from 'react-helmet'
import Waypoint from 'react-waypoint'

import Layout from '../components/layout'
import Header from '../components/header/header'
import About from '../components/about/about'
import Research from '../components/research/research'
import Awards from '../components/awards/awards'
import Experience from '../components/experience/experience'
import Music from '../components/music/music'
import Contact from '../components/contact/contact'
import Nav from '../components/Nav'


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stickyNav: false
    }
  }

  _handleWaypointEnter= () => {
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
        <Nav sticky={this.state.stickyNav} />

        <main id="main">
          <About/>
          <Research/>
          <Awards/>
          <Experience/>
          <Music/>
          <Contact/>
        </main>

      </Layout>
    )
  }
}

export default Index
