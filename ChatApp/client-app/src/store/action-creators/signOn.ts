import {Dispatch} from "redux";
import {SignOnActions, SignOnActionTypes} from "../types/signOnTypes";

export interface SignOn {
    userName: string,
    password: string,
    confirmPassword: string
}

export const enterUsername = (userName: string) => {
    return async (dispatch: Dispatch<SignOnActions>) => {
        if (userName == null || userName == "")
            return dispatch({type: SignOnActionTypes.SubmitFormError, payload: false})

        return dispatch({type: SignOnActionTypes.EnterUserName, payload: userName})
    }
}

export const enterPassword = (password : string) => {
    return async (dispatch: Dispatch<SignOnActions>) => {
        if (password == null || password == "")
            return dispatch({type: SignOnActionTypes.SubmitFormError, payload: false})

        return dispatch({type: SignOnActionTypes.EnterPassword, payload: password})
    }
}

export const enterConfirmPassword = (confirmPassword: string) => {
    return async (dispatch: Dispatch<SignOnActions>) => {
        if (confirmPassword || confirmPassword == null)
            return dispatch({type: SignOnActionTypes.SubmitFormError, payload: false})

        return dispatch({type: SignOnActionTypes.EnterConfirmPassword, payload: confirmPassword})
    }
}

export const submitForm = (singOn: SignOn) => {
    return async (dispatch: Dispatch<SignOnActions>) => {
        if (singOn.userName || singOn.confirmPassword == null || singOn.confirmPassword == ""
            || singOn.confirmPassword != singOn.confirmPassword)
            return dispatch({type: SignOnActionTypes.SubmitFormError, payload: false})

        return dispatch({type: SignOnActionTypes.SubmitFormSuccess, payload: true})
    }
}