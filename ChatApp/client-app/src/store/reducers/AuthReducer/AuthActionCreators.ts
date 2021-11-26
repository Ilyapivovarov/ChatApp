import {AppDispatch} from "../../index";
import Axios from "../../../common/axios";
import {Account, JwtToken, SignIn, SignUp} from "../../../types/dataTypes";
import {RequestResult} from "../../../common/RequestResult";
import {authSlice} from "./AuthSlice";
import jwtDecode from "jwt-decode";
import {createAsyncThunk} from "@reduxjs/toolkit";

// export const signIn = (signIn: SignIn) => async (dispatch: AppDispatch) => {
//     try {
//         const response = await Axios.post<RequestResult<JwtToken>>("auth/sign-in", signIn);
//         if (response.data.isSuccess) {
//             const account = jwtDecode<Account>(response.data.value.access_token)
//             if (account) {
//                 return dispatch(authSlice.actions.authSuccess(account))
//             }
//         }
//         dispatch(authSlice.actions.authError(response.data.errorMessage))
//
//     } catch {
//         dispatch(authSlice.actions.authError("Exception"))
//     }
// }
//
// export const signUp = (signUp: SignUp) => async (dispatch: AppDispatch) => {
//     try {
//         const response = await Axios.post<RequestResult<JwtToken>>("auth/sign-up", signUp);
//         if (response.data.isSuccess) {
//             const account = jwtDecode<Account>(response.data.value.access_token)
//             if (account) {
//                 return dispatch(authSlice.actions.authSuccess(account))
//             }
//         }
//         dispatch(authSlice.actions.authError(response.data.errorMessage))
//
//     } catch {
//         dispatch(authSlice.actions.authError("Exception"))
//     }
// }

export const authorize = createAsyncThunk(
    'authSlice/authorize',
    async (authModel: SignUp | SignIn, thunkAPI) => {
        try {
            const response = await Axios.post<RequestResult<JwtToken>>("auth", authModel)
            if (response.data.isSuccess){
                const account = jwtDecode<Account>(response.data.value.access_token)
                if (account)
                    return account;
            }
            return response.data.errorMessage
        }
        catch{
            return "Unknown error"
        }
    }
)