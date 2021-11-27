import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/AuthReducer/AuthSlice"

const rootReducers = combineReducers({
    authReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducers
    })
}

export type RootState = ReturnType<typeof rootReducers>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']