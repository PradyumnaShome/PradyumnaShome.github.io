import React, { useState } from 'react';
import personalInterestsList from './personalInterestsList.yaml';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import "./PersonalInterests.css";

function renderMarkdown(remarkProcessor, markdown) {
    return remark().use(remarkHtml).processSync(markdown).toString();
}

export default function PersonalInterests() {
    let [scrollX, changeScrollX] = useState(0);

    function onHorizontalScrollHandler(event) {
        return;
        // Adjust the scrolling speed if needed
        const scrollSpeed = 10;

        // Calculate the new horizontal scroll position
        changeScrollX(scrollX + event.deltaY * scrollSpeed);
    }

    const remarkProcessor = remark().use(remarkHtml);
    if (personalInterestsList.list.length === 0) {
        return null;
    }
    function getRandomLinearGradient() {
        const colors = [null, null];
        const randomColors = colors.map(color => {
            const randomOpacity = Math.random() * 0.5 + 0.25;
            // Generate an array with 2 random hex values
            // Use the Math.random() function to generate a random number between 0 and 1
            // Multiply it by 255 to generate a number between 0 and 255
            // Use the Math.floor() function to convert it to an integer
            // Use the toString(16) function to convert the integer to a hexadecimal value
            // Add the hex value to the color
            const red = Math.floor(Math.random() * 255);
            const green = Math.floor(Math.random() * 255);
            const blue = Math.floor(Math.random() * 255);
            const randomHexRed = red.toString(16);
            const randomHexGreen = green.toString(16);
            const randomHexBlue = blue.toString(16);
            const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
            return [luminance, `#${randomHexRed}${randomHexGreen}${randomHexBlue}${Math.floor(randomOpacity * 255).toString(16)}`];
        });
        let randomAngle = Math.floor(Math.random() * 360);
        let averageLuminance = 0.5 * (randomColors[0][0] + randomColors[1][0]);
        
        let fontColor = "#ffffff";
        if (averageLuminance > 0.5) {
            fontColor = "#000000";
        }
        return [fontColor, `linear-gradient(${randomAngle}deg, ${randomColors[0][1]} 0%, ${randomColors[1][1]} 100%)`];
    }
    const [fontColor, randomGradient] = getRandomLinearGradient();
    return <section className="PersonalInterests">
        <h3 className="subheading">Personal interests</h3>
        <div id="personal-interests-container">
            {personalInterestsList.list.map((interest, index) => {
                const content = interest.trim();
                return <div key={index}
                style={{background: randomGradient, color: fontColor}} className="personal-interest-item" dangerouslySetInnerHTML={{ __html: renderMarkdown(remarkProcessor, content) }} />
            })}
        </div>
    </section>
}