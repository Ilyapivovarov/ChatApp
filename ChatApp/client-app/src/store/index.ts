import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/AuthReducer/AuthSlice"
import {roomAPI} from "../servies/roomService";

const rootReducers = combineReducers({
    authReducer,
    [roomAPI.reducerPath]: roomAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(roomAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducers>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']