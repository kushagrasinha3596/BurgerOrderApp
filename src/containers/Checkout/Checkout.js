import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Box from '@material-ui/core/Box';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';

class Checkout extends React.Component{

    state = {
        ingredients: {
            salad: 0,
            meat:0, 
            cheese: 0,
            bacon:0
        },
        price:0
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for(let searchParam of query.entries()){
            if(searchParam[0] === "price"){
                totalPrice = searchParam[1];
            }else{
                ingredients[searchParam[0]] = +searchParam[1];
            }
        }
        this.setState({
            ingredients: ingredients,
            totalPrice: totalPrice
        });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }
    render() {
        return (
            <Box>
                <CheckoutSummary 
                checkoutCancelled = {this.checkoutCancelledHandler}
                checkoutContinued = {this.checkoutContinuedHandler}
                ingredients={this.state.ingredients}/>
                <Route 
                path={this.props.match.path + '/contact-data'} 
                render={() => (<ContactData totalPrice={this.state.totalPrice} ingredients={this.state.ingredients}/>)}
                />
            </Box>
        ) 
    }
}

export default Checkout;