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
    payload: SignOn,
}

export interface EnterPasswordAction {
    type: SignOnActionTypes.EnterPassword,
    payload: SignOn,
}

export interface EnterConfirmPasswordAction {
    type: SignOnActionTypes.EnterConfirmPassword,
    payload: SignOn,
}

export interface SubmitFormSuccessAction {
    type: SignOnActionTypes.SubmitFormSuccess,
    payload: SignOn,
}

export interface SubmitFormErrorAction {
    type: SignOnActionTypes.SubmitFormError,
    payload: SignOn,
}

export type SignOnActions = EnterUserNameAction | EnterPasswordAction | EnterConfirmPasswordAction
    | SubmitFormSuccessAction | SubmitFormErrorAction