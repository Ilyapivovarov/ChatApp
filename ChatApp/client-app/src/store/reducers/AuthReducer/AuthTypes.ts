import {Account} from "../../../types/dataTypes";

export interface AuthState {
    currentUser: Account | null ,
    isAuth: boolean,
    error: string | null
}

