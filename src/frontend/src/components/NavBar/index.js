import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    AppBar,
    Typography,
    Toolbar,
    List,
    Drawer,
    ListItem,
    IconButton,
    makeStyles,
    ListItemText
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 270,
    }
}));

const NavBar = () => {
    const classes = useStyles();
    const [toggle, setToggle] = useState(false);
    const anchor = "right";

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h4" className={ classes.title }>
                        michaelolson.blog
                    </Typography>
                    <IconButton 
                        onClick={ () => setToggle(true) }
                        edge="start"
                        className={ classes.menuButton }
                        color="inherit"
                        aria-label="menu">
                            <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor={anchor} open={toggle} onClose={ () => setToggle(false) }>
                <div
                    className={ classes.list }
                    role="presentation"
                    onClick={ () => setToggle(false) }
                    onKeyDown={ () => setToggle(false) }
                >
                    <List>
                        <ListItem 
                            button
                            key="Home"
                            component={ NavLink }
                            to="/"
                        >
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem 
                            button
                            key="Categories"
                            component={ NavLink }
                            to="/categories"
                        >
                            <ListItemText primary="Categories" />
                        </ListItem>
                        <ListItem 
                            button
                            key="Contact"
                            component={ NavLink }
                            to="/contact"
                        >
                            <ListItemText primary="Contact" />
                        </ListItem>
                        <ListItem 
                            button
                            key="Donate"
                            component={ NavLink }
                            to="/donate"
                        >
                            <ListItemText primary="Donate" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </>
    );
};

export default NavBar
