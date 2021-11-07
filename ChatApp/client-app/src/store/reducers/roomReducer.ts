import {RoomActions, RoomActionTypes, RoomState} from "../types/roomTypes";

export const initState: RoomState = {
    room: null,
    loading: false,
    error: null
}

export const roomReducer = (state = initState, action: RoomActions): RoomState => {
    switch (action.type) {
        case RoomActionTypes.LOAD_ROOM_SUCCESS: {
            return {room: action.payload, error: null, loading: false}
        }
        case RoomActionTypes.FETCH_ROOM : {
            return {room: null, error: null, loading: true}
        }
        case RoomActionTypes.LOAD_ERROR: {
            return {room: null, error: "Error while loading room", loading: false}
        }
        default: {
            return state;
        }
    }
}