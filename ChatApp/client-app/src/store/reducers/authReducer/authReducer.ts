import {AuthActions, AuthActionTypes, AuthState} from "./authReducerTypes";

const defaultState: AuthState = {
    currentUser: null,
    isAuthorized: false,
    error: null,
}

export const authReducer = (state = defaultState, action: AuthActions): AuthState => {
    switch (action.type) {
        case AuthActionTypes.FetchingUser: {
            return {currentUser: null, error: null, isAuthorized: false}
        }
        case AuthActionTypes.AuthError: {
            return {currentUser: null, isAuthorized: false, error: action.payload}
        }
        case AuthActionTypes.AuthSuccess: {
            return {currentUser: action.payload, isAuthorized: true, error: null}
        }
        case AuthActionTypes.SignOut: {
            return defaultState;
        }
        default: {
            return state;
        }
    }
}