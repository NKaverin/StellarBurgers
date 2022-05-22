import { getCookie } from "../actions/user";

import { AnyAction, Middleware, MiddlewareAPI } from 'redux'
import { AppDispatch, TwsActions } from "../store";
import { RootState } from "../redusers/rootReduser";

export const socket = (wsUrl : string, wsActions : TwsActions) : Middleware => { 
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket : WebSocket | null = null;;
        return (next) => (action: AnyAction) => {
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