import React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import CustomAxios from '../../axios-orders';
import Loader from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/WithError/ErrorHandler';

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends React.Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        CustomAxios.get('https://burgerbuilder-ea448.firebaseio.com/ingredients.json')
        .then((response)=> {
            this.setState({
                ingredients: response.data
            });
        })
        .catch((error) => {
            this.setState({
                loading: false,
                error: true
            });
            console.log("Error ocurred in fetching data ", error);
        });
    }

    updatePurchaseable = (updatedIngredient) => {
        let tempState = {...updatedIngredient};
        const sum = Object.keys(tempState).map((key) => {
            return tempState[key];
        }).reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        },0);
        this.setState({
            purchaseable: (sum > 0) ? true : false
        });
    }

    onPurchasing = () => {
        this.setState({
            purchasing: true
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

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Kushagra Sinha',
                address: 'Gaur City'
            },
            deliverMode: 'fastest'
        }
        CustomAxios.post('/orders.json', order)
        .then((response) => {
            console.log(response);
            this.setState({
                loading: false,
                purchasing: false
            });
        })
        .catch((error) => {
            console.log(error);
            this.setState({
                loading: false,
                purchasing: false
            });
        });

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

        let ordersummary = null;
        if(this.state.loading || !this.state.ingredients){
            ordersummary = this.state.error ? <p>Sorry! Can't Load Ingredients...</p> : <Loader/>;
        }else{
            ordersummary = <OrderSummary 
            ingredients={this.state.ingredients}
            orderSummaryShow={this.state.purchasing}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}></OrderSummary>
        }

        let burger = this.state.error ? <p>Sorry! Can't Load Ingredients...</p> : <Loader/>;
        if(this.state.ingredients){
            burger = <Burger ingredients={this.state.ingredients}></Burger>;
        }

        return (
            <React.Fragment>
                <Modal 
                show={this.state.purchasing} 
                modalClosed={this.purchaseCancelHandler}>
                    {ordersummary}
                </Modal>
                {burger}
                <BuildControls 
                ingredientAdded={this.addIngredient}
                removeIngredient={this.removeIngredient}
                toDisable={disabledInfo}
                price={this.state.totalPrice}
                purchaseable={this.state.purchaseable}
                purchase={this.onPurchasing}></BuildControls>
            </React.Fragment>
        )
    }
}


export default ErrorHandler(BurgerBuilder, CustomAxios);