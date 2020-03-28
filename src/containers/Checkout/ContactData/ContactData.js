import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CustomAxios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import withError from '../../../hoc/WithError/ErrorHandler';
import * as OrderBurgerAction from '../../../store/actions/order';

const styles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
});

class ContactData extends React.Component {

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }

  handleChange = (event, controlName) => {
    if(controlName === 'name'){
      this.setState({
        name: event.target.value
      });
    }
    if(controlName === 'email'){
      this.setState({
        email: event.target.value
      });
    }
    if(controlName === 'street'){
      this.setState({
        address: {
          ...this.state.address,
          'street': event.target.value
        }
      });
    }
    if(controlName === 'postal'){
      this.setState({
        address: {
          ...this.state.address,
          'postalCode': event.target.value
        }
      });
    }    
  };

  orderHandler = () => {
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: this.state.name,
        email: this.state.email,
        street: this.state.address.street,
        postal: this.state.address.postalCode,
      },
      deliverMode: 'fastest'
    }
    this.props.onOrderBurger(order);
    this.props.history.push('/');
  }

  render() {
    let { classes } = this.props;
    let form = (<form className={classes.root} noValidate autoComplete="off">
      <FormControl variant="outlined">
        <InputLabel htmlFor="Name">Name</InputLabel>
        <OutlinedInput id="Name" value={this.state.name} onChange={(event) => this.handleChange(event, 'name')} label="Name" />
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel htmlFor="Email">Email</InputLabel>
        <OutlinedInput id="Email" value={this.state.email} onChange={(event) => this.handleChange(event, 'email')} label="Email" />
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel htmlFor="street">Street</InputLabel>
        <OutlinedInput id="street" value={this.state.address.street} onChange={(event) => this.handleChange(event, 'street')} label="street" />
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel htmlFor="postal">Postal</InputLabel>
        <OutlinedInput id="postal" value={this.state.address.postalCode} onChange={(event) => this.handleChange(event, 'postal')} label="postal" />
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={this.orderHandler}
      >ORDER</Button>
    </form>);
    if (this.props.loading) {
      form = <Spinner></Spinner>;
    }
    return (
    <Box width="80%" position="center">
        <Typography variant="h4" gutterBottom>
          Please enter your contact data
        </Typography>
        {form}
      </Box>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerRed.ingredients,
    totalPrice: state.burgerRed.totalPrice,
    loading: state.orderRed.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) => dispatch(OrderBurgerAction.purchaseBurger(orderData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withError((withStyles(styles)(ContactData)), CustomAxios)));