import { TElement } from '../../utils/types';
import { SHOW_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS, TIngredientDetailsActions } from '../actions/ingredientDetails';

interface IInitialState {
    ingredient: null | TElement
}

const initialState : IInitialState = {
    ingredient: null
}

export const ingredientDetailsReducer = (state : IInitialState = initialState, action : TIngredientDetailsActions) : IInitialState => {
    switch (action.type) {
        case SHOW_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredient: action.ingredient
            }
        }
        case CLOSE_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredient: null
            }
        }
        default: return state;
    }
}