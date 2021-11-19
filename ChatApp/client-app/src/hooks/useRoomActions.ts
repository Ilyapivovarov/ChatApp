import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import * as roomActionCreators  from "../store/reducers/roomReducer/roomActionCreators";

export const useRoomActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(roomActionCreators, dispatch)
}