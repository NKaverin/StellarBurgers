import { api, checkResponse } from "../../utils/constants";
import { ItokenAndUser, IUser } from "../../utils/types";
import { AppDispatch, AppThunk } from "../store";

export const REGISTER_USER_REQUEST : 'REGISTER_USER_REQUEST' = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS : 'REGISTER_USER_SUCCESS' = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED : 'REGISTER_USER_FAILED' = 'REGISTER_USER_FAILED';

export const FORGOT_PASSWORD_REQUEST : 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS : 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED : 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST : 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS : 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED : 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';

export const LOGIN_USER_REQUEST : 'LOGIN_USER_REQUEST' = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS : 'LOGIN_USER_SUCCESS' = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED : 'LOGIN_USER_FAILED' = 'LOGIN_USER_FAILED';

export const LOGGED_IN : 'LOGGED_IN' = 'LOGGED_IN';
export const NOT_LOGGED_IN : 'NOT_LOGGED_IN' = 'NOT_LOGGED_IN';

export const REFRESH_TOKEN_REQUEST : 'REFRESH_TOKEN_REQUEST' = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS : 'REFRESH_TOKEN_SUCCESS' = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED : 'REFRESH_TOKEN_FAILED' = 'REFRESH_TOKEN_FAILED';

export const GET_USER_REQUEST : 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS : 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED : 'GET_USER_FAILED' = 'GET_USER_FAILED';

export const PATCH_USER_REQUEST : 'PATCH_USER_REQUEST' = 'PATCH_USER_REQUEST';
export const PATCH_USER_SUCCESS : 'PATCH_USER_SUCCESS' = 'PATCH_USER_SUCCESS';
export const PATCH_USER_FAILED : 'PATCH_USER_FAILED' = 'PATCH_USER_FAILED';

export const LOGOUT_USER_REQUEST : 'LOGOUT_USER_REQUEST' = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS : 'LOGOUT_USER_REQUEST' = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_FAILED : 'LOGOUT_USER_REQUEST' = 'LOGOUT_USER_REQUEST';

