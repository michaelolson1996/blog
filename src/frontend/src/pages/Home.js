import React from 'react';
import './styles/home.css';
import MyParticles from '../components/MyParticles';

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
                    <img src="/desk.jpg" className="home-images" id="home-desk-image" />
                    <h2 className="home-title">Welcome To My Blog</h2>
                    <p className="home-michael-section">
                        Hello, my name is Michael Olson. I built this blog to improve my coding skills and teach myself to break down what I am learning into a format which is easy for readers to understand. I have learned so much from people on the internet, and this is my way of returning the favor. I will be going over programming languages and concepts, as well as some ethical hacking, mathematics, and server admin tools and best practices.
                    </p>
                    <p className="home-michael-section">
                        There is also a <a href="/donate">Donations page</a>. Proceeds will go to paying for the website to remain up and running, any overflow will be donated to a Christian organization which assists Karen hilltribe children living in the Northern Thailand with clothes, school, food, and housing, as well as 1% to lowering co2 emissions in the atmosphere.
                    </p>

                    <img src="/michael2.jpg" className="home-images" id="home-michael-image" />
                    <h2 className="home-title">About Me</h2>
                    <p className="home-michael-section">
                        I enjoy building projects that require problem-solving and force me to think outside of the box. The reward after solving a difficult issue is very fulfilling to me, and I seek to continue struggling because it makes me grow as a person. My goal as a fairly new developer is to share my experiences and hopefully help at least one person learn something while on my blog.
                    </p>
                    <p className="home-michael-section">
                        In my free time I like to play chess and go to the gym. I also enjoy practicing martial arts like Brazilian Jiu Jitsu and Muay Thai. I am currently a college student seeking work in the software engineering field, particularly in space and military. Feel free to reach out via the <a href="/">Contact page</a> about any questions or suggestions, and I hope you enjoy my blog!
                    </p>
                </div>
            </div>
            <MyParticles />
        </>
    )
}

export default Home;