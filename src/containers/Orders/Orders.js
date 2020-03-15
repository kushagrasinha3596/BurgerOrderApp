import React from 'react';
import Order from '../../components/Order/Order';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import withError from '../../hoc/WithError/ErrorHandler';
import customAxios from '../../axios-orders';
import * as orderAction from '../../store/actions/order';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

const styles = (theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
});

class Orders extends React.Component {

    componentDidMount() {
        this.props.fetchOrderDisp();
    }

    render() {
        let { classes } = this.props;
        let orders = <Spinner></Spinner>;
        if (!this.props.loading) {
            orders = this.props.orders.map((order) => (
                <Order
                    ingredients={order.ingredients}
                    price={+order.price}
                ></Order>
            ))
            orders = <List className={classes.root}>{orders}</List>
        }
        return(
            orders
        )   
    }
    
}

const mapStateToProps = (state) => {
    return {
        orders: state.orderRed.orders,
        loading: state.orderRed.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrderDisp: () => dispatch(orderAction.fetchOrder())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withError(Orders, customAxios)));