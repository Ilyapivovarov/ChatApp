import {RoomAction, RoomActionTypes, RoomState} from "./roomReducerTypes";

const defaultState: RoomState = {
    room: null,
    isLoading: false,
    error: null,
}

export const roomReducer = (state = defaultState, action: RoomAction): RoomState => {
    switch (action.type) {
        case RoomActionTypes.Fetching: {
            return {room: null, isLoading: true, error: null}
        }
        case RoomActionTypes.Success: {
            return {room: action.payload, isLoading: false, error: null}
        }
        case RoomActionTypes.Error: {
            return {room: null, isLoading: false, error: action.payload}
        }
        default: {
            return state;
        }
    }
} 