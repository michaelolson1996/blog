import React from 'react';
import "./index.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faDownload, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div id="footer-wrapper">
            <div id="footer-icons-wrapper">
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/michael-olson-devops/">
                    <FontAwesomeIcon className="footer-icons" icon={faLinkedin} />
                </a>
                <a target="_blank" rel="noreferrer" href="https://github.com/michaelolson1996">
                    <FontAwesomeIcon className="footer-icons" icon={faGithub} />
                </a>
                <a target="_blank" rel="noreferrer" href="https://michaelolson.surge.sh">
                    <FontAwesomeIcon className="footer-icons" icon={faUserTie} />
                </a>
                <a href="/resume.pdf" download="MichaelOlson_resume.pdf">
                    <FontAwesomeIcon className="footer-icons" icon={faDownload} />
                </a>
            </div>
            <div id="footer-links-wrapper">
                <NavLink className="footer-link" to="/">Home</NavLink>
                <div className="footer-link-dividers"></div>
                <NavLink className="footer-link" to="/categories">Categories</NavLink>
                <div className="footer-link-dividers"></div>
                <NavLink className="footer-link" to="/contact">Contact</NavLink>
                <div className="footer-link-dividers"></div>
                <NavLink className="footer-link" to="/donate">Donate</NavLink>
            </div>
        </div>
    )
}

export default Footer;