import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./index.css";

const NavBar = () => {

    const [displayDropDown, setDisplayDropDown] = useState(false);

    return (
        <>
            <div id="navbar-wrapper">
                <div id="navbar-title-wrapper">
                    <h1 id="navbar-title">michaelolson.blog</h1>
                </div>
                <div id="navbar-burger-wrapper" onClick={ () => setDisplayDropDown(!displayDropDown) }>
                    <div id="navbar-burger">
                        <div className="navbar-burger-item"></div>
                        <div className="navbar-burger-item"></div>
                        <div className="navbar-burger-item"></div>
                    </div>
                </div>
            </div>
            {
                displayDropDown ?
                    <>
                        <nav id="navbar-menu-wrapper">
                            <ul id="navbar-menu-list">
                                <li className="navbar-menu-list-item" onClick={ () => setDisplayDropDown(!displayDropDown) }>
                                    <NavLink className="navbar-menu-list-link" to="/">Home</NavLink>
                                </li>
                                <li className="navbar-menu-list-item" onClick={ () => setDisplayDropDown(!displayDropDown) }>
                                    <NavLink className="navbar-menu-list-link" to="/categories">Categories</NavLink>
                                </li>
                                <li className="navbar-menu-list-item" onClick={ () => setDisplayDropDown(!displayDropDown) }>
                                    <NavLink className="navbar-menu-list-link" to="/">Contact</NavLink>
                                </li>
                                <li className="navbar-menu-list-item" onClick={ () => setDisplayDropDown(!displayDropDown) }>
                                    <NavLink className="navbar-menu-list-link" to="/">Donate</NavLink>
                                </li>
                            </ul>
                        </nav> 
                    </>
                :
                    <></>
            }
        </>
    )
}

export default NavBar