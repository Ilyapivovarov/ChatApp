export enum SignOnActionTypes {
    EnterUserName,
    EnterPassword,
    EnterConfirmPassword,
    ResetFrom
}

export interface SignUpSate{
    userName: null | string,
    password: null | string,
    confirmPassword: null | string,
    error: null | string,
    isValid: boolean
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

export interface ResetFromAction {
    type: SignOnActionTypes.ResetFrom,
}

export type SignOnActions = EnterUserNameAction | EnterPasswordAction | EnterConfirmPasswordAction | ResetFromAction