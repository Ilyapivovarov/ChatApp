import {Dispatch} from "redux";
import {RoomActions, RoomActionTypes} from "../types/roomTypes";
import axios from "../../common/http-common"
import {Room} from "../../types/dataTypes";


export const fetchRoom = (id: string) => {
    return async (dispatch: Dispatch<RoomActions>) => {
        try {
            dispatch({type: RoomActionTypes.FETCH_ROOM})
            const response = await axios.get<Room>("Room/"+ id);
            dispatch({type: RoomActionTypes.LOAD_ROOM_SUCCESS, payload: response.data})
        } catch (e) {
            dispatch({type: RoomActionTypes.LOAD_ERROR, payload: "Error while fetching data"})
        }
    }
}