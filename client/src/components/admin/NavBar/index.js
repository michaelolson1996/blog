import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

export default function NavBar() {
    return (
        <div className='navbar-body'>
            <h1 className='navbar-title'>Michael Olson (Admin)</h1>
            
            <ul className='navbar-list-container'>
                <li className='navbar-list-item'><NavLink to='/'>Home</NavLink></li>
                <li className='navbar-list-item'><NavLink to='/admin'>Edit</NavLink></li>
                <li className='navbar-list-item'>Log Out</li>
            </ul>
        </div>
    );
}
