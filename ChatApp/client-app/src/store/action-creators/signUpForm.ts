import {Dispatch} from "redux";
import {SignOnActions, SignOnActionTypes, SignUpSate} from "../types/signOnTypes";
import axios from "../../common/http-common"
import {SignUp} from "../../types/dataTypes";

export const enterUsername = (userName: string) => {
    return async (dispatch: Dispatch<SignOnActions>) => {
        return dispatch({type: SignOnActionTypes.EnterUserName, payload: userName})
    }
}

export const enterPassword = (password: string) => {
    return async (dispatch: Dispatch<SignOnActions>) => {
        return dispatch({type: SignOnActionTypes.EnterPassword, payload: password})
    }
}

export const enterConfirmPassword = (confirmPassword: string) => {
    return async (dispatch: Dispatch<SignOnActions>) => {
        return dispatch({type: SignOnActionTypes.EnterConfirmPassword, payload: confirmPassword})
    }
}

export const submitForm = (signUp: SignUp) => {
    return async (dispatch: Dispatch<SignOnActions>) => {
        if  (signUp.confirmPassword == signUp.password) {
            return dispatch({type: SignOnActionTypes.SubmitFormSuccess, payload: true})
        }
        return dispatch({type: SignOnActionTypes.SubmitFormError, payload: "Passwords not same"})
    }
}