import {SignOnActions, SignOnActionTypes, SignUpSate} from "../types/signOnTypes";

const initSate: SignUpSate = {
    userName: null,
    password: null,
    confirmPassword: null,
    error: null,
    isValid: false
};

const maxLength = 4;

const userNameValidator = (userName : string | null) : boolean => {
    return userName != null && userName.length > maxLength;
}

const passwordValidator = (password: string | null, confirmPassword : string | null) : boolean => {
    return password != null && password.length > maxLength 
    && password == confirmPassword;
}

export const singOnReducer = (state = initSate, action: SignOnActions): SignUpSate => {
    switch (action.type) {
        case SignOnActionTypes.EnterUserName: {
            return {
                userName: action.payload,
                error: null,
                password: state.password,
                confirmPassword: state.password,
                isValid: userNameValidator(action.payload) && passwordValidator(state.password, state.confirmPassword)
            };
        }
        case SignOnActionTypes.EnterPassword: {
            return {
                userName: state.userName,
                error: null,
                password: action.payload,
                confirmPassword: state.confirmPassword,
                isValid: userNameValidator(state.userName) && passwordValidator(action.payload, state.confirmPassword)
            };
        }
        case SignOnActionTypes.EnterConfirmPassword: {
            return {
                userName: state.userName,
                error: null,
                password: state.password,
                confirmPassword: action.payload,
                isValid: userNameValidator(state.userName) && passwordValidator(state.password, action.payload)
            };
        }
        case SignOnActionTypes.SubmitFormSuccess: {
            return {
                password: state.password, 
                confirmPassword: state.confirmPassword,
                error: null, 
                userName: state.userName,
                isValid: action.payload
            }
        }
        case SignOnActionTypes.SubmitFormError: {
            return {
                password: state.password, 
                confirmPassword: state.confirmPassword,
                error: action.payload, 
                userName: state.userName,
                isValid: false
            }
        }
        default: {
            return state;
        }
    }
}