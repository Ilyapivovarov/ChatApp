import {Dispatch} from "redux";
import {RoomAction, RoomActionTypes} from "./roomReducerTypes";
import axios from "../../../common/http-common";
import {RequestResult} from "../../../common/RequestResult";
import {Room} from "../../../types/dataTypes";

export const fetchRoom = (id : string) => {
    return  async (dispatch: Dispatch<RoomAction>) => {
        dispatch({type: RoomActionTypes.Fetching})
        try {
            const response = await axios.get<RequestResult<Room>>("room/" + id)
            if(response.data.isSuccess){
                return dispatch({type: RoomActionTypes.Success, payload: response.data.value})
            }
            return dispatch({type: RoomActionTypes.Error, payload: response.data.errorMessage})
        }
        catch (e) {
            return dispatch({type: RoomActionTypes.Error, payload: "Exception"})
        }
    }
}