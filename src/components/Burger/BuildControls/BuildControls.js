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
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' }
];

const buildControls = (props) => {
    const muiClasses = useStyles();
    return (
        <div className={classes.BuildControls}>
            <Grid style={{
                justifyContent:'space-between'
            }} container>
                <Grid item>
                    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
                </Grid>
                {controls.map((control) => {
                    return <Grid item key={control.label}>
                        <BuildControl
                            added={() => props.ingredientAdded(control.type)}
                            label={control.type}
                            toDisable={props.toDisable[control.type]}
                            deleted={() => props.removeIngredient(control.type)}></BuildControl>
                    </Grid>
                })}
                <Grid item>
                    <div className={muiClasses.root}>
                        <Button
                            variant="contained"
                            onClick={props.purchase}
                            disabled={!props.purchaseable}>CONTINUE</Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default buildControls;