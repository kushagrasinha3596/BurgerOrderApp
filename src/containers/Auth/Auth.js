import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../../store/actions/auth';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Spinner from '../../components/UI/Spinner/Spinner';

const styles = (theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
});

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.linkedin.com/in/kushagrasinha3596">
                Kushagra Sinha
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

class Auth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            signUp: true
        }
    }

    handleChange = (event, type) =>{
        if (type === 'Email') {
            this.setState({
                email: event.target.value
            });
        } else if (type === 'Password') {
            this.setState({
                password: event.target.value
            });
        }
    }

    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onSubmit(this.state.email, this.state.password, this.state.signUp);
    }

    changeMode = () =>{
        this.setState((prevState) => {
            return {signUp: !prevState.signUp}
        });
    }

    render() {
        const { classes } = this.props;

        let userContainer = <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {this.state.signUp? "Sign Up": "Sign In" }
</Typography>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email Address"
                    id="email"
                    value={this.state.email}
                    onChange={(event) => this.handleChange(event, 'Email')}
                    autoComplete="email"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(event) => this.handleChange(event, 'Password')}
                    autoComplete="current-password"
                />
                    {
                            this.state.signUp ?
                            <Button 
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={this.submitHandler}
                            className={classes.submit}>
                            Sign Up
                            </Button>:
                            <Button 
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={this.submitHandler}
                            className={classes.submit}>
                            Sign In
                            </Button>
                        }
                <Grid justify="center" container>
                    <Grid item>
                        {
                            this.state.signUp ?
                            <Button 
                            href="#" 
                            variant="contained"
                            color="primary"
                            onClick={this.changeMode}>
                            Already have account? Sign In
                            </Button>:
                            <Button 
                            href="#" 
                            variant="contained"
                            color="primary"
                            onClick={this.changeMode}>
                            Don't have account? Sign Up
                        </Button>
                        }
                    </Grid>
                </Grid>
            </form>
        </div>
        <Box mt={8}>
            <Copyright />
        </Box>
    </Container>

    if(this.props.rLoader){
        userContainer = <Spinner/>
    }

    let error = null;

    if(this.props.rError){
        error = <Box>
           { this.props.rError.message } 
        </Box>
    }
        return (
            <React.Fragment>
                { error }
                { userContainer }
            </React.Fragment>
        );
    }
}

const matStateToProps = (state) => {
    return {
        rLoader: state.authRed.loader,
        rError:  state.authRed.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (email, password, signUp) => dispatch(actions.auth(email, password, signUp))
    }
}

export default connect(matStateToProps, mapDispatchToProps)(withStyles(styles)(Auth));