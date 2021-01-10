import React from 'react';

export default class Feedback extends React.Component {
    componentDidMount() {
        const feedbackLink = "https://forms.gle/YGbbCSwSMqQCHbCQ8";
        window.location.replace(feedbackLink);
    }
    
    render () {
        return null;
    }
}