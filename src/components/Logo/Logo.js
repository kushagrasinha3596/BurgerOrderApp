import React from 'react';
import BurgerLogo from '../../assets/images/burgerLogo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={BurgerLogo} alt="myBurger Logo"></img>
    </div>
)

export default logo;