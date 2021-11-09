import {SignIn, UserAction, UserActionType,} from "../types/userTypes";
import {Dispatch} from "redux";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {Account, DecodeJwtToken, JwtToken} from "../../types/dataTypes";

export const authUser = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        let access_token = localStorage.getItem("access_token");
        if (access_token) {
            const jwtDecode = jwt_decode<DecodeJwtToken>(access_token)
            if (jwtDecode) {
                if (validateToken(jwtDecode.exp)) {
                    dispatch({
                        type: UserActionType.SIGN_IN_USER_SUCCESS,
                        payload: {userName: jwtDecode.userName, id: jwtDecode.id}
                    })
                    return;
                }
                singOutUser();
            }
        } else
            dispatch(({type: UserActionType.SING_OUT_USER}))
    }
}

export const signInUser = (signIn: SignIn) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await axios.post<JwtToken>("User/sign-in", signIn);
            if (response.data.access_token != null) {
                localStorage.setItem("access_token", response.data.access_token);
                let decoded = jwt_decode<Account>(response.data.access_token);
                dispatch({type: UserActionType.SIGN_IN_USER_SUCCESS, payload: decoded})
            }
        } catch {
            dispatch({type: UserActionType.SIGN_IN_USER_ERROR, payload: "Error"})
        }
    }
}

export const singOutUser = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        localStorage.removeItem("access_token")
        dispatch({type: UserActionType.SING_OUT_USER});
    }
}

const validateToken = (tokenExp: number): boolean => {
    const exp = new Date(0);
    exp.setUTCSeconds(tokenExp);
    let now = new Date();

    return exp > now
}