import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthState} from "./AuthTypes";
import {Account} from "../../../types/dataTypes";
import {signIn, signOut, signUp, validateToken} from "./AuthActionCreators";
import {stat} from "fs";

const initialState: AuthState = {
    currentUser: null,
    isAuth: false,
    error: null,
}

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        authSuccess(state, action: PayloadAction<Account>) {
            state.isAuth = true;
            state.currentUser = action.payload
        },
        authError(state, action: PayloadAction<string>) {
            state.isAuth = false;
            state.error = action.payload;
        },
        authReset(state) {
            state.currentUser = null;
            state.isAuth = false;
            state.error = null;
        }
    },
    extraReducers: {
        [signIn.fulfilled.type](state, action: PayloadAction<Account>) {
            state.isAuth = true;
            state.currentUser = action.payload
            state.error = null;
        },
        [signIn.rejected.type](state, action: PayloadAction<string>) {
            state.currentUser = null;
            state.isAuth = false;
            state.error = action.payload;
        },
        [signUp.fulfilled.type](state, action: PayloadAction<Account>) {
            state.isAuth = true;
            state.currentUser = action.payload
        },
        [signUp.rejected.type](state, action: PayloadAction<string>) {
            state.currentUser = null;
            state.isAuth = false;
            state.error = action.payload;
        },
        [validateToken.fulfilled.type](state, action: PayloadAction<Account>) {
            state.currentUser = action.payload;
            state.isAuth = action.payload != null;
            state.error = null;
        },
        [signOut.fulfilled.type](state) {
            state.currentUser = null;
            state.isAuth = false;
            state.error = null;
        }
    }
})

export default authSlice.reducer;