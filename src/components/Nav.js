import React from 'react'
import Scrollspy from 'react-scrollspy'

const Nav = (props) => (
    <nav aria-label="Page sections" id="nav" className={props.sticky ? 'alt' : ''}>
        {/* When adding or modifying sections, change both the <li> elements, *and* the <Scrollspy> items list. */}
        <Scrollspy items={ ['about', 'research', 'awards', 'personal', 'music'] } currentClassName="is-active" offset={-300}>
            <li>
                <a href="#about">About</a>
            </li>
            <li>
                <a href="#research">Publications & Talks</a>
            </li>
            <li>
                <a href="#awards">Awards</a>
            </li>
            <li>
                <a href="#personal">Writings & Interests</a>
            </li>
            <li>
                <a href="#music">Music</a>
            </li>
        </Scrollspy>
    </nav>
)

export default Nav
