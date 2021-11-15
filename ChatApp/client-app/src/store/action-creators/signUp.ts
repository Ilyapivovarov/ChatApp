import {Dispatch} from "redux";
import {SignOnActions, SignOnActionTypes, SignUpSate} from "../types/signOnTypes";
import axios from "../../common/http-common"

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

export const submitForm = (signUp: SignUpSate) => {
    return async (dispatch: Dispatch<SignOnActions>) => {
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