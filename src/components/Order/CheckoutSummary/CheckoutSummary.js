import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Burger from '../../Burger/Burger';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const checkoutSummary = (props) => {
  debugger
  const classes = useStyles();

  const checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  const checkoutContinuedHandler = () => {
    this.props.history.push('/checkout/contact-data');
  }
  return (
    <Box textAlign="center" width={1}>
      <h1>Hope it tastes well!!!</h1>
      <Burger ingredients={props.ingredients} />
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={props.checkoutCancelled}>CANCEL</Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={props.checkoutContinued}>CONTINUE</Button>
    </Box>
  )
}

export default checkoutSummary;