import React from 'react';

export default class Schedule extends React.Component {
    componentDidMount() {
        const link = "https://calendar.app.google/wRQr3NqK1w5r6KuSA";
        window.location.replace(link);
    }
    
    render () {
        return null;
    }
}
