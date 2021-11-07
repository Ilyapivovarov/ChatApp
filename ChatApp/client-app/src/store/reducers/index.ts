import {combineReducers} from "redux"
import {userReducer} from "./userReducer";
import {roomReducer} from "./roomReducer";

export const rootReducer = combineReducers({
    users: userReducer,
    rooms: roomReducer
})

export type RootState = ReturnType<typeof rootReducer>