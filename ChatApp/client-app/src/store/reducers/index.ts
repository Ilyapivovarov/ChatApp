import {combineReducers} from "redux"
import {authReducer} from "./authReducer/authReducer";
import {roomReducer} from "./roomReducer/roomReducer";

export const rootReducer = combineReducers({
    room: roomReducer,
    auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>