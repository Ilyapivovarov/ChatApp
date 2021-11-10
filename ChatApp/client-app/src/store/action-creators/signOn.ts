import {Dispatch} from "redux";
import {SignOnActions, SignOnActionTypes} from "../types/signOnTypes";

export interface SignOn {
    userName: string,
    password: string,
    confirmPassword: string
}

export const enterUsername = (singOn: SignOn) => {
    return async (dispatch: Dispatch<SignOnActions>) => {
        if (singOn.userName == null || singOn.userName == "")
            return dispatch({type: SignOnActionTypes.SubmitFormError, payload: singOn})

        return dispatch({type: SignOnActionTypes.EnterUserName, payload: singOn})
    }
}

export const enterPassword = (singOn: SignOn) => {
    return async (dispatch: Dispatch<SignOnActions>) => {
        if (singOn.password == null || singOn.password == ""
            || singOn.password != singOn.confirmPassword)
            return dispatch({type: SignOnActionTypes.SubmitFormError, payload: singOn})

        return dispatch({type: SignOnActionTypes.EnterUserName, payload: singOn})
    }
}

export const enterConfirmPassword = (singOn: SignOn) => {
    return async (dispatch: Dispatch<SignOnActions>) => {
        if (singOn.userName || singOn.confirmPassword == null || singOn.confirmPassword == ""
            || singOn.confirmPassword != singOn.confirmPassword)
            return dispatch({type: SignOnActionTypes.SubmitFormError, payload: singOn})

        return dispatch({type: SignOnActionTypes.EnterUserName, payload: singOn})
    }
}

export const submitForm = (singOn: SignOn) => {
    return async (dispatch: Dispatch<SignOnActions>) => {
        if (singOn.userName || singOn.confirmPassword == null || singOn.confirmPassword == ""
            || singOn.confirmPassword != singOn.confirmPassword)
            return dispatch({type: SignOnActionTypes.SubmitFormError, payload: singOn})

        return dispatch({type: SignOnActionTypes.SubmitFormSuccess, payload: singOn})
    }
}