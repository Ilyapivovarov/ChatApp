import {combineReducers} from "redux"
import {userReducer} from "./userReducer";
import {roomReducer} from "./roomReducer";
import {singUpReducer} from "./signUpReducer";

export const rootReducer = combineReducers({
    users: userReducer,
    rooms: roomReducer,
    signUp: singUpReducer
})

export type RootState = ReturnType<typeof rootReducer>