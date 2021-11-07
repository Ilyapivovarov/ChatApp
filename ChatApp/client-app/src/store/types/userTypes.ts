export enum UserActionType {
    SIGN_IN_USER_SUCCESS = "SIGN_IN_USER_SUCCESS",
    SIGN_IN_USER_ERROR = "SIGN_IN_USER_ERROR",
    SING_OUT_USER = "SING_OUT_USER"
}

export interface UserState {
    userName: CurrentUser | null ,
    isAuthorized: boolean,
    error: null | string,
}

interface SingInUserSuccess {
    type: UserActionType.SIGN_IN_USER_SUCCESS,
    payload: CurrentUser
}
 
interface SingInUserError {
    type: UserActionType.SIGN_IN_USER_ERROR,
    payload: string
}

interface SignOutUser {
    type: UserActionType.SING_OUT_USER,
}

export interface SignIn {
    username: string,
    password: string
}

export interface CurrentUser {
    id:string
    username: string,
    
}

export type UserAction = SingInUserSuccess | SingInUserError | SignOutUser