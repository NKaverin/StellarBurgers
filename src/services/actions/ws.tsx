import { IMessage } from "../../utils/types";

export const WS_CONNECTION_START : 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS : 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR : 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED : 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE : 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE : 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
export const WS_GET_ORDERS : 'WS_GET_ORDERS' = 'WS_GET_ORDERS';

export interface IwsConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: string
}

export interface IwsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IwsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IwsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IwsGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    readonly data: IMessage
}

export type Tws= IwsConnectionStart | IwsConnectionSuccess | IwsConnectionError | IwsConnectionClosed | IwsGetMessage;

export const wsConnectionStart = (payload : string) : IwsConnectionStart => {
    return {
        type: WS_CONNECTION_START,
        payload: payload
    };
};

export const wsConnectionSuccess = () : IwsConnectionSuccess => {
    return {
        type: WS_CONNECTION_SUCCESS
    };
};

export const wsConnectionError = () : IwsConnectionError => {
    return {
        type: WS_CONNECTION_ERROR
    };
};

export const wsConnectionClosed = () : IwsConnectionClosed => {
    return {
        type: WS_CONNECTION_CLOSED
    };
};


export const wsSendMessage = (message : IMessage) : IwsGetMessage => {
    return {
        type: WS_GET_MESSAGE,
        data: message
    };
};