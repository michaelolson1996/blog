import React from 'react';
import "./styles/contact.css";
import Particles from 'react-particles-js';

const Contact = () => {
    return (
        <div id="contact-wrapper">
            <Particles width="100vw" height="100vh" params={{
            		particles: {
                        number: {
                            value: 13
                        },
                        size: {
                            value: 1
                        },
                        color: {
                            value: "#0e2439"
                        },
            			line_linked: {
            				shadow: {
            					enable: true,
                                distance: 30,
            					color: "#0e2439",
            					blur: 1
            				}
            			},
                        draw: {
                            enable: true,
                            stroke: {
                                color: "#0e2439"
                            }
                        }
            		}
            	}}
                style={{
                    width: '100vw',
                    position: 'fixed',
                    top:0,
                    left:0,
                    zIndex: -10,
                    height:'100vh'
                }} />

            <div id="contact-michael-img-wrapper">
                <div style={{ backgroundImage: `url('/michael.jpg')` }} id="contact-michael-img"></div>
            </div>

            <div id="contact-input-section">
                <label className="contact-input-labels" for="name-input">
                    Full Name
                    <input id="name-input" className="contact-inputs" />
                </label>
                <label className="contact-input-labels" for="email-input">
                    Email
                    <input id="email-input" className="contact-inputs" />
                </label>
                <label className="contact-input-labels" for="subject-input">
                    Subject
                    <input id="subject-input" className="contact-inputs" />
                </label>
                <label className="contact-input-labels" for="body-input">
                    Body
                    <textarea id="body-input" className="contact-inputs" />
                </label>
            </div>
            <div>
                <button id="contact-submit-button">Submit</button>
            </div>
        </div>
    )
}

export default Contact;