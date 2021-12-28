import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/AuthReducer/AuthSlice"
import {accountAPI} from "../servies/accountService";
import {chatAPI} from "../servies/chatService";

const rootReducers = combineReducers({
    authReducer,
    [chatAPI.reducerPath]: chatAPI.reducer,
    [accountAPI.reducerPath]: accountAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(chatAPI.middleware)
                .concat(accountAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducers>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']