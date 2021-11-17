import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import * as userActionCreator from "../store/reducers/authReducer/authActionCreator"


export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(userActionCreator, dispatch)
}

