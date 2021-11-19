import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import * as userAuthActionCreators from "../store/reducers/authReducer/authActionCreators"


export const useAuthActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(userAuthActionCreators, dispatch)
}

