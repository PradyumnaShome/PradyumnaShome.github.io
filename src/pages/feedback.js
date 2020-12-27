import React from 'react';

export default class Feedback extends React.Component {

    render() {
        const feedbackLink = "https://forms.gle/YGbbCSwSMqQCHbCQ8";
        return window.location.replace(feedbackLink);
    }
}