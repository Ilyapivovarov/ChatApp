import {CurrentUser, SignIn, UserAction, UserActionType,} from "../types/userTypes";
import {Dispatch} from "redux";
import axios, {AxiosResponse} from "axios";
import jwt_decode from "jwt-decode";

export const authUser = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        let access_token = localStorage.getItem("access_token");
        if (access_token) {
            const currentUser = jwt_decode<CurrentUser>(access_token)
            dispatch({type: UserActionType.SIGN_IN_USER_SUCCESS, payload: currentUser})
        } else
            dispatch(({type: UserActionType.SING_OUT_USER, payload: "Аноним"}))
    }
}

interface JwtToken {
    access_token: string
}

export const signInUser = (signIn: SignIn) => {
    return async (dispatch: Dispatch<UserAction>) => {
        axios.post("User/sign-in", signIn)
            .then((x: AxiosResponse<JwtToken>) => {
                localStorage.setItem("access_token", x.data.access_token);
                let decoded = jwt_decode<CurrentUser>(x.data.access_token);
                dispatch({type: UserActionType.SIGN_IN_USER_SUCCESS, payload: decoded})
            })
            .catch(e => dispatch({
                        type: UserActionType.SIGN_IN_USER_ERROR,
                        payload: "Ошибка"
                    }))


        // if (!localStorage.getItem("user")) {
        //     localStorage.setItem("user", signIn.username)
        //     dispatch({type: UserActionType.SIGN_IN_USER_SUCCESS, payload: signIn.username})
        // } else {
        //     dispatch({
        //         type: UserActionType.SIGN_IN_USER_ERROR,
        //         payload: "Такой пользователь уже существует"
        //     })
        // }
    }
}

export const singOutUser = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        localStorage.removeItem("user")
        dispatch({type: UserActionType.SIGN_IN_USER_ERROR, payload: ""});
    }
}