import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false
}

export const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_SUCCESS :
            const newOrder = {
                ...action.burgerData,
                id: action.id
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder)
            }
        case actionTypes.PURCHASE_BURGER_FAILED :
            return {
                ...state,
                loading: false
            }

        case actionTypes.PURCHASE_BURGER_START :
                return {
                    ...state,
                    loading: true
                }

        case actionTypes.FETCH_OREDR_INIT :
                    return {
                        ...state,
                        loading: true
                    }

        case actionTypes.FETCH_OREDR_SUCCESS :
                    return {
                        ...state,
                        loading: false,
                        orders: [...action.orders]
                    }

        case actionTypes.FETCH_OREDR_FAILED :
                        return {
                            ...state,
                            loading: false
                        }
        default :
        return state;
    }
}