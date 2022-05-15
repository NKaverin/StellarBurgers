import {  
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_CONNECTION_START
} from '../actions/ws';

const initialState = {
    wsConnected: false,
    getOrdersSuccess: false,
    wsConectionStarted: false,
    total: 0,
    totalToday: 0,
    orders: [] 
};

export const ws = (state = initialState, action) => {
    switch (action.type) {
        
        case WS_CONNECTION_START:
            return {
                ...state,
                wsConnected: false,
                wsConectionStarted: true
            };
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
                wsConectionStarted: false
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
                wsConectionStarted: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
                orders: [],
                total: 0,
                totalToday: 0,
                wsConectionStarted: false
            };

        case WS_GET_MESSAGE:
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