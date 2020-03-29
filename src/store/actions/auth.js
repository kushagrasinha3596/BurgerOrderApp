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
        token: authData.idToken,
        userId: authData.localId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const expirationTime = (expTime) => {
    debugger
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expTime*1000);
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
            dispatch(authSuccess(response.data));
            dispatch(expirationTime(response.data.expiresIn));
        })
        .catch((error)=> {
            dispatch(authFail(error.response.data.error));
        })
    }
}

