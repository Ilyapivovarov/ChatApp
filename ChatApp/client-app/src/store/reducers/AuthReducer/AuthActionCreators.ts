import Axios from "../../../common/axios";
import {Account, JwtToken, SignIn, SignUp} from "../../../types/dataTypes";
import {RequestResult} from "../../../common/RequestResult";
import jwtDecode from "jwt-decode";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AccessTokenKey} from "../../../common/global";

export const signIn = createAsyncThunk(
    'authSlice/authorize',
    async (authModel: SignIn, thunkAPI) => {
        try {
            const response = await Axios.post<RequestResult<JwtToken>>("auth/sign-in", authModel)
            if (response.data.isSuccess) {
                const account = jwtDecode<Account>(response.data.value.access_token)
                if (account) {
                    localStorage.setItem(AccessTokenKey, response.data.value.access_token)
                    return account;
                }

            }
            return response.data.errorMessage
        } catch {
            return "Unknown error"
        }
    }
)

export const signUp = createAsyncThunk(
    'authSlice/authorize',
    async (authModel: SignUp, thunkAPI) => {
        try {
            const response = await Axios.post<RequestResult<JwtToken>>("auth/sign-up", authModel)
            if (response.data.isSuccess) {
                const account = jwtDecode<Account>(response.data.value.access_token)
                if (account) {
                    localStorage.setItem(AccessTokenKey, response.data.value.access_token)
                    return account;
                }

            }
            return response.data.errorMessage
        } catch {
            return "Unknown error"
        }
    }
)

export const validateToken = createAsyncThunk(
    'authSlice/validateToken',
    async (_, thunkAPI) => {
        const token = localStorage.getItem(AccessTokenKey);
        if (token) {
            const account = jwtDecode<Account>(token);
            if (account && IsTokenExpValid(account.exp)) {
                return account;
            }
        }
        return null;
    });

const IsTokenExpValid = (tokenExp: number): boolean => {
    const exp = new Date(0);
    exp.setUTCSeconds(tokenExp);
    let now = new Date();
    return exp > now
}

export const signOut = createAsyncThunk(
    "authSlice/signOut",
    async (_, thunkAPI) => {
        localStorage.removeItem(AccessTokenKey);
    })