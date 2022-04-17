import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGGED_IN,
    NOT_LOGGED_IN,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    PATCH_USER_REQUEST,
    PATCH_USER_SUCCESS,
    PATCH_USER_FAILED,
    LOGOUT_USER_FAILED,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_REQUEST
} from '../actions/user';

interface userInterface {
    email: string,
    name: string
}

interface iinitialState { 
    user: userInterface,
    registerRequest: boolean,
    registerFailed: boolean,
    forgotPasswordRequest: boolean,
    forgotPasswordFailed: boolean,
    loginRequest: boolean,
    loginFailed: boolean,
    loggedIn: boolean,
    refreshRequest: boolean,
    refreshFailed: boolean,
    refreshSuccess: boolean,
    getRequest: boolean,
    getFailed: boolean,
    patchRequest: boolean,
    patchFailed: boolean,
    logoutRequest: boolean,
    logoutFailed: boolean,
    logoutSuccess: boolean
}

const initialState:iinitialState = {
    user: {
        'name': '',
        'email': ''
    },
    registerRequest: false,
    registerFailed: false,
    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
    loginRequest: false,
    loginFailed: false,
    loggedIn: false,
    refreshRequest: false,
    refreshFailed: false,
    refreshSuccess: false,
    getRequest: false,
    getFailed: false,
    patchRequest: false,
    patchFailed: false,
    logoutRequest: false,
    logoutFailed: false,
    logoutSuccess: false
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case REGISTER_USER_REQUEST: {
            return {
                ...state,
                registerRequest: true,
                registerFailed: false
            }
        }
        case REGISTER_USER_SUCCESS: {
            return {
                ...state,
                registerFailed: false,
                user: action.data.user,
                registerRequest: false
            }      
        }
        case REGISTER_USER_FAILED: {
            return {
                ...state,
                registerFailed: true, 
                registerRequest: false,
                user: null
            }
        }

        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordRequest: true,
                forgotPasswordFailed: false
            }
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordFailed: false,
                forgotPasswordRequest: false
            }      
        }
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                forgotPasswordFailed: true,
                forgotPasswordRequest: false
            }
        }

        case LOGIN_USER_REQUEST: {
            return {
                ...state,
                loginRequest: true,
                loginFailed: false
            }
        }
        case LOGIN_USER_SUCCESS: {
            return {
                ...state,
                loginFailed: false,
                user: action.data.user,
                loginRequest: false,
            }      
        }
        case LOGIN_USER_FAILED: {
            return {
                ...state,
                loginFailed: true, 
                loginRequest: false,
                user: {
                    'name': '',
                    'email': ''
                }
            }
        }

        case LOGGED_IN: {
            return {
                ...state,
                loggedIn: true
            }
        }
        case NOT_LOGGED_IN: {
            return {
                ...state,
                loggedIn: false
            }
        }

        case REFRESH_TOKEN_REQUEST: {
            return {
                ...state,
                refreshRequest: true,
                refreshFailed: false
            }
        }
        case REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
                refreshFailed: false,
                refreshRequest: false,
                refreshSuccess: action.data.success
            }      
        }
        case REFRESH_TOKEN_FAILED: {
            return {
                ...state,
                refreshFailed: true,
                refreshRequest: false
            }
        }

        case GET_USER_REQUEST: {
            return {
                ...state,
                getRequest: true,
                getFailed: false
            }
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                getFailed: false,
                user: action.data.user,
                getUserSuccess: action.data.success,
                getRequest: false,
            }      
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                getFailed: true,
                getRequest: false,
                user: null
            }
        }

        case PATCH_USER_REQUEST: {
            return {
                ...state,
                changeRequest: true,
                changeFailed: false
            }
        }
        case PATCH_USER_SUCCESS: {
            return {
                ...state,
                changeFailed: false,
                user: action.data.user,
                changeRequest: false,
            }      
        }
        case PATCH_USER_FAILED: {
            return {
                ...state,
                changeFailed: true, 
                changeRequest: false
            }
        }

        case LOGOUT_USER_REQUEST: {
            return {
                ...state,
                logoutRequest: true,
                logoutFailed: false
            }
        }
        case LOGOUT_USER_SUCCESS: {
            return {
                ...state,
                logoutFailed: false,
                user: {
                    'name': '',
                    'email': ''
                },
                logoutRequest: false,
                logoutSuccess: true,
            }      
        }
        case LOGOUT_USER_FAILED: {
            return {
                ...state,
                logoutFailed: true,
                logoutRequest: false
            }
        }

        default: {
            return state;
        }
    }
}