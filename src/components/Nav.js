import React from 'react'
import Scrollspy from 'react-scrollspy'
import Scroll from './Scroll'

const Nav = (props) => (
    <nav id="nav" className={props.sticky ? 'alt' : ''}>
        {/* When adding or modifying sections, change both the <li> elements, *and* the <Scrollspy> items list. */}
        <Scrollspy items={ ['about', 'research', 'experience', 'awards',  'music', 'contact'] } currentClassName="is-active" offset={-300}>
            <li>
                <Scroll type="id" element="about">
                    <a href="#">About Me</a>
                </Scroll>
            </li>
            <li>
                <Scroll type="id" element="research">
                    <a href="#">Research</a>
                </Scroll>
            </li>
            <li>
                <Scroll type="id" element="experience">
                    <a href="#">Experience</a>
                </Scroll>
            </li>
            <li>
                <Scroll type="id" element="awards">
                    <a href="#">Awards and Honors</a>
                </Scroll>
            </li>
            <li>
                <Scroll type="id" element="music">
                    <a href="#">Music</a>
                </Scroll>
            </li>
        </Scrollspy>
    </nav>
)

export default Nav
