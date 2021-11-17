import {Account} from "../../types/dataTypes";

export enum UserActionType {
    SIGN_IN_USER_SUCCESS ,
    SIGN_IN_USER_ERROR,
    SIGN_OUT_USER ,
    SIGN_UP_USER_SUCCESS,
}

export interface UserState {
    currentUser: Account | null ,
    isAuthorized: boolean,
    error: null | string,
}

interface SingInUserSuccess {
    type: UserActionType.SIGN_IN_USER_SUCCESS,
    payload: Account
}
 
interface SingInUserError {
    type: UserActionType.SIGN_IN_USER_ERROR,
    payload: string
}

export interface SignUpUserSuccess {
    type: UserActionType.SIGN_UP_USER_SUCCESS,
    payload: Account
}

interface SignOutUser {
    type: UserActionType.SIGN_OUT_USER,
}



export interface SignIn {
    username: string,
    password: string
}



export type UserAction = SingInUserSuccess | SingInUserError | SignOutUser | SignUpUserSuccess