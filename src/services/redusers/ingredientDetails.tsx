import { SHOW_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from '../actions/ingredientDetails';

const initialState = {
    ingredient: false
}

export const ingredientDetailsReducer = (state = initialState, action) => {
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
                ingredient: false
            }
        }
        default: return state;
    }
}