import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './orderReducer';
import { ingredientDetailsReducer } from './ingredientDetails';
import { userReducer } from './user';
import { ws } from './ws';
import { TIngredients } from '../actions/ingredients';
import { TIngredientDetailsActions } from '../actions/ingredientDetails';
import { TOrderReducer } from '../actions/orderReducer';
import { TUser } from '../actions/user';
import { Tws } from '../actions/ws';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    ingredientDetails: ingredientDetailsReducer,
    user: userReducer,
    ws: ws
});

export type TApplicationActions = TIngredients | TIngredientDetailsActions | TOrderReducer | TUser | Tws;

export type RootState = ReturnType<typeof rootReducer>