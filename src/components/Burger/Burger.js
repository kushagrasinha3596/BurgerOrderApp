import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedBurger = Object.keys(props.ingredients).map((ingredient, index) => {
        return [...Array(props.ingredients[ingredient])].map((_) => {
            return <BurgerIngredient key={index} type={ingredient}></BurgerIngredient>
        });
    }).reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue);
    },[]);

    if(transformedBurger.length === 0){
        transformedBurger = <p className={classes.initialText}>Please start adding some ingredients</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="burger-top"></BurgerIngredient>
            {transformedBurger}
            <BurgerIngredient type="burger-bottom"></BurgerIngredient>
        </div>
    );
}

export default burger;