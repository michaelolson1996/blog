import React from 'react';
import "./styles/contact.css";
import { connect } from 'react-redux';
import { sendEmail } from '../redux/email';
import { Container, Paper, TextField, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
            <></>
    }

    StyledContainer = withStyles({
        root: {
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    })(Container);

    StyledForm = withStyles({
        root: {
            color: '#fff',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width:'70vw',
            maxWidth: '550px',
            minWidth: '200px'
        }
    })(Paper);

    StyledTextField = withStyles({
        root: {
            margin: '20px 0 20px 0',
            '& label': {
                color: '#fff'
            },
            '& label.Mui-focused': {
                color: '#fff',
            },
            width:'70vw',
            maxWidth: '400px',
            minWidth: '180px'
        },
    })(TextField);

    StyledTextArea = withStyles({
        root: {
            margin: '20px 0 20px 0',
            '& label': {
                color: '#fff',
            },
            '& label.Mui-focused': {
                color: '#fff',
            },
            maxHeight: '200px',
            overflowY: 'auto',
            width:'70vw',
            maxWidth: '400px',
            minWidth: '180px'
        },
    })(TextField)

    render() {
        return (
            <>
                <this.StyledContainer>
                    <this.StyledForm elevation={3}>
                        <Typography variant="h4" align="center">Contact Me</Typography>
                        <this.StyledTextField onChange={ (e) => this.updateState("name", e.target.value) } label="Full Name" id="standard-basic" className="contact-inputs" />
                        <this.StyledTextField onChange={ (e) => this.updateState("email", e.target.value) } label="Email" id="standard-basic" className="contact-inputs" />
                        <this.StyledTextField onChange={ (e) => this.updateState("subject", e.target.value) } label="Subject" id="standard-basic" className="contact-inputs" />
                        <this.StyledTextArea onChange={ (e) => this.updateState("body", e.target.value) } label="Body" multiline={true} id="body-input" />
                        <Button onClick={ () => { this.sendEmail() } } id="contact-submit-button">Submit</Button>
                    </this.StyledForm>
                </this.StyledContainer>
            </>
        )
    }
}

export default connect(state => state, { sendEmail })(Contact);
