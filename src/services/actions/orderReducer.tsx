import axios from "axios";
import { api, checkResponse } from "../../utils/constants";

export const ADD_TO_ORDER = 'ADD_TO_ORDER';
export const REMOVE_FROM_ORDER = 'REMOVE_FROM_ORDER';
export const REORDER_ITEMS = 'REORDER_ITEMS';
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

function postOrderRequest() {
    return {
        type: POST_ORDER_REQUEST, 
    }
}
function postOrderSuccess(order) {
    return {
        type: POST_ORDER_SUCCESS, 
        order
    }
}

function postOrderFailed() {
    return {
        type: POST_ORDER_FAILED, 
    }
}

export function addToOrder(element) {
    return {
        type: ADD_TO_ORDER, 
        element
    }
}

export function removeFromOrder(element) {
    return {
        type: REMOVE_FROM_ORDER, 
        element
    }
}

export function reorderItems(dragIndex, hoverIndex) {
    return {
        type: REORDER_ITEMS, 
        dragIndex,
        hoverIndex
    }
}

export function postOrder(dataForOrder) {
    return async (dispatch) => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "ingredients": dataForOrder })
        }  
        try {
            dispatch(postOrderRequest);
            return fetch(api + 'orders', options)
            .then(checkResponse) 
            .then(json => {
                dispatch(postOrderSuccess(json.order.number));                      
            })        
        }    
        catch(error: any) {
            dispatch(postOrderFailed);
        }
    };
}

