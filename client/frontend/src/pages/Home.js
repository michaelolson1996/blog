import React from 'react';
import './styles/home.css';
import Particles from 'react-particles-js';

const Home = () => {
    return (
        <>
            <div id="home-wrapper">
                <div id="home-quote-section">
                    <img src="/trees.jpg" id="home-image" />
                    <figure>
                        <blockquote><q>Truth is ever to be found in simplicity, and not in the multiplicity and confusion of things.</q></blockquote>
                        <figcaption>
                            &mdash; Isaac Newton
                        </figcaption>
                    </figure>
                </div>
                <div id="home-info-section">
                    <img src="/desk.jpg" style={{ width: '325px', marginBottom: '30px' }} />
                    <h2 style={{ fontSize: '1.8rem' }}>Welcome To My Blog</h2>
                    <p className="home-michael-section">
                        Hello, my name is Michael Olson. I built this blog to improve my coding skills and teach myself to break down what I am learning into a format which is easy for readers to understand. I have learned so much from people on the internet, and this is my way of returning the favor. I will be going over programming languages and concepts, as well as some ethical hacking, mathematics, and server admin tools and best practices.
                    </p>
                    <p className="home-michael-section">
                        There is also a <a href="/donate">Donations page</a>. Proceeds will go to paying for the website to remain up and running, any overflow will be donated to a Christian organization which assists Karen hilltribe children living in the Northern Thailand with clothes, school, food, and housing, as well as 1% to lowering co2 emissions in the atmosphere.
                    </p>

                    <img src="/michael.jpg" style={{ width: '325px', marginBottom: '30px', marginTop: '80px' }} />
                    <h2 style={{ fontSize: '1.8rem' }}>About Me</h2>
                    <p className="home-michael-section">
                        I enjoy building projects that require problem-solving and force me to think outside of the box. The reward after solving a difficult issue is very fulfilling to me, and I seek to continue struggling because it makes me grow as a person. My goal as a fairly new developer is to share my experiences and hopefully help at least one person learn something while on my blog.
                    </p>
                    <p className="home-michael-section">
                        In my free time I like to play chess and go to the gym. I also enjoy practicing martial arts like Brazilian Jiu Jitsu and Muay Thai. I am currently a college student seeking work in the software engineering field, particularly in space and military. Feel free to reach out via the <a href="/">Contact page</a> about any questions or suggestions, and I hope you enjoy my blog!
                    </p>
                </div>
            </div>

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
                                distance: 20,
            					color: "#0e2439",
            					blur: .01
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
        </>

    )
}

export default Home;