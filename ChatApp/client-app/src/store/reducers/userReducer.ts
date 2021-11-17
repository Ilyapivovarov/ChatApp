import {UserAction, UserActionType, UserState} from "../types/userTypes";

const initState: UserState = {
    currentUser: null,
    isAuthorized: false,
    error: null
}

export const userReducer = (state = initState, action : UserAction): UserState => {
    switch (action.type) {
        case UserActionType.SIGN_IN_USER_SUCCESS: {
            return {isAuthorized: true, error: null, currentUser: action.payload}
        }
        case  UserActionType.SIGN_IN_USER_ERROR: {
            return {isAuthorized: false, error: action.payload, currentUser: null}
        }
        case UserActionType.SIGN_OUT_USER: {
            return {isAuthorized: false, error: null, currentUser: null}
        }
        case UserActionType.SIGN_UP_USER_SUCCESS:{
            return {isAuthorized: true, error: null, currentUser: action.payload}
        }
        default:
            return state
    }
};