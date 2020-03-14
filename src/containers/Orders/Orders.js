import React from 'react';
import Order from '../../components/Order/Order';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import CustomAxios from '../../axios-orders';
import withError from '../../hoc/WithError/ErrorHandler';
import customAxios from '../../axios-orders';

const styles = (theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    }
  });

class Orders extends React.Component{

    state = {
        fetchedOrders: [],
        loading: false
    }

    componentDidMount(){
        this.setState({
            loading: true
        });
        CustomAxios.get('/orders.json')
        .then((res) => {
            const fetchedOrders = [];
                for(let orderKey in res.data){
                    fetchedOrders.push({
                        ...res.data[orderKey],
                        id: orderKey
                    });
                }
                this.setState({
                    fetchedOrders : fetchedOrders,
                    loading: false
                });
        })
        .catch((error) => {
            this.setState({
                loading: false
            });
            console.log("Error in fetching orders ", error);
        });
    }

    render() {
        let {classes} = this.props;
        debugger
        return (
            <List className={classes.root}>
                {
                    this.state.fetchedOrders.map((order) => (
                        <Order
                         ingredients = {order.ingredients}
                         price = {+order.price}
                        ></Order>
                    ))
                }
            </List>
        );
    }
}

export default withStyles(styles)(withError(Orders, customAxios));