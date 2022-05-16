import { api, checkResponse } from "../../utils/constants";
import { TElement } from "../../utils/types";
import { getCookie } from "./user";

export const ADD_TO_ORDER : 'ADD_TO_ORDER' = 'ADD_TO_ORDER';
export const REMOVE_FROM_ORDER : 'REMOVE_FROM_ORDER' = 'REMOVE_FROM_ORDER';
export const REORDER_ITEMS : 'REORDER_ITEMS' = 'REORDER_ITEMS';
export const POST_ORDER_REQUEST : 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS : 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED : 'POST_ORDER_FAILED' = 'POST_ORDER_FAILED';
export const POST_ORDER_CLOSE : 'POST_ORDER_CLOSE' = 'POST_ORDER_CLOSE';

export interface IpostOrderRequest{
    readonly type: typeof POST_ORDER_REQUEST;
}

export interface IpostOrderSuccess {
    readonly type: typeof POST_ORDER_SUCCESS;
    readonly order: number;
}

export interface IpostOrderClose {
    readonly type: typeof POST_ORDER_CLOSE;
}

export interface IpostOrderFailed {
    readonly type: typeof POST_ORDER_FAILED;
}

export interface IaddToOrder {
    readonly type: typeof ADD_TO_ORDER;
    readonly element: TElement;
}

export interface IremoveFromOrder {
    readonly type: typeof REMOVE_FROM_ORDER;
    readonly element: TElement
}

export interface IreorderItems {
    readonly type: typeof REORDER_ITEMS;
    readonly dragIndex: number;
    readonly hoverIndex: number;
}

export type TOrderReducer = IpostOrderRequest | IpostOrderSuccess | IpostOrderClose | IpostOrderFailed | IaddToOrder | IremoveFromOrder | IreorderItems;

function postOrderRequest() : IpostOrderRequest {
    return {
        type: POST_ORDER_REQUEST, 
    }
}

function postOrderSuccess(order : number) : IpostOrderSuccess{
    return {
        type: POST_ORDER_SUCCESS, 
        order
    }
}

export function postOrderClose() : IpostOrderClose {
    return {
        type: POST_ORDER_CLOSE
    }
}

function postOrderFailed() : IpostOrderFailed {
    return {
        type: POST_ORDER_FAILED, 
    }
}

export function addToOrder(element : TElement) : IaddToOrder {
    return {
        type: ADD_TO_ORDER, 
        element
    }
}

export function removeFromOrder(element : TElement) : IremoveFromOrder {
    return {
        type: REMOVE_FROM_ORDER, 
        element
    }
}

export function reorderItems(dragIndex : number, hoverIndex : number) : IreorderItems {
    return {
        type: REORDER_ITEMS, 
        dragIndex,
        hoverIndex
    }
}

export function postOrder(dataForOrder : string[]) {
    return async (dispatch : AppThunk) => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token') },
            body: JSON.stringify({ "ingredients": dataForOrder })
        }  
        try {
            dispatch(postOrderRequest());
            return fetch(api + 'orders', options)
            .then(checkResponse) 
            .then(json => {
                dispatch(postOrderSuccess(json.order.number));                      
            })        
        }    
        catch(error: unknown) {
            dispatch(postOrderFailed());
        }
    };
}

