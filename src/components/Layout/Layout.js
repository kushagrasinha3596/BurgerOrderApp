import React from 'react';
import classes from './Layout.css';
import Logo from '../Logo/Logo';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => (
    <React.Fragment>
       <Logo></Logo>
        <SideDrawer></SideDrawer>
    <main className={classes.Content}>
        {props.children}
    </main>
    </React.Fragment>
)

export default layout;