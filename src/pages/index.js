import React from 'react'
import Helmet from 'react-helmet'
import Waypoint from 'react-waypoint'

import Layout from '../components/layout'
import Header from '../components/header/header'
import About from '../components/about/about'
import Research from '../components/research/research'
import Personal from '../components/personal/personal'
import Awards from '../components/awards/awards'
import Music from '../components/music/music'
import Nav from '../components/Nav'

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
                content: "Co-Founder and Founding Engineer at Playful. I build socio-technical systems at the intersection of security, privacy, and AI. Currently focused on AI for Design."
              },
              {
                property: "og:title",
                content: "Pradyumna Shome"
              },
              {
                property: "og:description",
                content: "Co-Founder and Founding Engineer at Playful. I build socio-technical systems at the intersection of security, privacy, and AI. Currently focused on AI for Design."
              },
              {
                property: "og:type",
                content: "website"
              },
              {
                property: "og:url",
                content: "https://pradyumnashome.com"
              },
              {
                property: "og:image",
                content: "https://pradyumnashome.com/images/pradyumna-shome.webp"
              },
              {
                property: "og:image:width",
                content: "1024"
              },
              {
                property: "og:image:height",
                content: "1024"
              },
              {
                property: "og:image:type",
                content: "image/png"
              },
              {
                name: "twitter:card",
                content: "summary_large_image"
              },
              {
                name: "twitter:title",
                content: "Pradyumna Shome"
              },
              {
                name: "twitter:description",
                content: "Co-Founder and Founding Engineer at Playful. I build socio-technical systems at the intersection of security, privacy, and AI. Currently focused on AI for Design."
              },
              {
                name: "twitter:image",
                content: "https://pradyumnashome.com/images/pradyumna-shome.webp"
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
          <Personal/>
          <Music />
        </main>

      </Layout>
    )
  }
}

export default Index
