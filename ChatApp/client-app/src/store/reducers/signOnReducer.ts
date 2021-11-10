import {SignOnActions, SignOnActionTypes, SignOnSate} from "../types/signOnTypes";

const initSate: SignOnSate = {
    userName: null,
    password: null,
    confirmPassword: null,
    isValid: false,
    error: null
}

const checkState = (state: SignOnSate = initSate): boolean => {
    if (state.userName != null)
        if (state.password == state.confirmPassword)
            return true;
    return false;
}

export const singOnReducer = (state: SignOnSate, action: SignOnActions): SignOnSate => {
    switch (action.type) {
        case SignOnActionTypes.EnterUserName: {
            return {
                userName: action.payload.userName,
                error: null,
                password: state.password,
                confirmPassword: state.password,
                isValid: checkState(state)
            };
        }
        case SignOnActionTypes.EnterPassword: {
            if (checkState(state))
                return {
                    userName: state.userName,
                    error: null,
                    password: action.payload.password,
                    confirmPassword: state.password,
                    isValid: true
                };

            return {
                userName: state.userName,
                error: "Error password",
                password: state.password,
                confirmPassword: state.password,
                isValid: false
            };
        }
        case SignOnActionTypes.EnterConfirmPassword: {
            if (checkState(state))
                return {
                    userName: state.userName,
                    error: null,
                    password: state.password,
                    confirmPassword: action.payload.confirmPassword,
                    isValid: true
                };

            return {
                userName: state.userName,
                error: "Error password",
                password: state.password,
                confirmPassword: state.confirmPassword,
                isValid: false
            };
        }
        case SignOnActionTypes.SubmitFormSuccess: {
            console.log("Sibmit")
            return state
        }
        case SignOnActionTypes.SubmitFormError: {
            return {
                password: action.payload.password, confirmPassword: action.payload.confirmPassword,
                isValid: false, error: "SignOnActionTypes.SubmitFormError", userName: action.payload.userName
            }
        }
        default: {
            return state;
        }
    }
}