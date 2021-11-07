import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import * as roomActionCreator from "../store/action-creators/room"


export const useRoomActionCreator = () => {
    const dispatch = useDispatch();
    return bindActionCreators(roomActionCreator, dispatch)
}