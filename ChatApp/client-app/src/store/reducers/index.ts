import {combineReducers} from "redux"
import {userReducer} from "./userReducer";
import {roomReducer} from "./roomReducer";
import {singOnReducer} from "./signUpReducer";

export const rootReducer = combineReducers({
    users: userReducer,
    rooms: roomReducer,
    signOn: singOnReducer
})

export type RootState = ReturnType<typeof rootReducer>