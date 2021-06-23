import React from 'react';
import { NavLink } from 'react-router-dom';
import { Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    paper: {
        margin: '30px',
        color: '#fff',
        padding: '30px',
        textAlign: 'center',
        width: '250px',
        height: '250px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        textDecoration: 'none'
    }
}));

const Category = props => {
    const classes = useStyles();

    return (
        <Paper component={NavLink} to={`/categories/${encodeURIComponent(props.category.title)}`} elevation={3} className={classes.paper}>
            <img className="category-image" src={`data:image/png;base64,${props.category.image}`} />
            <Typography >{props.category.title}</Typography>
        </Paper>
    )
}

export default Category;