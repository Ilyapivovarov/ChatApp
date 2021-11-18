import {Dispatch} from "redux";
import {AuthActions, AuthActionTypes} from "./authReducerTypes";
import axios from "axios";
import {Account, JwtToken, SignIn, SignUp} from "../../../types/dataTypes";
import {RequestResult} from "../../../common/RequestResult";
import {AccessTokenKey} from "../../../common/global";
import jwtDecode from "jwt-decode";

export const signInUser = (signIn: SignIn) => {
    return async (dispatch: Dispatch<AuthActions>) => {
        try {
            const response = await axios.post<RequestResult<JwtToken>>("user/sign-in", signIn)
            console.log(response.data)
            if (response.data.isSuccess) {
                localStorage.setItem(AccessTokenKey, response.data.value.access_token)
                const account = jwtDecode<Account>(response.data.value.access_token);
                dispatch({type: AuthActionTypes.AuthSuccess, payload: account})
            } else {
                return dispatch({
                    type: AuthActionTypes.AuthError,
                    payload: response.data.errorMessage
                })
            }

        } catch (e) {
            return dispatch({type: AuthActionTypes.AuthError, payload: "Exception"})
        }
    }
}

export const signUpUser = (signUp: SignUp) => {
    return async (dispatch: Dispatch<AuthActions>) => {
        try {
            const response = await axios.post<RequestResult<JwtToken>>("user/sign-up", signUp)
            console.log(response.data)
            if (response.data.isSuccess) {
                localStorage.setItem(AccessTokenKey, response.data.value.access_token)
                const account = jwtDecode<Account>(response.data.value.access_token);
                dispatch({type: AuthActionTypes.AuthSuccess, payload: account})
            } else {
                return dispatch({type: AuthActionTypes.AuthError, payload: response.data.errorMessage})
            }
        } catch (e) {
            return dispatch({type: AuthActionTypes.AuthError, payload: "Exception"})
        }
    }
}

export const authUser = () => {
    return async (dispatch: Dispatch<AuthActions>) => {
        const token = localStorage.getItem(AccessTokenKey);
        if (token) {
            const account = jwtDecode<Account>(token)
            if (validateToken(account.exp)) {
                return dispatch({type: AuthActionTypes.AuthSuccess, payload: account})
            }
        }

        return dispatch({type: AuthActionTypes.SignOut})
    }
}

const validateToken = (tokenExp: number): boolean => {
    const exp = new Date(0);
    exp.setUTCSeconds(tokenExp);
    let now = new Date();
    console.log(exp > now, "Token")
    return exp > now
}

export const signOut = () => {
    return async (dispatch: Dispatch<AuthActions>) => {
       localStorage.removeItem(AccessTokenKey);
       return dispatch({type: AuthActionTypes.SignOut})
    }
} 