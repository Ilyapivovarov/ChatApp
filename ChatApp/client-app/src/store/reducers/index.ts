import {combineReducers} from "redux"
import {authReducer} from "./authReducer/authReducer";
import {roomReducer} from "./roomReducer/roomReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    room: roomReducer
})

export type RootState = ReturnType<typeof rootReducer>