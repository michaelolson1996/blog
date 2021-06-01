import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

export default function NavBar() {
    return (
        <div id='navbar-body'>
            <h1 id='navbar-title'>Michael Olson (Admin)</h1>
            <ul className='navbar-list-container'>
                <li><NavLink className='navbar-list-item' to='/'>Home</NavLink></li>
                <li><NavLink className='navbar-list-item' to='/admin'>Edit</NavLink></li>
                <li className='navbar-list-item'>Log Out</li>
            </ul>
        </div>
    );
};