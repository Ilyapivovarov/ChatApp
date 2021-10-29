import {UserAction, UserActionType, UserState} from "../types/userTypes";

const initState: UserState = {
    userName: null,
    isAuthorized: false,
    error: null
}

export const userReducer = (state = initState, action : UserAction): UserState => {
    switch (action.type) {
        case UserActionType.SIGN_IN_USER_SUCCESS: {
            return {isAuthorized: true, error: null, userName: action.payload}
        }
        case  UserActionType.SIGN_IN_USER_ERROR: {
            return {isAuthorized: false, error: action.payload, userName: null}
        }
        case UserActionType.SING_OUT_USER: {
            return {isAuthorized: false, error: null, userName: null}
        }
        default:
            return state
    }
};