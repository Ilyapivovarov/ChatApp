import {UserAction, UserActionType} from "../types/userTypes";
import {Dispatch} from "redux";

export const signInUser = (userName: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        if (!localStorage.getItem("user")) {
            localStorage.setItem("user", userName)
            dispatch({type: UserActionType.SIGN_IN_USER_SUCCESS, payload: userName})
        } else {
            dispatch({
                type: UserActionType.SIGN_IN_USER_ERROR,
                payload: "Такой пользователь уже существует"
            })
        }
    }
}