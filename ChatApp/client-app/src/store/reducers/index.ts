import {combineReducers} from "redux"
import {userReducer} from "./userReducer";
import {roomReducer} from "./roomReducer";
import {singOnReducer} from "./signOnReducer";

export const rootReducer = combineReducers({
    users: userReducer,
    rooms: roomReducer,
    signOn: singOnReducer
})

export type RootState = ReturnType<typeof rootReducer>