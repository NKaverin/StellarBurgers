import { rootReducer, RootState, TApplicationActions } from './redusers/rootReduser';
import { createStore, applyMiddleware, ActionCreator, Action } from 'redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { socket } from './middleware/socketMiddleware';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_SEND_MESSAGE } from './actions/ws';


const wsActions : TwsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};

export interface TwsActions {
    wsInit: 'WS_CONNECTION_START',
    wsSendMessage: 'WS_SEND_MESSAGE',
    onOpen: 'WS_CONNECTION_SUCCESS',
    onClose: 'WS_CONNECTION_CLOSED',
    onError: 'WS_CONNECTION_ERROR',
    onMessage: 'WS_GET_MESSAGE'
}

const wsUrl = 'wss://norma.nomoreparties.space/orders';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware, socket(wsUrl, wsActions)));

const store = createStore(rootReducer, composedEnhancer);
export type AppDispatch = typeof store.dispatch; 
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>; 
export default store;