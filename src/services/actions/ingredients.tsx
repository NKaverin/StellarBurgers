import axios from "axios";
import { api, checkResponse } from "../../utils/constants";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

function getIngredientsRequest() {
    return {
        type: GET_INGREDIENTS_REQUEST, 
    }
}
function getIngredientsSuccess(ingredients) {
    return {
        type: GET_INGREDIENTS_SUCCESS, 
        ingredients
    }
}

function getIngredientsFailed() {
    return {
        type: GET_INGREDIENTS_FAILED, 
    }
}


export function getIngredients(dispatch) {  
    try {
        dispatch(getIngredientsRequest);
        return fetch(api + 'ingredients')
        .then(checkResponse) 
        .then(json => {
            dispatch(getIngredientsSuccess(json.data));                      
        })        
    }    
    catch(error: any) {
        dispatch(getIngredientsFailed);
    }
}