import React from 'react';
import './styles/home.css';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Container } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        height: 'auto',
        width: '100vw',
        padding: 0,
        display: 'flex',
        flexDirection: 'column'
    },
    container: {
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 80px auto'
    },
    paper: {
        margin: '30px',
        color: '#fff',
        padding: '40px',
    }
}));

const Home = () => {
    const classes = useStyles();

    return (
        <>
            <Container className={classes.root}>
                <Container className={classes.container}>
                    <Paper elevation={3} className={classes.paper}>
                        <blockquote><q>Truth is ever to be found in simplicity, and not in the multiplicity and confusion of things.</q></blockquote>
                        <figcaption>
                            &mdash; Isaac Newton
                        </figcaption>
                    </Paper>
                </Container>
                <Container className={classes.container}>
                    <Paper elevation={3} className={classes.paper}>
                        <div id="contact-michael-img-wrapper" style={{ margin: '20px auto 20px auto' }}>
                            <div style={{ backgroundImage: `url('/michael.jpg')` }} id="contact-michael-img"></div>
                        </div>
                        <Typography variant="h2" align="center" gutterBottom={true}>Welcome To My Blog</Typography>
                        <Typography variant="body1">
                            Hello, my name is Michael Olson. I built this blog to improve my coding skills and teach myself to break down what I am learning into a format which is easy for readers to understand. I have learned so much from people on the internet, and this is my way of returning the favor. I will be going over programming languages and concepts, as well as some ethical hacking, mathematics, and server admin tools and best practices.
                        </Typography>
                        <br />
                        <Typography variant="body1">
                            There is also a <a style={{ color: "#fff" }} href="/donate">Donations page</a>. Proceeds will go to paying for the website to remain up and running, any overflow will be donated to a Christian organization which assists Karen hilltribe children living in the Northern Thailand with clothes, school, food, and housing, as well as 1% to lowering co2 emissions in the atmosphere.
                        </Typography>
                    </Paper>
                </Container>
                <Container className={classes.container}>
                    <Paper elevation={3} className={classes.paper}>
                        <div style={{ height: 'auto', width: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px auto 20px auto' }}>
                            <img src="/michael2.jpg" style={{ width: '200px' }} />
                        </div>
                        <Typography variant="h2" align="center" gutterBottom={true}>About Me</Typography>
                        <Typography variant="body1">
                            I enjoy building projects that require problem-solving and force me to think outside of the box. The reward after solving a difficult issue is very fulfilling to me, and I seek to continue struggling because it makes me grow as a person. My goal as a fairly new developer is to share my experiences and hopefully help at least one person learn something while on my blog.
                        </Typography>
                        <br />
                        <Typography variant="body1">
                            In my free time I like to play chess and go to the gym. I also enjoy practicing martial arts like Brazilian Jiu Jitsu and Muay Thai. I am currently a college student seeking work in the software engineering field, particularly in space and military. Feel free to reach out via the <a style={{ color: "#fff" }} href="/contact">Contact page</a> about any questions or suggestions, and I hope you enjoy my blog!
                        </Typography>
                    </Paper>
                </Container>
            </Container>
        </>
    )
}

export default Home;