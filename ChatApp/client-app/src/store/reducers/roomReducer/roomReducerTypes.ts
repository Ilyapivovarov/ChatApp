import {Room} from "../../../types/dataTypes";

export interface RoomState {
    room: Room | null,
    error: string | null,
    isLoading: boolean
}

export enum RoomActionTypes {
    Fetching,
    Success,
    Error
}

export interface RoomActionSuccess {
    type: RoomActionTypes.Success
    payload: Room,
}

export interface RoomActionFetching {
    type: RoomActionTypes.Fetching,
}

export interface RoomActionError {
    type: RoomActionTypes.Error,
    payload: string,
}

export type RoomAction = RoomActionFetching | RoomActionSuccess | RoomActionError
