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
      
                const response = await axios.post("User/sign-up",
                    {
                        userName: signUp.userName,
                        password: signUp.password,
                        confirmPassword: signUp.confirmPassword
                    })
                if (response.status == 200)
                    return dispatch({type: SignOnActionTypes.SubmitFormSuccess, payload: response.data})

                return dispatch({type: SignOnActionTypes.SubmitFormError, payload: response.data.message})
            }
            return dispatch({type: SignOnActionTypes.SubmitFormError, payload: "Invalid form"})
        } catch {
            return dispatch({type: SignOnActionTypes.SubmitFormError, payload: "Error while submit from"})
        }
    }
}