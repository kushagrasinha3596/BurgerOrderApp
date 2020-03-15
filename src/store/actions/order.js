import * as actionTypes from './actionTypes';
import CustomAxios from '../../axios-orders';

export const burgerPurchaseSuccess = (id, burgerData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        burgerData: burgerData
    }
}

export const burgerPurchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const burgerPurchaseFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

export const purchaseBurger = (orderData) => {
    return (dispatch) => {
    dispatch(burgerPurchaseStart());
    CustomAxios.post('/orders.json', orderData)
      .then((response) => {
          debugger
        dispatch(burgerPurchaseSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(burgerPurchaseFailed(error));
      });
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_OREDR_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFailed = (error) => {
    return {
        type: actionTypes.FETCH_OREDR_FAILED,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_OREDR_INIT
    }
}

export const fetchOrder = () => {
    debugger
    return (dispatch) => {
        dispatch(fetchOrderStart());
        CustomAxios.get('/orders.json')
        .then((res) => {
            const fetchedOrders = [];
                for(let orderKey in res.data){
                    fetchedOrders.push({
                        ...res.data[orderKey],
                        id: orderKey
                    });
                }
                dispatch(fetchOrderSuccess(fetchedOrders));
        })
        .catch((error) => {
            console.log("Error in fetching orders ", error);
            dispatch(fetchOrderFailed(error));
        });
    }
}