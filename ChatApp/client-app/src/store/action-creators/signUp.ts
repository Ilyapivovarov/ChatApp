import {Dispatch} from "redux";
import {SignOnActions, SignOnActionTypes, SignOnSate} from "../types/signOnTypes";
import axios from "../../common/http-common"

export interface SignOn {
    userName: string | null,
    password: string | null,
    confirmPassword: string | null
}

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

export const submitForm = (signUp: SignOnSate) => {
    return async (dispatch: Dispatch<SignOnActions>) => {
        console.log("asfa")
        try {
            if (signUp.userName != null && signUp.confirmPassword == signUp.password) {
                try {
                    const response = await axios.post("User/sign-up",
                        {
                            userName: signUp.userName,
                            password: signUp.password,
                            confirmPassword: signUp.confirmPassword
                        })

                    console.log(response)
                    
                    return dispatch({type: SignOnActionTypes.SubmitFormSuccess})
                } catch {
                    return dispatch({type: SignOnActionTypes.SubmitFormError, payload: "Invalid form"})
                }

            }
            return dispatch({type: SignOnActionTypes.SubmitFormError, payload: "Invalid form"})
        } catch {
            return dispatch({type: SignOnActionTypes.SubmitFormError, payload: "Error while submit from"})
        }
    }
}