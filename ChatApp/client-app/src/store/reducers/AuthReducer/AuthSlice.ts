import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthState} from "./AuthTypes";
import {Account} from "../../../types/dataTypes";
import {authorize} from "./AuthActionCreators";

const initialState: AuthState = {
    currentUser: null,
    isAuth: false,
    error: null
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
        [authorize.fulfilled.type](state, action: PayloadAction<Account>) {
            state.isAuth = true;
            state.currentUser = action.payload
        },
        [authorize.rejected.type](state, action: PayloadAction<string>) {
            state.isAuth = false;
            state.error = action.payload;
        },
        [authorize.pending.type](state) {
            state.currentUser = null;
            state.isAuth = false;
            state.error = null;
        }
    }
})

export default authSlice.reducer;