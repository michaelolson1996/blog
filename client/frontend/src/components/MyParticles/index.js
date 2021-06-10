import React from 'react';
import Particles from 'react-tsparticles';

class MyParticles extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            particles_count: 0
        }
    }

    componentDidMount() {
        window.onresize = () => { this.setCount() }
        this.setCount();
    }

    setCount = () => {
        let windowWidth = window.innerWidth;
        let particles_count = this.state.particles_count;
        let newCount = 0;

        if (windowWidth < 600 && particles_count !== 13)
            newCount = 13
        else if (windowWidth < 1000 && particles_count !== 30)
            newCount = 30
        else
            newCount = 70

        this.setState({ particles_count: newCount });
    }

    componentWillUnmount() {
        window.onresize = null;
    }

    render() {
        return (
            <>
                <Particles width="100vw" height="100vh" params={{
                    particles: {
                        move: {
                            enable: true
                        },
                        number: {
                            value: this.state.particles_count
                        },
                        size: {
                            value: 1
                        },
                        color: {
                            value: "#0e2439"
                        },
                        // line_linked: {
                        //     shadow: {
                        //         enable: true,
                        //         distance: 50,
                        //         color: "#0e2439",
                        //         blur: .01
                        //     }
                        // },
                        // draw: {
                        //     enable: true,
                        //     stroke: {
                        //         color: "#0e2439"
                        //     }
                        // }
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

            {

            }
            </>
        )
    }
}

export default MyParticles;
