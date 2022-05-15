import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './orderReducer';
import { ingredientDetailsReducer } from './ingredientDetails';
import { userReducer } from './user';
import { ws } from './ws';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    ingredientDetails: ingredientDetailsReducer,
    user: userReducer,
    ws: ws
});

export type RootState = ReturnType<typeof rootReducer>