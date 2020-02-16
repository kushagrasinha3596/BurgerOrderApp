import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Meat', type:'meat'},
    {label: 'Cheese', type:'cheese'}
];

const buildControls = (props) => {
    return (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((control) => {
            return <BuildControl 
            added={() => props.ingredientAdded(control.type)} 
            key={control.label} 
            label={control.type}
            toDisable={props.toDisable[control.type]}
            deleted={() => props.removeIngredient(control.type)}></BuildControl>
        })}
        <button disabled={!props.purchaseable} className={classes.OrderButton}>ORDER NOW</button>
    </div>
    )
}

export default buildControls;