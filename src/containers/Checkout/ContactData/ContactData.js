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
    },
    loading: false
  }

  handleChange = (event) => {
    this.setState({
      name: event.target.value
    });
  };

  orderHandler = () => {
    this.setState({
      loading: true
    });

    const order = {
      ingredients: this.props.ingredients,
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
        console.log(this.props);
        this.setState({
          loading: false
        });
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false
        });
      });
  }

  render() {
    let { classes } = this.props;
    let form = (<form className={classes.root} noValidate autoComplete="off">
      <FormControl variant="outlined">
        <InputLabel htmlFor="Name">Name</InputLabel>
        <OutlinedInput id="Name" value={this.state.name} onChange={this.handleChange} label="Name" />
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel htmlFor="Email">Email</InputLabel>
        <OutlinedInput id="Email" value={this.state.email} onChange={this.handleChange} label="Email" />
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel htmlFor="street">Street</InputLabel>
        <OutlinedInput id="street" value={this.state.address.street} onChange={this.handleChange} label="street" />
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel htmlFor="postal">Postal</InputLabel>
        <OutlinedInput id="postal" value={this.state.address.postalCode} onChange={this.handleChange} label="postal" />
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={this.orderHandler}
      >ORDER</Button>
    </form>);
    if (this.state.loading) {
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

export default withRouter(withStyles(styles)(ContactData));