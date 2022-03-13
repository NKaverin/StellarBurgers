import axios from "axios";

export const ADD_TO_ORDER = 'ADD_TO_ORDER';
export const REMOVE_FROM_ORDER = 'REMOVE_FROM_ORDER';
export const REORDER_ITEMS = 'REORDER_ITEMS';
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

const api = 'https://norma.nomoreparties.space/api/';

export async function postOrder(dispatch, dataForOrder) {
    dispatch({ type: 'POST_ORDER_REQUEST'})
    try {
        
        const response = await axios.post(api + 'orders', {ingredients: dataForOrder})
        console.log(response)
        dispatch({ type: 'POST_ORDER_SUCCESS', order: response.data.order })
    }
    catch (e) {
        dispatch({ type: 'POST_ORDER_FAILED'})
    }
}