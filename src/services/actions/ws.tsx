export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS = 'WS_GET_ORDERS';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';

export const wsConnectionStart = () => {
    return {
        type: WS_CONNECTION_START
    };
};

export const wsConnectionSuccess = () => {
    return {
        type: WS_CONNECTION_SUCCESS
    };
};

export const wsConnectionError = () => {
    return {
        type: WS_CONNECTION_ERROR
    };
};

export const wsConnectionClosed = () => {
    return {
        type: WS_CONNECTION_CLOSED
    };
};

export const wsGetOrders = order => {
    return {
        type: WS_GET_ORDERS,
        data: order
    };
};

export const wsSendMessage = message => {
    return {
        type: WS_SEND_MESSAGE,
        data: message
    };
};