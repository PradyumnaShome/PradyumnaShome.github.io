import React from 'react';
import './music.css';

export default function Music() {
    return <section id="music" className="main special">
        <header className="major">
            <h2>Music</h2>
            <p>
                I enjoy listening to and playing music.
                Although I frequently explore new styles, my go-to genres are Western art music, rock, tropical house, and big room house.
                In particular, I have been playing the piano for several years and have tried my hand at production.
                Enjoy listening to some of my early efforts at digital music composition. 
                Feel free to follow me on <a href="https://open.spotify.com/user/x1lo68pet3v5jq25s7r8zakyq">Spotify</a>.
            </p>
        </header>
        <p id="soundcloud">
            <iframe width="100%" height="450" scrolling="no" frameBorder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/143006461&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true"></iframe>
        </p>
        <p>
            {/* YouTube embedded player */}
            <iframe width="100%" height="600em" src="https://www.youtube.com/embed/?listType=playlist&list=PL3NoeZTJMHQJnTAmsZqrAePCe3o1WTAoC" frameBorder="0"></iframe>
        </p>
    </section>
}