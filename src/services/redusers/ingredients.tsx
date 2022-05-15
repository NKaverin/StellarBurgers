import { TElement } from '../../utils/types';
import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, TIngredients } from '../actions/ingredients';

interface IInitialState {
    loading: boolean,
    items: TElement[]
}

const initialState : IInitialState = {
    loading: false,
    items: []
};

export const ingredientsReducer = (state : IInitialState = initialState, action : TIngredients) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                loading: true    
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                loading: false,
                items: action.ingredients
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                loading: false    
            };
        }
        default: return state;
    }
}

