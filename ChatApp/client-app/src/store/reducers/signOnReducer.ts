enum SingOnActionTypes {
    
}


interface SignOnReducerSate {
    userName: null | string,
    password: null | string,
    confirmPassword: null | string,
    isValid: false,
    error: null | string
}

const initSate : SignOnReducerSate = {
    userName: null,
    password: null,
    confirmPassword: null,
    isValid: false,
    error: null
}

export const singOnReducer = (state : SignOnReducerSate, action) => {
  
}