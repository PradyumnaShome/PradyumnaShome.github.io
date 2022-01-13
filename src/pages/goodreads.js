import React from 'react';

export default class Goodreads extends React.Component {
    componentDidMount() {
        const link = "https://goodreads.com/pradyumna";
        window.location.replace(link);
    }
    
    render () {
        return null;
    }
}
