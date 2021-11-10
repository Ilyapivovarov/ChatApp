import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import * as signOnActionCreator from "../store/action-creators/signOn"


export const useSignOn = () => {
    const dispatch = useDispatch();
    return bindActionCreators(signOnActionCreator, dispatch)
}