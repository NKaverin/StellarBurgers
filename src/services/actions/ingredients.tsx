import { api, checkResponse } from "../../utils/constants";
import { TElement } from "../../utils/types";

export const GET_INGREDIENTS_REQUEST : 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS : 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED : 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export interface IgetIngredientsRequest {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IgetIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: TElement[];
}

export interface IgetIngredientsFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredients = IgetIngredientsRequest | IgetIngredientsSuccess | IgetIngredientsFailed;

function getIngredientsRequest() : IgetIngredientsRequest {
    return {
        type: GET_INGREDIENTS_REQUEST, 
    }
}

function getIngredientsSuccess(ingredients : TElement[]) : IgetIngredientsSuccess {
    return {
        type: GET_INGREDIENTS_SUCCESS, 
        ingredients
    }
}

function getIngredientsFailed() : IgetIngredientsFailed{
    return {
        type: GET_INGREDIENTS_FAILED, 
    }
}


export function getIngredients(dispatch : AppThunk) {  
    try {
        dispatch(getIngredientsRequest());
        return fetch(api + 'ingredients')
        .then(checkResponse) 
        .then(json => {
            dispatch(getIngredientsSuccess(json.data));                      
        })        
    }    
    catch(error: unknown) {
        dispatch(getIngredientsFailed());
    }
}