import {Account} from "../../../types/dataTypes";

export enum AuthActionTypes {
    FetchingUser,
    AuthSuccess,
    AuthError,
    SignOut,
    Reset
}

export interface AuthFetchingUser {
    type: AuthActionTypes.FetchingUser
    payload: boolean,
}

export interface AuthSuccess {
    type: AuthActionTypes.AuthSuccess,
    payload: Account
}

export interface AuthError {
    type: AuthActionTypes.AuthError,
    payload: string
}

export interface AuthSignOut {
    type: AuthActionTypes.SignOut
}

export interface AuthReset {
    type: AuthActionTypes.Reset
}

export type AuthActions = AuthFetchingUser | AuthSuccess | AuthError | AuthSignOut | AuthReset

export interface AuthState {
    currentUser: Account | null,
    isAuthorized: boolean,
    error: string | null,
}