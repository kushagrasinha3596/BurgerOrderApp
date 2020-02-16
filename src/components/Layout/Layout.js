import React from 'react';
import classes from './Layout.css';
import AppBar from '../Navigation/Appbar/Appbar';
import Logo from '../Logo/Logo';

const layout = (props) => (
    <React.Fragment>
        <Logo></Logo>
        <AppBar></AppBar>
    <main className={classes.Content}>
        {props.children}
    </main>
    </React.Fragment>
)

export default layout;