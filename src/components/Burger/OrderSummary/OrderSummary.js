import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const orderSummary = (props) => {
    const classes = useStyles();
    const ingredientSummary = Object.keys(props.ingredients).map((ing) => {
        return <li key={ing}><span
            style={{ textTransform: 'capitalize' }}>
            {ing}</span>: {props.ingredients[ing]}
        </li>
    });
    return (
        <React.Fragment>
            <h2>Your Order</h2>
            <p>A delicious burger with following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <div className={classes.root}>
                <Button 
                variant="contained" 
                color="primary"
                onClick={props.purchaseContinued}>CONTINUE</Button>
                <Button 
                variant="contained" 
                color="secondary"
                onClick={props.purchaseCancelled}>CANCEL</Button>
            </div>
        </React.Fragment>
    )
};

export default orderSummary;