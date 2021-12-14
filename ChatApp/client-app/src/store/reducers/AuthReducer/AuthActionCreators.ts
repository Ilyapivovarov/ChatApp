import Axios from "../../../common/axios";
import {Account, JwtToken, SignIn, SignUp} from "../../../types/dataTypes";
import jwtDecode from "jwt-decode";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AccessTokenKey} from "../../../common/global";

export const resetAuthState = createAsyncThunk(
    'authSlice/reset-auth-state',
    async (_, thunkAPI) => {
    }
)

export const signIn = createAsyncThunk(
    'authSlice/sing-in',
    async (authModel: SignIn, thunkAPI) => {
        const response = await Axios.post<JwtToken>("auth/sign-in", authModel)
        if (response.status == 200) {
            if (response.data) {
                const account = jwtDecode<Account>(response.data.access_token)
                if (account) {
                    localStorage.setItem(AccessTokenKey, response.data.access_token)
                    return account;
                }
            }
        } else {
            return thunkAPI.rejectWithValue(response.data)
        }
    }
)

export const signUp = createAsyncThunk(
    'authSlice/sign-up',
    async (authModel: SignUp, thunkAPI) => {
        const response = await Axios.post<JwtToken>("auth/sign-up", authModel)
        if (response.status == 200) {
            const account = jwtDecode<Account>(response.data.access_token)
            if (account) {
                localStorage.setItem(AccessTokenKey, response.data.access_token)
                return account;
            }
        } else {
            return thunkAPI.rejectWithValue(response.data)
        }
    }
)

export const validateToken = createAsyncThunk(
    'authSlice/validateToken',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem(AccessTokenKey);
            if (token) {
                const account = jwtDecode<Account>(token);
                if (account && IsTokenExpValid(account.exp)) {
                    return account;
                }
            }
            return thunkAPI.rejectWithValue("New auth again");
        } catch {
            return thunkAPI.rejectWithValue("Unknown error while validate token");
        }
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