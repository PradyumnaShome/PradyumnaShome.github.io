import React from 'react'
import './header.css';

import profilePhoto from '../../../static/images/pradyumna-shome.webp';
import playfulLogo from '../../../static/images/logo_pink.png';

const openPlayful = () => window.open('https://playfuldesign.app', '_blank', 'noopener');

const Header = () => {
    const handlePlayfulKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openPlayful();
        }
    };

    return (
        <header id="header" className="alt">
            <span className="logo"><img src={profilePhoto} alt="" /></span>
            <h1>
                Pradyumna Shome
            </h1>
            <p>
                <code>IPA: prədˈjʊmnə ʃoʊm</code> or <code>Phonetic: pruhd-yiuhm-nuh shohm</code>
            </p>
            <p>
                Co-Founder and Founding Engineer at <span
                    role="link"
                    tabIndex={0}
                    className="playful-link-headline"
                    onClick={openPlayful}
                    onKeyDown={handlePlayfulKeyDown}
                    aria-label="Open Playful website"
                ><img src={playfulLogo} alt="Playful" className="playful-logo-headline" /></span>
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
                                    fa-linkedin-in alt">
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
                    <a href="https://x.com/PradyumnaShome" className="icon
                                    fa-x alt">
                        <span className="label">Twitter</span>
                    </a>
                </li>
                <li>
                    <a rel="me" href="https://mastodon.social/@PradyumnaShome">Mastodon</a>
                    <a href="https://mastodon.social/@PradyumnaShome" className="icon fa-mastodon alt">
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
    );
}

export default Header
