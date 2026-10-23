import React from 'react'
import { Link } from 'gatsby'
import ResponsiveImage from '../ResponsiveImage'
import SocialIcon from '../SocialIcon'
import './header.css'

const socialLinks = [
    { name: 'Email', icon: 'email', href: 'mailto:pradyumna.shome@gmail.com' },
    { name: 'LinkedIn', icon: 'linkedin', href: 'https://linkedin.com/in/pradyumna-shome' },
    { name: 'GitHub', icon: 'github', href: 'https://github.com/PradyumnaShome' },
    { name: 'X', icon: 'x', href: 'https://x.com/PradyumnaShome' },
    { name: 'Mastodon', icon: 'mastodon', href: 'https://mastodon.social/@PradyumnaShome', rel: 'me' },
    { name: 'Google Scholar', icon: 'scholar', href: 'https://scholar.google.com/citations?user=om4Ot2kAAAAJ' },
    { name: 'Spotify', icon: 'spotify', href: 'https://open.spotify.com/user/x1lo68pet3v5jq25s7r8zakyq' },
]

export default function Header({ compact = false }) {
    if (compact) {
        return <header id="header" className="compact-header">
            <Link to="/" className="compact-identity">
                <span className="logo"><ResponsiveImage imageKey="/images/pradyumna-shome.jpeg" alt="" sizes="64px" loading="eager" /></span>
                <span>Pradyumna Shome</span>
            </Link>
            <Link to="/" className="home-link">Home</Link>
        </header>
    }
    return <header id="header" className="alt">
        <span className="logo"><ResponsiveImage imageKey="/images/pradyumna-shome.jpeg" alt="Pradyumna Shome" sizes="(max-width: 739px) 70vw, 30vw" loading="eager" fetchPriority="high" /></span>
        <h1>Pradyumna Shome</h1>
        <p><code>IPA: prədˈjʊmnə ʃoʊm</code> or <code>Phonetic: pruhd-yiuhm-nuh shohm</code></p>
        <p className="role-line">
            Co-Founder and Founding Engineer at <a
                href="https://playfuldesign.app"
                target="_blank"
                rel="noopener noreferrer"
                className="playful-link-headline"
                aria-label="Playful website"
            ><ResponsiveImage imageKey="/images/logo_pink.png" alt="Playful" className="playful-logo-headline" sizes="96px" loading="eager" /></a>
        </p>
        <ul className="icons" aria-label="Find me elsewhere">
            {socialLinks.map(link => <li key={link.icon}>
                <a href={link.href} className="icon alt social-link" rel={link.rel} aria-label={link.name}>
                    <SocialIcon name={link.icon} />
                    <span className="visually-hidden">{link.name}</span>
                </a>
            </li>)}
        </ul>
    </header>
}
