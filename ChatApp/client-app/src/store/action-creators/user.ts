import {SignIn, UserAction, UserActionType,} from "../types/userTypes";
import {Dispatch} from "redux";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {Account, DecodeJwtToken, JwtToken, SignUp} from "../../types/dataTypes";
import {RequestResult} from "../../common/RequestResult";
import {resetForm} from "./signUpForm";

const ACCESS_TOKEN_KEY = "accessToken";

export const authUser = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        let access_token = localStorage.getItem(ACCESS_TOKEN_KEY);
        if (access_token) {
            const jwtDecode = jwt_decode<DecodeJwtToken>(access_token)
            if (jwtDecode) {
                if (validateToken(jwtDecode.exp)) {
                    dispatch({
                        type: UserActionType.SIGN_IN_USER_SUCCESS,
                        payload: jwtDecode
                    })
                   
                }else{
                    singOutUser();
                    dispatch(({type: UserActionType.SIGN_OUT_USER}))
                }
               
            }
        } else
            dispatch(({type: UserActionType.SIGN_OUT_USER}))
    }
}

export const signInUser = (signIn: SignIn) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await axios.post<JwtToken>("user/sign-in", signIn);
            if (response.data?.access_token != null) {
                localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access_token);
                let decoded = jwt_decode<Account>(response.data.access_token);
                dispatch({type: UserActionType.SIGN_IN_USER_SUCCESS, payload: decoded})
            }
        } catch {
            dispatch({type: UserActionType.SIGN_IN_USER_ERROR, payload: "Error sign in"})
        }
    }
}

export const signUpUser = (signUp: SignUp) => {
    return async (dispatch: Dispatch<UserAction>) => {
        const response = await axios.post<RequestResult<JwtToken>>("user/sign-up", signUp);
        console.log(response)
        if (response.data.isSuccess) {
            console.log("success")
            localStorage.setItem(ACCESS_TOKEN_KEY, response.data.value.access_token);
            const decoded = jwt_decode<Account>(response.data.value.access_token);
            console.log(decoded)
            dispatch({type: UserActionType.SIGN_UP_USER_SUCCESS, payload: decoded})
            resetForm();
        }

       dispatch({type: UserActionType.SIGN_IN_USER_ERROR, payload: response.data.errorMessage})
    }
}

export const singOutUser = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        localStorage.removeItem(ACCESS_TOKEN_KEY)
        dispatch({type: UserActionType.SIGN_OUT_USER});
    }
}

const validateToken = (tokenExp: number): boolean => {
    const exp = new Date(0);
    exp.setUTCSeconds(tokenExp);
    let now = new Date();
    console.log(exp > now, "Token")
    return exp > now
}