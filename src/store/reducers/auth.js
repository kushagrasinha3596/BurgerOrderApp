import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loader: false,
    token: null,
    userId: null,
    error: null
}

export const authReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START :
            return {
                ...state,
                loader: true,
                error: null
     
           }

        case actionTypes.AUTH_SUCCESS :
            return {
                ...state,
                loader: false,
                error: null,
                token: action.token,
                userId: action.userId
            }

        case actionTypes.AUTH_FAIL : 
        return {
            ...state,
            error: action.error,
            loader: false
        }

        case actionTypes.AUTH_LOGOUT : 
        return {
            ...state,
            error: null,
            token: null,
            userId: null,
            loader: false
        }

        default: return state;
    }

}