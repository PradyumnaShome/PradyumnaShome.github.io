import React from 'react'
import Seo from '../components/Seo'

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
    this.waypointRef = React.createRef();
  }

  _handleWaypointEnter = () => {
    this.setState(() => ({ stickyNav: false }));
  }

  _handleWaypointLeave = () => {
    this.setState(() => ({ stickyNav: true }));
  }


  componentDidMount() {
    this._observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target !== this.waypointRef.current) return;
          if (entry.isIntersecting) {
            this._handleWaypointEnter();
          } else {
            this._handleWaypointLeave();
          }
        });
      },
      { threshold: 0 }
    );

    if (this.waypointRef.current) {
      this._observer.observe(this.waypointRef.current);
    }
  }

  componentWillUnmount() {
    if (this._observer && this.waypointRef.current) {
      this._observer.unobserve(this.waypointRef.current);
    }
    if (this._observer) {
      this._observer.disconnect();
    }
  }

  render() {
    return (
      <Layout>
        <Seo
          title="Pradyumna Shome"
          description="Co-Founder and Founding Engineer at Playful. I build socio-technical systems at the intersection of security, privacy, and AI. Currently focused on AI for Design."
        />

        <Header />

        <div
          ref={this.waypointRef}
          aria-hidden="true"
          style={{ height: 1, width: '100%' }}
        />
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
