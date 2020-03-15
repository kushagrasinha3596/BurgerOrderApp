import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Box from '@material-ui/core/Box';
import ContactData from './ContactData/ContactData';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends React.Component{
    

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }
    render() {
        let displayContent = <Redirect to="/"/>;
        if(this.props.location.pathname.indexOf('/contact-data') >= 0){
            displayContent = null;
        }
        else if(this.props.ingredients){
            displayContent = <CheckoutSummary 
            checkoutCancelled = {this.checkoutCancelledHandler}
            checkoutContinued = {this.checkoutContinuedHandler}
            ingredients={this.props.ingredients}/>;
        }
        return (
            <Box>
                {displayContent}
                <Route 
                path={this.props.match.path + '/contact-data'} 
                component={ContactData}
                />
            </Box>
        ) 
    }
}

const matchStateToProps = (state) => {
    return {
        ingredients: state.burgerRed.ingredients
    }
}

export default connect(matchStateToProps)(Checkout);