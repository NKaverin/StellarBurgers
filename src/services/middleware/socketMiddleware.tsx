import { getCookie } from "../actions/user";

import { AnyAction, MiddlewareAPI } from 'redux'

interface TwsActions {
    wsInit: 'WS_CONNECTION_START',
    wsSendMessage: 'WS_SEND_MESSAGE',
    onOpen: 'WS_CONNECTION_SUCCESS',
    onClose: 'WS_CONNECTION_CLOSED',
    onError: 'WS_CONNECTION_ERROR',
    onMessage: 'WS_GET_MESSAGE'
}

export const socket = (wsUrl : string, wsActions : TwsActions) => { 
    return (store : MiddlewareAPI) => {
        let socket : WebSocket | null = null;;
        return (next: any) => (action: AnyAction) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsInit, onOpen, onError, onClose, onMessage, wsSendMessage } = wsActions;
            const token = getCookie('token');
            
            if (type === wsInit) {
                if (socket && socket.readyState === WebSocket.OPEN) {
                    socket.close();
                }    
                socket = new WebSocket(`${wsUrl}${payload}`);
            } 

            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, data: event });
                };

                socket.onerror = event => {
                    dispatch({ type: onError, data: event });
                };

                socket.onmessage = event => {          
                    const { data } = event;
                    const parsedData = JSON.parse(data); 
                    dispatch({ type: onMessage, data: parsedData });
                };        
            
                socket.onclose = event => {
                    dispatch({ type: onClose, data: event });
                }; 

                if (type === wsSendMessage) {
                    const message = { ...payload, token: token };
                    socket.send(JSON.stringify(message));
                }

            }

            next(action);
        };

    };
};