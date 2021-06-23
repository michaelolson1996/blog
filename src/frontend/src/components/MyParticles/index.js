import React from 'react';
import Particles from 'react-tsparticles';

const MyParticles = () => {

    return (
        <Particles
            options={{
                background: {
                    color: "#0e2439"
                },
                detectRetina: false,
                fpsLimit: 30,
                interactivity: {
                    detectsOn: "canvas",
                    events: {
                        resize: true
                    }
                },
                particles: {
                    color: {
                        value: "#fff"
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 1080
                        },
                        limit: 0,
                        value: 400
                    },
                    opacity: {
                        animation: {
                            enable: true,
                            minimumValue: 0.05,
                            speed: 0.95,
                            sync: false
                        },
                        random: {
                            enable: true,
                            minimumValue: 0.05
                        },
                        value: 1
                    },
                    shape: {
                        type: "circle"
                    },
                    size: {
                        random: {
                            enable: true,
                            minimumValue: 0.5
                        },
                        value: 1
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
            }}
        />
    );
}

export default MyParticles;
