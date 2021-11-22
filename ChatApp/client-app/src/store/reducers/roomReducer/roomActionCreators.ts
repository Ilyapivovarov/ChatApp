import {Dispatch} from "redux";
import {RoomAction, RoomActionTypes} from "./roomReducerTypes";
import axios from "../../../common/http-common";
import {RequestResult} from "../../../common/RequestResult";
import {Message, Room} from "../../../types/dataTypes";

export const fetchRoom = (id: string) => {
    return async (dispatch: Dispatch<RoomAction>) => {
        dispatch({type: RoomActionTypes.Fetching})
        try {
            axios.get<RequestResult<Room>>("room/" + id)
                .then(response => {
                    if (response.data.isSuccess) {
                        dispatch({type: RoomActionTypes.Success, payload: response.data.value})
                    } else {
                        dispatch({type: RoomActionTypes.Error, payload: response.data.errorMessage})
                    }
                })
        } catch (e) {
            dispatch({type: RoomActionTypes.Error, payload: "Exception"})
        }
    }
}

export const sendMessage = (id: string, message: Message) => {
    return async (dispatch: Dispatch<RoomAction>) => {
        await axios.post("room/send-message/" + id, message)
        // dispatch({type: RoomActionTypes.SendingMessage})
    }
} 