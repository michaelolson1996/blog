import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./index.css";

const NavBar = () => {

    const [displayDropDown, setDisplayDropDown] = useState(false);
    const [navbarPositionY, setNavbarPositionY] = useState(0);

    return (
        <>
            <div id="navbar-wrapper">
                <div id="navbar-title-wrapper">
                    <h1 id="navbar-title">michaelolson.blog</h1>
                </div>
                <div id="navbar-burger-wrapper" onClick={ () => {
                        setDisplayDropDown(!displayDropDown)

                    } }>
                    <div id="navbar-burger">
                        <div className="navbar-burger-item"></div>
                        <div className="navbar-burger-item"></div>
                        <div className="navbar-burger-item"></div>
                    </div>
                </div>
            </div>

            {
                window.onscroll = () => {
                    document.getElementById("navbar-wrapper") !== null ? 
                        window.pageYOffset > navbarPositionY && navbarPositionY > 80 ?
                            document.getElementById("navbar-wrapper").className.includes("navbar-small") ?
                                <></>
                            :
                            (() => {
                                document.getElementById("navbar-wrapper").className = "navbar-small"
                                document.getElementById("navbar-burger").style.height = "60%"
                                document.getElementById("navbar-menu-wrapper") ?
                                    document.getElementById("navbar-menu-list").style.top = "80px"
                                :
                                    <></>
                            })()
                        :
                            document.getElementById("navbar-wrapper").className.includes("navbar-small") ?
                                (() => {
                                    document.getElementById("navbar-burger").style.height = "48%"
                                    document.getElementById("navbar-wrapper").className = ""
                                    document.getElementById("navbar-menu-wrapper") ?
                                        document.getElementById("navbar-menu-list").style.top = "100px"
                                    :
                                        <></>
                                })()
                            :
                                <></>
                    :
                        <></>

                    setNavbarPositionY(window.pageYOffset)
                }
            }

            {
                displayDropDown ?
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
                                <NavLink className="navbar-menu-list-link" to="/donate">Donate</NavLink>
                            </li>
                        </ul>
                    </nav>
                :
                    <></>
            }
        </>
    )
}

export default NavBar