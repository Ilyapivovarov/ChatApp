export enum SignOnActionTypes {
    EnterUserName,
    EnterPassword,
    EnterConfirmPassword,
    SubmitFormSuccess,
    SubmitFormError
}

export interface SignUpSate {
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

export interface SubmitFormSuccessAction {
    type: SignOnActionTypes.SubmitFormSuccess,
}

export interface SubmitFormErrorAction {
    type: SignOnActionTypes.SubmitFormError,
    payload: string,
}

export type SignOnActions = EnterUserNameAction | EnterPasswordAction | EnterConfirmPasswordAction
    | SubmitFormSuccessAction | SubmitFormErrorAction