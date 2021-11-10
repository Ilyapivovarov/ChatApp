import {SignOnActions, SignOnActionTypes, SignOnSate} from "../types/signOnTypes";

const initSate: SignOnSate = {
    userName: null,
    password: null,
    confirmPassword: null,
    isValid: false,
    error: null
}

const checkState = (state: SignOnSate): boolean => {
    if (state.userName != null)
        if (state.password == state.confirmPassword)
            return true;
    return false;
}

export const singOnReducer = (state: SignOnSate = initSate, action: SignOnActions): SignOnSate => {
    console.log(state)
    switch (action.type) {
        case SignOnActionTypes.EnterUserName: {
            return {
                userName: action.payload,
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
                    password: action.payload,
                    confirmPassword: state.password,
                    isValid: true
                };

            return {
                userName: state.userName,
                error: "Error password",
                password: state.password,
                confirmPassword: action.payload,
                isValid: false
            };
        }
        case SignOnActionTypes.EnterConfirmPassword: {
            if (checkState(state))
                return {
                    userName: state.userName,
                    error: null,
                    password: state.password,
                    confirmPassword: action.payload,
                    isValid: true
                };

            return {
                userName: state.userName,
                error: "Error password",
                password: state.password,
                confirmPassword: action.payload,
                isValid: false
            };
        }
        case SignOnActionTypes.SubmitFormSuccess: {
            console.log("Sibmit")
            return state
        }
        case SignOnActionTypes.SubmitFormError: {
            return {
                password: state.password, confirmPassword: state.confirmPassword,
                isValid: false, error: "SignOnActionTypes.SubmitFormError", userName: state.userName
            }
        }
        default: {
            return state;
        }
    }
}