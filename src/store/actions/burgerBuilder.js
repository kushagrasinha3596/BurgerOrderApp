import * as actionTypes from './actionTypes';
import CustomAxios from '../../axios-orders';

export const onIngredientAdded = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const onIngredientRemoved = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

export const fetchIngredients = (ingredients) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const fetchIngredientsRequest = () => {
   return  (dispatch) => CustomAxios.get('https://burgerbuilder-ea448.firebaseio.com/ingredients.json')
        .then((response)=> {
            dispatch(fetchIngredients(response.data));
        })
        .catch((error) => {
            console.log("Error ocurred in fetching data ", error);
            dispatch(fetchIngredientsFailed());
        });
}