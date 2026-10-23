import React from 'react'
import Helmet from 'react-helmet'
import '../assets/scss/main.scss'

import Footer from './Footer'

class Template extends React.Component {
  render() {
    const { children, className = '' } = this.props

    return (
      <div className={`body ${className}`}>
        <Helmet htmlAttributes={{ lang: 'en' }}>
          <link rel="preload" href="/fonts/inter/latin-c940764593d0.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/space-grotesk/latin-a0d054c4af55.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        </Helmet>
        <div id="wrapper">

          {children}
          <Footer />
        </div>
      </div>
    )
  }
}

export default Template
