import React from 'react'
import { Link } from 'gatsby'

import './header.css';

import profilePhoto from '../../../static/images/pradyumna-shome.webp';

const Header = () => (
    <header id="header" className="alt">
        <span className="logo"><img src={profilePhoto} alt="" /></span>
        <h1>
            <Link to="/">Pradyumna Shome</Link>
        </h1>
        <p>
            PhD student in Computer Science at Georgia Institute of Technology
        </p>
        <ul className="icons">
            <li>
                <a href="mailto://pradyumna.shome@gmail.com" className="icon
                                fa-envelope alt">
                    <span className="label">Email</span>
                </a>
            </li>
            <li>
                <a href="https://linkedin.com/in/pradyumna-shome" className="icon
                                fa-linkedin alt">
                    <span className="label">LinkedIn</span>
                </a>
            </li>
            <li>
                <a href="https://github.com/PradyumnaShome" className="icon
                                fa-github alt">
                    <span className="label">GitHub</span>
                </a>
            </li>
            <li>
                <a href="https://twitter.com/PradyumnaShome" className="icon
                                fa-twitter alt">
                    <span className="label">Twitter</span>
                </a>
            </li>
            <li>
                <a rel="me" href="https://mastodon.social/@PradyumnaShome" className="icon
                                fa-mastodon alt">
                    <span className="label">Mastodon</span>     
                </a>
            </li>
            <li>
                <a href="https://scholar.google.com/citations?user=om4Ot2kAAAAJ" className="icon
                                fa-google alt">
                    <span className="label">Google Scholar</span>
                </a>
            </li>
            <li>
                <a href="https://open.spotify.com/user/x1lo68pet3v5jq25s7r8zakyq" className="icon
                                fa-spotify alt">
                    <span className="label">Spotify</span>
                </a>
            </li>
        </ul>
    </header>
)

export default Header
