import React from 'react'
import Scrollspy from 'react-scrollspy'
import Scroll from './Scroll'

const Nav = (props) => (
    <nav id="nav" className={props.sticky ? 'alt' : ''}>
        <Scrollspy items={ ['about', 'research', 'awards', 'experience',  'music', 'contact'] } currentClassName="is-active" offset={-300}>
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
            <li>
                <Scroll type="id" element="contact">
                    <a href="#">Contact</a>
                </Scroll>
            </li>
        </Scrollspy>
    </nav>
)

export default Nav
