import React, { useEffect, useRef, useState } from 'react';
import './music.css';

export default function Music() {
    const section = useRef(null);
    const [playersReady, setPlayersReady] = useState(false);
    useEffect(() => {
        if (!('IntersectionObserver' in window)) { setPlayersReady(true); return undefined; }
        const observer = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) { setPlayersReady(true); observer.disconnect(); }
        }, { rootMargin: '300px' });
        observer.observe(section.current);
        return () => observer.disconnect();
    }, []);
    return <section ref={section} id="music" className="main special">
        <header className="major">
            <h2>Music</h2>
        </header>
        <p>
            I've been playing the piano for many years, have tried my hand at music production, and am always discovering new music to listen to.
            Currently, I'm listening to Charlotte de Witte (techno), Nena (Neue Deutsche Welle), Nightwish (symphonic metal), Céline Dion (Adult Contemporary), Ludovico Einaudi (Neo-Classical Piano), and Bon Entendeur (French Electro).
            Enjoy listening to some of my early efforts at digital music composition and feel free to follow me on <a href="https://open.spotify.com/user/x1lo68pet3v5jq25s7r8zakyq" target="_blank" rel="noreferrer">Spotify</a>.
        </p>
        <p id="soundcloud" style={{ minHeight: 450 }}>
            {playersReady && <iframe loading="lazy" title="Pradyumna Shome's SoundCloud" width="100%" height="450" scrolling="no" frameBorder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/143006461&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>}
        </p>
        <p style={{ minHeight: 600 }}>
            {/* YouTube embedded player */}
            {playersReady && <iframe loading="lazy" title="Pradyumna Shome's YouTube" width="100%" height="600" src="https://www.youtube.com/embed/?listType=playlist&list=PL3NoeZTJMHQJnTAmsZqrAePCe3o1WTAoC" frameBorder="0"></iframe>}
        </p>
    </section>
}