// Register user
export interface IregisterUserRequest {
    readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IregisterUserSuccess {
    readonly type: typeof REGISTER_USER_SUCCESS;
    readonly data: ItokenAndUser;
}

export interface IregisterUserFailed {
    readonly type: typeof REGISTER_USER_FAILED;
}

export const registerUserRequest = () : IregisterUserRequest => ({
    type: REGISTER_USER_REQUEST
});

export const registerUserSuccess = (data: ItokenAndUser) : IregisterUserSuccess => ({
    type: REGISTER_USER_SUCCESS,
    data: data
});

export const registerUserFailed = () : IregisterUserFailed => ({
    type: REGISTER_USER_FAILED
});

// Forgot password
export interface IforgotPasswordRequest {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IforgotPasswordSuccess {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
    readonly data: IUser;
}

export interface IforgotPasswordFailed {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export const forgotPasswordRequest = () : IforgotPasswordRequest => ({
    type: FORGOT_PASSWORD_REQUEST
});

export const forgotPasswordSuccess = (data: IUser) : IforgotPasswordSuccess => ({
    type: FORGOT_PASSWORD_SUCCESS,
    data: data
});

export const forgotPasswordFailed = () : IforgotPasswordFailed => ({
    type: FORGOT_PASSWORD_FAILED
});

// Reset password
export interface IresetPasswordRequest {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IresetPasswordSuccess {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
    readonly data: IUser;
}

export interface IresetPasswordFailed {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

export const resetPasswordRequest = () : IresetPasswordRequest => ({
    type: RESET_PASSWORD_REQUEST
});

export const resetPasswordSuccess = (data : IUser) : IresetPasswordSuccess => ({
    type: RESET_PASSWORD_SUCCESS,
    data: data
});

export const resetPasswordFailed = () : IresetPasswordFailed => ({
    type: RESET_PASSWORD_FAILED
});

// Login user

export interface IloginUserRequest {
    readonly type: typeof LOGIN_USER_REQUEST;
}

export interface IloginUserSuccess {
    readonly type: typeof LOGIN_USER_SUCCESS;
    readonly data: ItokenAndUser;
}

export interface IloginUserFailed {
    readonly type: typeof LOGIN_USER_FAILED;
}

export const loginUserRequest = () : IloginUserRequest => ({
    type: LOGIN_USER_REQUEST
});

export const loginUserSuccess = (data : ItokenAndUser) : IloginUserSuccess => ({
    type: LOGIN_USER_SUCCESS,
    data: data
});

export const loginUserFailed = () : IloginUserFailed => ({
    type: LOGIN_USER_FAILED
});

// is logged in
export interface IsetLoggedIn {
    readonly type: typeof LOGGED_IN;
}

export interface IsetNotLoggedIn {
    readonly type: typeof NOT_LOGGED_IN;
}

export const setLoggedIn = () : IsetLoggedIn => ({
    type: LOGGED_IN
})

export const setNotLoggedIn = () : IsetNotLoggedIn => ({
    type: NOT_LOGGED_IN
})

// Refresh token

export interface IrefreshTokenRequest {
    readonly type: typeof REFRESH_TOKEN_REQUEST;
}

export interface IrefreshTokenSuccess {
    readonly type: typeof REFRESH_TOKEN_SUCCESS;
    readonly data: ItokenAndUser;
}

export interface IrefreshTokenFailed {
    readonly type: typeof REFRESH_TOKEN_FAILED;
}

export const refreshTokenRequest = () : IrefreshTokenRequest => ({
    type: REFRESH_TOKEN_REQUEST
})

export const refreshTokenSuccess = (data : ItokenAndUser) : IrefreshTokenSuccess=> ({
    type: REFRESH_TOKEN_SUCCESS,
    data: data
})

export const refreshTokenFailed = () : IrefreshTokenFailed => ({
    type: REFRESH_TOKEN_FAILED
})

// Get user
export interface IgetUserRequest {
    readonly type: typeof GET_USER_REQUEST;
}

export interface IgetUserSuccess {
    readonly type: typeof GET_USER_SUCCESS;
    readonly data: ItokenAndUser;
}

export interface IgetUserFailed {
    readonly type: typeof GET_USER_FAILED;
}

export const getUserRequest = () : IgetUserRequest => ({
    type: GET_USER_REQUEST
});

export const getUserSuccess = (data : ItokenAndUser) : IgetUserSuccess => ({
    type: GET_USER_SUCCESS,
    data: data
});

export const getUserFailed = () : IgetUserFailed => ({
    type: GET_USER_FAILED
});

// patch
export interface IpatchUserRequest {
    readonly type: typeof PATCH_USER_REQUEST;
}

export interface IpatchUserSuccess {
    readonly type: typeof PATCH_USER_SUCCESS;
    readonly data: ItokenAndUser;
}

export interface IpatchUserFailed {
    readonly type: typeof PATCH_USER_FAILED;
}

export const patchUserRequest = () : IpatchUserRequest => ({
    type:  PATCH_USER_REQUEST
});

export const patchUserSuccess = (data : ItokenAndUser) : IpatchUserSuccess => ({
    type:  PATCH_USER_SUCCESS,
    data: data
});

export const patchUserFailed = () : IpatchUserFailed => ({
    type:  PATCH_USER_FAILED
});

// logout
export interface IlogoutUserRequest {
    readonly type: typeof LOGOUT_USER_REQUEST;
}

export interface IlogoutUserSuccess {
    readonly type: typeof LOGOUT_USER_SUCCESS;
}

export interface IlogoutUserFailed {
    readonly type: typeof LOGOUT_USER_FAILED;
}

export const logoutUserRequest = () : IlogoutUserRequest => ({
    type:  LOGOUT_USER_REQUEST
});

export const logoutUserSuccess = () : IlogoutUserSuccess => ({
    type:  LOGOUT_USER_SUCCESS
});

export const logoutUserFailed = () : IlogoutUserFailed => ({
    type:  LOGOUT_USER_FAILED
});

export type TUser = IregisterUserRequest | IregisterUserSuccess | IregisterUserFailed | IforgotPasswordRequest | IforgotPasswordSuccess | IforgotPasswordFailed | IresetPasswordRequest | IresetPasswordSuccess 
| IresetPasswordFailed | IloginUserRequest | IloginUserSuccess | IloginUserFailed | IsetLoggedIn | IsetNotLoggedIn | IrefreshTokenRequest | IrefreshTokenSuccess | IrefreshTokenFailed | IgetUserRequest
| IgetUserSuccess | IgetUserFailed | IpatchUserRequest | IpatchUserSuccess | IpatchUserFailed | IlogoutUserRequest | IlogoutUserSuccess | IlogoutUserFailed;

export const registerUser : AppThunk = (name : string, email : string, password : string) => {
    return async (dispatch) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'email': email,
                'password': password,
                'name': name 
            })
        };
        try {
            dispatch(registerUserRequest());
            return fetch(api + 'auth/register', requestOptions)
            .then(checkResponse)
            .then(res => {
                dispatch(registerUserSuccess(res));
                dispatch(setLoggedIn());
                localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1]);
                localStorage.setItem('refreshToken', res.refreshToken);          
                return res;
            });
        }
        catch(error) {
            dispatch(registerUserFailed());
            console.log(error);
        }
    };
}

export const forgotPassword : AppThunk =  (email : string) => {
    return async (dispatch) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'email': email
            })
        };
        try {
            dispatch(forgotPasswordRequest());
            return fetch(api + 'password-reset', requestOptions)
            .then(checkResponse)
            .then(res => {
                dispatch(forgotPasswordSuccess(res));
                localStorage.setItem('forgotPasswordSuccess', res.success);
                return res;
            });
        }
        catch(error: any) {
            dispatch(forgotPasswordFailed());
            console.log(error);
        }
    };
}

