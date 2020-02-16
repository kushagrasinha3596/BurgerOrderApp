import React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends React.Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false
    }

    updatePurchaseable = (updatedIngredient) => {
        let tempState = {...updatedIngredient};
        const sum = Object.keys(tempState).map((key) => {
            return tempState[key];
        }).reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        },0);
        debugger
        this.setState({
            purchaseable: (sum > 0) ? true : false
        });
    }

    addIngredient = (type) => {
        let oldCount = this.state.ingredients[type];
        let newCount = oldCount+1;
        let updatedIngredient = {...this.state.ingredients};
        updatedIngredient[type] = newCount;
        let priceAddition = INGREDIENT_PRICE[type];
        let oldPrice = this.state.totalPrice;
        let updatedPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updatedIngredient,
            totalPrice: updatedPrice
        });
        this.updatePurchaseable(updatedIngredient);
    }

    removeIngredient = (type) => {
        let oldCount = this.state.ingredients[type];
        let newCount = oldCount-1;
        if(newCount >= 0){
        let updatedIngredient = {...this.state.ingredients};
        updatedIngredient[type] = newCount;
        let priceReduction = INGREDIENT_PRICE[type];
        let oldPrice = this.state.totalPrice;
        let updatedPrice = oldPrice - priceReduction;
        this.setState({
            ingredients: updatedIngredient,
            totalPrice: updatedPrice
        });
        this.updatePurchaseable(updatedIngredient);
    }
    }

    render() {
        let disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] <= 0 ? disabledInfo[key] = true : disabledInfo[key] = false;
        }
        return (
            <React.Fragment>
                <Modal>
                    <OrderSummary ingredients={this.state.ingredients}></OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls 
                ingredientAdded={this.addIngredient}
                removeIngredient={this.removeIngredient}
                toDisable={disabledInfo}
                price={this.state.totalPrice}
                purchaseable={this.state.purchaseable}></BuildControls>
            </React.Fragment>
        )
    }
}

export default BurgerBuilder;