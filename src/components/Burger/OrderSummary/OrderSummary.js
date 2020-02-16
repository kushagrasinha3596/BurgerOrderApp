import React from 'react';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map((ing) => {
        debugger
        return <li key={ing}><span 
        style={{textTransform: 'capitalize'}}>
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
        <p>Continue to checkout?</p>
    </React.Fragment>
    )
};

export default orderSummary;