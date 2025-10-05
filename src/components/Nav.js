import React from 'react'
import Scrollspy from 'react-scrollspy'
import Scroll from './Scroll'

const Nav = (props) => (
    <nav id="nav" className={props.sticky ? 'alt' : ''}>
        {/* When adding or modifying sections, change both the <li> elements, *and* the <Scrollspy> items list. */}
        <Scrollspy items={ ['about', 'research', 'awards', 'personal', 'music'] } currentClassName="is-active" offset={-300}>
            <li>
                <Scroll type="id" element="about">
                    <a href="#About">About</a>
                </Scroll>
            </li>
            <li>
                <Scroll type="id" element="research">
                    <a href="#PublicationsAndTalks">Publications & Talks</a>
                </Scroll>
            </li>
            <li>
                <Scroll type="id" element="awards">
                    <a href="#Awards">Awards</a>
                </Scroll>
            </li>
            <li>
                <Scroll type="id" element="personal">
                    <a href="#WritingsAndInterests">Writings & Interests</a>
                </Scroll>
            </li>
            <li>
                <Scroll type="id" element="music">
                    <a href="#Music">Music</a>
                </Scroll>
            </li>
        </Scrollspy>
    </nav>
)

export default Nav
