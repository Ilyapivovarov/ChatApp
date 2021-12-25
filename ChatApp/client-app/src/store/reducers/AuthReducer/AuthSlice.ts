import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthState} from "./AuthTypes";
import {resetAuthState, signIn, signOut, signUp, validateToken} from "./AuthActionCreators";
import {User} from "../../../common/types";

const initialState: AuthState = {
    currentUser: null,
    isAuth: false,
    error: null,
}

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        authSuccess(state, action: PayloadAction<User>) {
            state.isAuth = true;
            state.currentUser = action.payload
        },
        authError(state, action: PayloadAction<string>) {
            state.isAuth = false;
            state.error = action.payload;
        }
    },
    extraReducers: {
        [resetAuthState.fulfilled.type](state) {
            state.error = null;
            state.isAuth = false;
            state.currentUser = null
        },
        [signIn.fulfilled.type](state, action: PayloadAction<User>) {
            state.isAuth = true;
            state.currentUser = action.payload
            state.error = null;
        },
        [signIn.rejected.type](state, action: PayloadAction<string>) {
            state.currentUser = null;
            state.isAuth = false;
            state.error = action.payload;
        },
        [signUp.fulfilled.type](state, action: PayloadAction<User>) {
            state.isAuth = true;
            state.currentUser = action.payload;
            state.error = null;
        },
        [signUp.rejected.type](state, action: PayloadAction<string>) {
            state.isAuth = false;
            state.currentUser = null;
            state.error = action.payload;
        },
        [validateToken.fulfilled.type](state, action: PayloadAction<User>) {
            state.currentUser = action.payload;
            state.isAuth = true;
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