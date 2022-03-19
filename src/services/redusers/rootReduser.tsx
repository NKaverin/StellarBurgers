import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './orderReducer';
import { ingredientDetailsReducer } from './ingredientDetails';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    ingredientDetails: ingredientDetailsReducer
});

export type RootState = ReturnType<typeof rootReducer>