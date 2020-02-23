import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            backgroundColor: '#A0DB41',
        border: '1px solid #966909',
        color: '#966909'
        },
    }
}));

const controls = [
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Meat', type:'meat'},
    {label: 'Cheese', type:'cheese'}
];

const buildControls = (props) => {
     const muiClasses = useStyles();
    return (
        <Grid item>
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
        <div className={muiClasses.root}>
        <Button 
                variant="contained" 
                onClick={props.purchase}
                disabled={!props.purchaseable}>CONTINUE</Button>
                </div>
    </div>
    </Grid>
    )
}

export default buildControls;