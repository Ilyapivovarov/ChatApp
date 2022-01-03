import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/AuthReducer/AuthSlice"
import {userAPI} from "../servies/userService";
import {chatAPI} from "../servies/chatService";

const rootReducers = combineReducers({
    authReducer,
    [chatAPI.reducerPath]: chatAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(chatAPI.middleware)
                .concat(userAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducers>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']