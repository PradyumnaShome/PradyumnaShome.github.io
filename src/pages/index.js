import React from 'react'
import Helmet from 'react-helmet'
import Waypoint from 'react-waypoint'

import Layout from '../components/layout'
import Header from '../components/header/header'
import About from '../components/about/about'
import Research from '../components/research/research'
import Awards from '../components/awards/awards'
import Music from '../components/music/music'
import Nav from '../components/Nav'

import profilePhoto from '../assets/images/portrait.png';

class Index extends React.Component {
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
        <Helmet
          title="Pradyumna Shome"
          meta={
            [
              {
                name: "description",
                content: "CS @ Illinois '21 | Researcher at Security and Privacy Research at Illinois"
              },
              {
                name: "og:title",
                content: "Pradyumna Shome"
              },
              {
                name: "og:type",
                content: "website"
              },
              {
                name: "og:image",
                content: {profilePhoto}
              },
              {
                name: "og:image:width",
                content: "1024"
              },
              {
                name: "og:image:height",
                content: "1024"
              },
              {
                name: "og:image:type",
                content: "image/png"
              }
            ]}
        />

        <Header />

        <Waypoint
          onEnter={this._handleWaypointEnter}
          onLeave={this._handleWaypointLeave}
        >
        </Waypoint>
        <Nav sticky={this.state.stickyNav} />

        <main id="main">
          <About />
          <Research />
          <Awards />
          <Music />
        </main>

      </Layout>
    )
  }
}

export default Index
