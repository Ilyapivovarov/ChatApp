import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/AuthReducer/AuthSlice"
import {roomAPI} from "../servies/roomService";
import {accountAPI} from "../servies/accountService";

const rootReducers = combineReducers({
    authReducer,
    [roomAPI.reducerPath]: roomAPI.reducer,
    [accountAPI.reducerPath]: accountAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(roomAPI.middleware)
                .concat(accountAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducers>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']