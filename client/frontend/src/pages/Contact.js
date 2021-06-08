import React from 'react';
import "./styles/contact.css";
import Particles from 'react-particles-js';
import { connect } from 'react-redux';
import { sendEmail } from '../redux/email';

class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            subject: '',
            body: ''
        }
    }

    validateEmailInfo = () => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (
            re.test(this.state.email) && 
            this.state.name !== '' && 
            this.state.subject !== '' && 
            this.state.body !== ''
        );
    }

    updateState = (key, value) => {
        this.setState(oldState => ({
            ...oldState,
            [key]: value
        }))
    }

    sendEmail = () => {
        if (this.validateEmailInfo())
            this.props.sendEmail(this.state)
        else
            console.log("hello")
    }

    render() {
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
                    <label className="contact-input-labels" htmlFor="name-input">
                        Full Name
                        <input onChange={ (e) => this.updateState("name", e.target.value) } id="name-input" className="contact-inputs" />
                    </label>
                    <label className="contact-input-labels" htmlFor="email-input">
                        Email
                        <input onChange={ (e) => this.updateState("email", e.target.value) } id="email-input" className="contact-inputs" />
                    </label>
                    <label className="contact-input-labels" htmlFor="subject-input">
                        Subject
                        <input onChange={ (e) => this.updateState("subject", e.target.value) } id="subject-input" className="contact-inputs" />
                    </label>
                    <label className="contact-input-labels" htmlFor="body-input">
                        Body
                        <textarea onChange={ (e) => this.updateState("body", e.target.value) } id="body-input" className="contact-inputs" />
                    </label>
                </div>
                <div>
                    <button onClick={ () => { this.sendEmail() } } id="contact-submit-button">Submit</button>
                </div>
            </div>
        )
    }
}

export default connect(state => state, { sendEmail })(Contact);