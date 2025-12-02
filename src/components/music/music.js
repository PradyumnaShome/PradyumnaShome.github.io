import React from 'react';
import './music.css';

export default function Music() {
    return <section id="music" className="main special">
        <header className="major">
            <h2>Music</h2>
        </header>
        <p>
            I've been playing the piano for many years, have tried my hand at music production, and am always discovering new music to listen to.
            Currently, I'm listening to Charlotte de Witte (techno), Nena (Neue Deutsche Welle), Nightwish (symphonic metal), Céline Dion (Adult Contemporary), Ludovico Einaudi (Neo-Classical Piano), and Bon Entendeur (French Electro).
            Enjoy listening to some of my early efforts at digital music composition and feel free to follow me on <a href="https://open.spotify.com/user/x1lo68pet3v5jq25s7r8zakyq" target="_blank" rel="noreferrer">Spotify</a>.
        </p>
        <p id="soundcloud">
            <iframe title="Pradyumna Shome's SoundCloud" width="100%" height="450" scrolling="no" frameBorder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/143006461&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true"></iframe>
        </p>
        <p>
            {/* YouTube embedded player */}
            <iframe title="Pradyumna Shome's YouTube" width="100%" height="600em" src="https://www.youtube.com/embed/?listType=playlist&list=PL3NoeZTJMHQJnTAmsZqrAePCe3o1WTAoC" frameBorder="0"></iframe>
        </p>
    </section>
}
