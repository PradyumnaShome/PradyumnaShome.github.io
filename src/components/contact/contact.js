import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";

export default function Contact() {
    return <section id="contact" className="main special">
        <header className="major">
            <h2>Contact Me</h2>
        </header>
        <section>
            <form acceptCharset="UTF-8" action="https://usebasin.com/f/26894b7dc40a" method="post">
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" />
                </div>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" />
                </div>
                <div className="field">
                    <label htmlFor="message">Message</label>
                    <textarea name="message" id="message" rows="5"></textarea>
                </div>
                <section className="g-recaptcha">
                    <ReCAPTCHA
                        sitekey="6Lew3SMUAAAAAJ82QoS7gqOTkRI_dhYrFy1f7Sqy"
                    />
                </section>
                <div>
                    <ul className="actions">
                        <li>
                            <button className="button submit-button">Send Message</button>
                        </li>
                    </ul>
                </div>
            </form>
        </section>
    </section>
}