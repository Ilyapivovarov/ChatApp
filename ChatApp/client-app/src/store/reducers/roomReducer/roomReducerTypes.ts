import {Room} from "../../../types/dataTypes";

export interface RoomState {
    room: Room | null,
    error: string | null,
    isLoading: boolean
}

export enum RoomActionTypes {
    Fetching,
    Success,
    SendingMessage,
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

export interface RoomActionSendingMessage {
    type: RoomActionTypes.SendingMessage,
}

export type RoomAction = RoomActionFetching | RoomActionSuccess | RoomActionError | RoomActionSendingMessage

