import {  
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS
} from '../actions/ws';
 
const initialState = {
    wsConnected: false,
    getOrdersSuccess: false,
    total: 0,
    totalToday: 0,
    orders: [] 
};
  
export const ws = (state, action) => {
    switch (action.type) {
        
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false
            };

        case WS_GET_ORDERS:
            return {
                ...state,
                getOrdersSuccess: action.data.success,
                total: action.data.total,
                totalToday: action.data.totalToday,
                orders: action.data.orders
            };    

        default: {
            return state;
        }

    }
};