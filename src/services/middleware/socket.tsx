import { getCookie } from "../actions/user";

export const socket = (wsUrl, wsActions) => { 
    return store => {
        let socket;
        return next => action => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsInit, onOpen, onError, onClose, onMessage, wsSendMessage } = wsActions;
            const token = getCookie('token');
            
            if (type === wsInit) {
                if (socket && socket.readyState === WebSocket.OPEN) {
                    socket.close();
                } 
                if (window.location.pathname.indexOf('/feed') === 0) {
                    socket = new WebSocket(`${wsUrl}/all`);          
                } else if (window.location.pathname.indexOf('/profile/orders') === 0) {
                    socket = new WebSocket(`${wsUrl}?token=${token}`);   
                }      
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