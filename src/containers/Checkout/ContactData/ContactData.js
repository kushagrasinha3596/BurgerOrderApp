import React from 'react';
import Typography from '@material-ui/core/Typography';
import {fade, withStyles} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const styles = (theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
      }
  });

  const BootstrapInput = withStyles(theme => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 16,
      width: 'auto',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }))(InputBase);

class ContactData extends React.Component {

    state = {
        username: '',
        email: '',
        adress: {
            street: '',
            postalcode: ''
        }
    }

    render() {
        let {classes} = this.props;
        return (
            <Box width="80%" position="center">
                <Typography variant="h4" gutterBottom>
                    Please enter your contact data
                </Typography>
                <form className={classes.root} noValidate>
                <FormControl className={classes.margin}>
                <InputLabel shrink htmlFor="name">Name</InputLabel>
                <BootstrapInput defaultValue="Name" id="name" />
                <InputLabel shrink htmlFor="email">Email</InputLabel>
                <BootstrapInput defaultValue="Email" id="email" />
                <InputLabel shrink htmlFor="street">Street</InputLabel>
                <BootstrapInput defaultValue="Street" id="street" />
                <InputLabel shrink htmlFor="postalcode">Postal Code</InputLabel>
                <BootstrapInput defaultValue="Postal Code" id="postalcode" />
                </FormControl>
                <Button 
                    variant="contained" 
                    color="primary"
                    className={classes.button}
                    >ORDER</Button>
                </form>
            </Box>
        )
    }
}

export default withStyles(styles)(ContactData);