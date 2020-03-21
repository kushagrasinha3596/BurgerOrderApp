import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import * as actions from '../../store/actions/auth'; 
import { connect } from 'react-redux';

const styles = (theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
});

class Auth extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (event, type) => {
        if(type === 'Email'){
            this.setState({
                email: event.target.value
            });
        }else if(type === 'Password'){
            this.setState({
                password: event.target.value
            }); 
        }
    }

    submitHandler = () => {
        this.props.onSubmit(this.state.email, this.state.password);
    }

    render() {
        const {classes} = this.props;
        return (
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        value={this.state.email}
                        onChange={(event) => this.handleChange(event, 'Email')}
                        variant="outlined"
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        value={this.state.password}
                        onChange={(event) => this.handleChange(event, 'Password')}
                        variant="outlined"
                    />
                </div>
                <Button
                            variant="contained"
                            onClick={this.submitHandler}>Submit</Button>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (email, password) => dispatch(actions.auth(email, password))
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Auth));