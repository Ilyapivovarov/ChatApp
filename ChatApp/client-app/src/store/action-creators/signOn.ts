import {Dispatch} from "redux";
import {SignOnActions, SignOnActionTypes} from "../types/signOnTypes";

export interface SignOn {
    userName: string  | null,
    password: string | null,
    confirmPassword: string  | null
}

export const enterUsername = (userName: string) => {
    return async (dispatch: Dispatch<SignOnActions>) => {
        return dispatch({type: SignOnActionTypes.EnterUserName, payload: userName})
    }
}

export const enterPassword = (password : string) => {
    return async (dispatch: Dispatch<SignOnActions>) => {
        return dispatch({type: SignOnActionTypes.EnterPassword, payload: password})
    }
}

export const enterConfirmPassword = (confirmPassword: string) => {
    return async (dispatch: Dispatch<SignOnActions>) => {
        return dispatch({type: SignOnActionTypes.EnterConfirmPassword, payload: confirmPassword})
    }
}

export const submitForm = (singOn: SignOn) => {
    return async (dispatch: Dispatch<SignOnActions>) => {
        
        try {
            if(singOn.userName != null && singOn.confirmPassword == singOn.password)
            {
                return dispatch({type: SignOnActionTypes.SubmitFormSuccess})
            }
            return dispatch({type: SignOnActionTypes.SubmitFormError, payload: "Invalid form"})
        }
        catch {
            return dispatch({type: SignOnActionTypes.SubmitFormError, payload: "Error while submit from"})
        }
    }
}