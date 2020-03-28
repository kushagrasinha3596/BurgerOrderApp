import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, signUp) => {
    return (dispatch) => {
        dispatch(authStart());
        let targetURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCvJ7RjNyH92MPwllMd5jxhF4Ci2OFx8vw';
        if(!signUp){
            targetURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCvJ7RjNyH92MPwllMd5jxhF4Ci2OFx8vw';
        }
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post(targetURL, authData)
        .then((response) => {
            debugger
            dispatch(authSuccess(response.data));
        })
        .catch((error)=> {
            debugger
            dispatch(authFail(error));
        })
    }
}