export const resetPassword : AppThunk = (password : string, code : string) => {
    return async (dispatch) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'password': password,
                'token': code
            })
        };
        try {
            dispatch(resetPasswordRequest());
            return fetch(api + 'password-reset/reset', requestOptions)
            .then(checkResponse)
            .then(res => {
                dispatch(resetPasswordSuccess(res));
                localStorage.removeItem('forgotPasswordSuccess');
                return res;
            });
        }
        catch(error: any) {
            dispatch(resetPasswordFailed());
            console.log(error);
        }
    };
}

export const loginUser : AppThunk = (email : string, password : string) => {
    return async (dispatch) => {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 

            },
            body: JSON.stringify({
                'email': email,
                'password': password
            })
        };
        try {
            dispatch(loginUserRequest());
            return fetch(api + 'auth/login', requestOptions)
            .then(checkResponse)
            .then(res => {
                dispatch(loginUserSuccess(res));
                dispatch(setLoggedIn());
                // устанавливаем токен
                const authToken = res.accessToken.split('Bearer ')[1];
                if (authToken) {
                    setCookie('token', authToken, {});
                }
                setCookie('refreshToken', res.refreshToken, {});
                return res;
            });
        }
        catch(error: any) {
            dispatch(loginUserFailed());
            console.log(error);
        }
    };
}

export function deleteCookie(name : string) {
    setCookie(name, false, { expires: -1 });
} 

export function getCookie(name : string) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name : string, value : string | boolean, props : {[name: string] : any}) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();

        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (typeof exp == typeof Date && exp) {
        if (typeof exp == typeof Date && exp && exp.toUTCString) {
            props.expires = exp.toUTCString();
        }
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
} 



export const getUser : AppThunk = () : ((dispatch: any) => void) => {
    const token = getCookie('token');
    const refresh = getCookie('refreshToken');

    // если нет токенов то возвращаем пустой результат
    if (!token && !refresh) {
        return async () => {}
    } 

    return async (dispatch) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
        };
        try {
            dispatch(getUserRequest());
            return fetch(api + 'auth/user', requestOptions)
            .then(res => {
                if (res.status === 403) {
                    return dispatch(refreshToken())
                    .then(() => {return dispatch(getUser())})
                    .then(() => {return false})
                } else {
                    return checkResponse(res);
                }
            }) 
            .then(res => {
                if (res) {             
                    dispatch(getUserSuccess(res));
                    dispatch(loginUserSuccess(res));
                    dispatch(setLoggedIn());
                    return res.success;
                } 
            });
        }
        catch(error:any) {
            dispatch(getUserFailed());
            console.log(error);
        }
    };
}

export const refreshToken : AppThunk = () : ((dispatch : AppDispatch) => Promise<any>)  => {
    return async (dispatch) => {
        const refresh= getCookie('refreshToken');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'token': refresh
            })
        }
        try {
            dispatch(refreshTokenRequest())
            return fetch(api + 'auth/token', requestOptions)
            .then(checkResponse)
            .then(res => {
                dispatch(refreshTokenSuccess(res));
                dispatch(setLoggedIn());
                const authToken = res.accessToken.split('Bearer ')[1];
                if (authToken) {
                    setCookie('token', authToken, {});
                }
                setCookie('refreshToken', res.refreshToken, {});
                return res;
            });
        }
        catch(error: any) { 
            dispatch(refreshTokenFailed());
            console.log(error);
        }
    }  
}

export const patchUser : AppThunk = (name : string, email : string, password : string) => {
    const token = getCookie('token');
    const refresh = getCookie('refreshToken');

    // если нет токенов то возвращаем пустой результат
    if (!token && !refresh) {
        return async () => {}
    } 
    return async (dispatch : AppDispatch) => {
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                'email': email,
                'password': password,
                'name': name
            }) 
        };
        try {
            dispatch(patchUserRequest());
            return fetch(api + 'auth/user', requestOptions)
                .then(async res => {
                    if (res.status === 403) {
                        await refreshToken();
                        await patchUser(name, email, password);
                    } else {
                        return checkResponse(res);
                    }
                }) 
                .then(res => {
                    dispatch(patchUserSuccess(res));
                    return res;
                });
        }
        catch(error) {
            dispatch(patchUserFailed());
            console.log(error);
        }
    };
}

export const logoutUser : AppThunk = () => {
    return async (dispatch : AppDispatch) => {
        const refreshToken = getCookie('refreshToken')
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'token': refreshToken
            }) 
        };
        try {
            dispatch(logoutUserRequest());
            return fetch(api + 'auth/logout', requestOptions)
                .then(checkResponse) 
                .then(res => {
                    deleteCookie('token');
                    deleteCookie('refreshToken');
                    dispatch(logoutUserSuccess());
                    dispatch(setNotLoggedIn());
                    return res;
                })
        }
        catch(error: any) {
            dispatch(logoutUserFailed());
            console.log(error);
        }
    };
}