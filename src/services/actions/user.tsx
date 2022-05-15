import { api, checkResponse } from "../../utils/constants";
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const LOGGED_IN = 'LOGGED_IN';
export const NOT_LOGGED_IN = 'NOT_LOGGED_IN';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST';
export const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS';
export const PATCH_USER_FAILED = 'PATCH_USER_FAILED';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_REQUEST';

// Register user
export const registerUserRequest = () => ({
    type: REGISTER_USER_REQUEST
});

export const registerUserSuccess = (data) => ({
    type: REGISTER_USER_SUCCESS,
    data: data
});

export const registerUserFailed = () => ({
    type: REGISTER_USER_FAILED
});

// Forgot password
export const forgotPasswordRequest = () => ({
    type: FORGOT_PASSWORD_REQUEST
});

export const forgotPasswordSuccess = (data) => ({
    type: FORGOT_PASSWORD_SUCCESS,
    data: data
});

export const forgotPasswordFailed = () => ({
    type: FORGOT_PASSWORD_FAILED
});

// Reset password
export const resetPasswordRequest = () => ({
    type: RESET_PASSWORD_REQUEST
});

export const resetPasswordSuccess = (data) => ({
    type: RESET_PASSWORD_SUCCESS,
    data: data
});

export const resetPasswordFailed = () => ({
    type: RESET_PASSWORD_FAILED
});

// Login user
export const loginUserRequest = () => ({
    type: LOGIN_USER_REQUEST
});

export const loginUserSuccess = (data) => ({
    type: LOGIN_USER_SUCCESS,
    data: data
});

export const loginUserFailed = () => ({
    type: LOGIN_USER_FAILED
});

// is logged in
export const setLoggedIn = () => ({
    type: LOGGED_IN
})

export const setNotLoggedIn = () => ({
    type: NOT_LOGGED_IN
})

// Refresh token
export const refreshTokenRequest = () => ({
    type: REFRESH_TOKEN_REQUEST
})

export const refreshTokenSuccess = (data) => ({
    type: REFRESH_TOKEN_SUCCESS,
    data: data
})

export const refreshTokenFailed = () => ({
    type: REFRESH_TOKEN_FAILED
})

// Get user
export const getUserRequest = () => ({
    type: GET_USER_REQUEST
});

export const getUserSuccess = (data) => ({
    type: GET_USER_SUCCESS,
    data: data
});

export const getUserFailed = () => ({
    type: GET_USER_FAILED
});

// patch
export const patchUserRequest = () => ({
    type:  PATCH_USER_REQUEST
});

export const patchUserSuccess = (data) => ({
    type:  PATCH_USER_SUCCESS,
    data: data
});

export const patchUserFailed = () => ({
    type:  PATCH_USER_FAILED
});

// logout
export const logoutUserRequest = () => ({
    type:  LOGOUT_USER_REQUEST
});

export const logoutUserSuccess = (data) => ({
    type:  LOGOUT_USER_SUCCESS,
    data: data
});

export const logoutUserFailed = () => ({
    type:  LOGOUT_USER_FAILED
});

export function registerUser(name, email, password) {
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

export function forgotPassword(email) {
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

export function resetPassword(password, code) {
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

export function loginUser(email, password) {
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

export function deleteCookie(name) {
    setCookie(name, null, { expires: -1 });
} 

export function getCookie(name) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, props) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();

        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
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

export function refreshToken() {
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

export function getUser() {
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

export function patchUser(name, email, password) {
    const token = getCookie('token');
    const refresh = getCookie('refreshToken');

    // если нет токенов то возвращаем пустой результат
    if (!token && !refresh) {
        return async () => {}
    } 
    return async (dispatch) => {
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
                .then(res => {
                    if (res.status === 403) {
                        return dispatch(refreshToken())
                        .then(() => {return dispatch(patchUser(name, email, password))})
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

export function logoutUser() {
    return async (dispatch) => {
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
                    dispatch(logoutUserSuccess(res));
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