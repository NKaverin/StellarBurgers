import axios from "axios";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
const api = 'https://norma.nomoreparties.space/api/';

export async function getIngredients(dispatch) {
    dispatch({ type: 'GET_INGREDIENTS_REQUEST'})
    try {
        const response = await axios.get(api + 'ingredients')
        dispatch({ type: 'GET_INGREDIENTS_SUCCESS', ingredients: response.data.data })
    }
    catch (e) {
        dispatch({ type: 'GET_INGREDIENTS_FAILED'})
    }
}