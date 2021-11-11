import {SignOnActions, SignOnActionTypes, SignOnSate} from "../types/signOnTypes";

const initSate: SignOnSate = {
    userName: null,
    password: null,
    confirmPassword: null,
    error: null
};

export const singOnReducer = (state = initSate, action: SignOnActions): SignOnSate => {
    switch (action.type) {
        case SignOnActionTypes.EnterUserName: {
            return {
                userName: action.payload,
                error: null,
                password: state.password,
                confirmPassword: state.password,
            };
        }
        case SignOnActionTypes.EnterPassword: {
            return {
                userName: state.userName,
                error: null,
                password: action.payload,
                confirmPassword: state.confirmPassword,
            };
        }
        case SignOnActionTypes.EnterConfirmPassword: {
            return {
                userName: state.userName,
                error: null,
                password: state.password,
                confirmPassword: action.payload,
            };
        }
        case SignOnActionTypes.SubmitFormSuccess: {
            console.log("Sibmit")
            return {
                password: state.password, 
                confirmPassword: state.confirmPassword,
                error: null, 
                userName: state.userName
            }
        }
        case SignOnActionTypes.SubmitFormError: {
            return {
                password: state.password, 
                confirmPassword: state.confirmPassword,
                error: action.payload, 
                userName: state.userName
            }
        }
        default: {
            return state;
        }
    }
}