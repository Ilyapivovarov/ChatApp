import {User} from "../../../common/types";

export interface AuthState {
    currentUser: User | null ,
    isAuth: boolean,
    error: string | null
}

