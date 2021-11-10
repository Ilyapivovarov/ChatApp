import {SignOn} from "../action-creators/signOn";

export enum SignOnActionTypes {
    EnterUserName,
    EnterPassword,
    EnterConfirmPassword,
    SubmitFormSuccess,
    SubmitFormError
}

export interface SignOnSate {
    userName: null | string,
    password: null | string,
    confirmPassword: null | string,
    isValid: boolean,
    error: null | string
}

export interface EnterUserNameAction {
    type: SignOnActionTypes.EnterUserName,
    payload: string,
}

export interface EnterPasswordAction {
    type: SignOnActionTypes.EnterPassword,
    payload: string,
}

export interface EnterConfirmPasswordAction {
    type: SignOnActionTypes.EnterConfirmPassword,
    payload: string,
}

export interface SubmitFormSuccessAction {
    type: SignOnActionTypes.SubmitFormSuccess,
    payload: boolean,
}

export interface SubmitFormErrorAction {
    type: SignOnActionTypes.SubmitFormError,
    payload: boolean,
}

export type SignOnActions = EnterUserNameAction | EnterPasswordAction | EnterConfirmPasswordAction
    | SubmitFormSuccessAction | SubmitFormErrorAction