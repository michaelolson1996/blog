import React from 'react';
// import { NavLink } from 'react-router-dom';
import {
    AppBar,
    Typography,
    Toolbar,
    // MenuItem,
    IconButton
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const NavBar = () => {
    const classes = useStyles();

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h4" className={ classes.title }>
                        michaelolson.blog
                    </Typography>
                    <IconButton edge="start" className={ classes.menuButton }  color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    {/* <MenuItem>
                        <NavLink to="/">
                            <Typography variant="h6">
                                Home
                            </Typography>
                        </NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink to="/categories">
                            <Typography variant="h6">
                                Categories
                            </Typography>
                        </NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink to="/contact">
                            <Typography variant="h6">
                                Contact
                            </Typography>
                        </NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink to="/donate">
                            <Typography variant="h6">
                                Donate
                            </Typography>
                        </NavLink> */}
                    {/* </MenuItem> */}
                    {/* <ul id="navbar-desktop-menu-list">
                        <NavLink className="navbar-desktop-menu-list-link" to="/">Home</NavLink>
                        <NavLink className="navbar-desktop-menu-list-link" to="/categories">Categories</NavLink>
                        <NavLink className="navbar-desktop-menu-list-link" to="/contact">Contact</NavLink>
                        <NavLink className="navbar-desktop-menu-list-link" to="/donate">Donate</NavLink>
                    </ul> */}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default NavBar