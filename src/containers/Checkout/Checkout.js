import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Box from '@material-ui/core/Box';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';

class Checkout extends React.Component{

    state = {
        ingredients: {
            salad: 1,
            meat:1, 
            cheese: 1,
            bacon:1
        }
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for(let searchParam of query.entries()){
            ingredients[searchParam[0]] = +searchParam[1];
        }
        debugger
        this.setState({
            ingredients: ingredients
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
            <div>
                <CheckoutSummary 
                checkoutCancelled = {this.checkoutCancelledHandler}
                checkoutContinued = {this.checkoutContinuedHandler}
                ingredients={this.state.ingredients}/>
                <Route 
                path={this.props.match.path + '/contact-data'} 
               component = {ContactData}/>
            </div>
        ) 
    }
}

export default Checkout;