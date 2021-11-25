import {Dispatch} from "redux";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {Account, JwtToken, SignIn, SignUp} from "../../types/dataTypes";
import {AuthActions, AuthActionTypes} from "../types/authReducerTypes";
import {RequestResult} from "../../common/RequestResult";
import {AccessTokenKey} from "../../common/global";

export const signInUser = (signIn: SignIn) => {
    return async (dispatch: Dispatch<AuthActions>) => {
        try {
            const response = await axios.post<RequestResult<JwtToken>>("auth/sign-in", signIn)
            if (response.data.isSuccess) {
                localStorage.setItem(AccessTokenKey, response.data.value.access_token);
                const account = jwtDecode<Account>(response.data.value.access_token);
                dispatch({type: AuthActionTypes.AuthSuccess, payload: account});
                window.location.replace("/");
            } else {
                dispatch({
                    type: AuthActionTypes.AuthError,
                    payload: response.data.errorMessage
                });
            }

        } catch (e) {
            return dispatch({type: AuthActionTypes.AuthError, payload: "Exception"});
        }
    }
}

export const resetAuthReducer = () => {
    return async (dispatch: Dispatch<AuthActions>) => {
        dispatch({type: AuthActionTypes.Reset})
    }
}

export const signUpUser = (signUp: SignUp) => {
    return async (dispatch: Dispatch<AuthActions>) => {
        try {
            const response = await axios.post<RequestResult<JwtToken>>("auth/sign-up", signUp)
            if (response.data.isSuccess) {
                localStorage.setItem(AccessTokenKey, response.data.value.access_token);
                const account = jwtDecode<Account>(response.data.value.access_token);
                dispatch({type: AuthActionTypes.AuthSuccess, payload: account});
                window.location.replace("/");
            } else {
                dispatch({type: AuthActionTypes.AuthError, payload: response.data.errorMessage})
            }
        } catch (e) {
            return dispatch({type: AuthActionTypes.AuthError, payload: "Exception"})
        }
    }
}

export const authUser = () => {
    return (dispatch: Dispatch<AuthActions>) => {
        const token = localStorage.getItem(AccessTokenKey);
        if (token) {
            const account = jwtDecode<Account>(token);
            if (validateToken(account.exp)) {
                dispatch({type: AuthActionTypes.AuthSuccess, payload: account})
            }
        } else {
            dispatch({type: AuthActionTypes.SignOut})
        }

    }
}

const validateToken = (tokenExp: number): boolean => {
    const exp = new Date(0);
    exp.setUTCSeconds(tokenExp);
    let now = new Date();
    return exp > now
}

export const signOut = () => {
    return async (dispatch: Dispatch<AuthActions>) => {
        localStorage.removeItem(AccessTokenKey);
        return dispatch({type: AuthActionTypes.SignOut})
    }
} 