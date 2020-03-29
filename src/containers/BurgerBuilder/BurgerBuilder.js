import React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import CustomAxios from '../../axios-orders';
import Loader from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/WithError/ErrorHandler';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/burgerBuilder';



class BurgerBuilder extends React.Component {

    state = {
        purchasing: false,
        error: false
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }

    updatePurchaseable = (updatedIngredient) => {
        let tempState = {...updatedIngredient};
        const sum = Object.keys(tempState).map((key) => {
            return tempState[key];
        }).reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        },0);
        return sum > 0;
    }

    onPurchasing = () => {
        if(this.props.isAuthenticated){
            this.setState({
                purchasing: true
            });
        }else{
            this.props.history.push('/auth');
        }
        
    }

    // addIngredient = (type) => {
    //     let oldCount = this.props.rIngredients[type];
    //     let newCount = oldCount+1;
    //     let updatedIngredient = {...this.props.rIngredients};
    //     updatedIngredient[type] = newCount;
    //     let priceAddition = INGREDIENT_PRICE[type];
    //     let oldPrice = this.state.totalPrice;
    //     let updatedPrice = oldPrice + priceAddition;
    //     this.setState({
    //         ingredients: updatedIngredient,
    //         totalPrice: updatedPrice
    //     });
    //     this.updatePurchaseable(updatedIngredient);
    // }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    // removeIngredient = (type) => {
    //     let oldCount = this.props.rIngredients[type];
    //     let newCount = oldCount-1;
    //     if(newCount >= 0){
    //     let updatedIngredient = {...this.props.rIngredients};
    //     updatedIngredient[type] = newCount;
    //     let priceReduction = INGREDIENT_PRICE[type];
    //     let oldPrice = this.state.totalPrice;
    //     let updatedPrice = oldPrice - priceReduction;
    //     this.setState({
    //         ingredients: updatedIngredient,
    //         totalPrice: updatedPrice
    //     });
    //     this.updatePurchaseable(updatedIngredient);
    // }
    // }

    render() {
        let disabledInfo = {...this.props.rIngredients};
        for(let key in disabledInfo){
            disabledInfo[key] <= 0 ? disabledInfo[key] = true : disabledInfo[key] = false;
        }

        let ordersummary = null;
        if(!this.props.rIngredients){
            ordersummary = this.props.rError ? 
           
            <Typography variant="h3" gutterBottom>
            Sorry! Can't Load Ingredients...
          </Typography> : <Loader/>;
        }else{
            ordersummary = <OrderSummary 
            ingredients={this.props.rIngredients}
            orderSummaryShow={this.state.purchasing}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.props.rTotalPrice}></OrderSummary>
        }

        let burger = this.props.rError ? 
      
        <Typography variant="h3" gutterBottom>
            Sorry! Can't Load Ingredients...
          </Typography> : <Loader/>;
        if(this.props.rIngredients){
            burger = <Burger ingredients={this.props.rIngredients}></Burger>;
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
                isAuthenticated={this.props.rIsAuthenticated}
                error = {this.props.rError.message}
                ingredientAdded={this.props.onIngredientAdded}
                removeIngredient={this.props.onIngredientRemoved}
                toDisable={disabledInfo}
                price={this.props.rTotalPrice}
                purchaseable={this.updatePurchaseable(this.props.rIngredients)}
                purchase={this.onPurchasing}></BuildControls>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rIngredients: state.burgerRed.ingredients,
        rTotalPrice: state.burgerRed.totalPrice,
        rError: state.burgerRed.error,
        rIsAuthenticated: state.authRed.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => {
            dispatch(burgerBuilderActions.onIngredientAdded(ingName));
        },
        onIngredientRemoved: (ingName) => {
            dispatch(burgerBuilderActions.onIngredientRemoved(ingName));
        },
        onInitIngredients: () => {
            dispatch(burgerBuilderActions.fetchIngredientsRequest());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, CustomAxios));