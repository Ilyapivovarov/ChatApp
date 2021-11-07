import {Room} from "../../types/dataTypes";

export interface RoomState {
    room: Room | null,
    loading: boolean,
    error: string | null
}

export enum RoomActionTypes {
    FETCH_ROOM,
    LOAD_ROOM_SUCCESS,
    LOAD_ERROR
}

export interface FetchCurrentRoom {
    type: RoomActionTypes.FETCH_ROOM,
    payload: boolean,
}

export interface LoadCurrentRoomSuccess {
    type: RoomActionTypes.LOAD_ROOM_SUCCESS,
    payload: Room,
}

export interface LoadError {
    type: RoomActionTypes.LOAD_ERROR,
    payload: string,
}

export type RoomActions = FetchCurrentRoom | LoadCurrentRoomSuccess | LoadError