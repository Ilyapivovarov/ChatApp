import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import * as signUpActionCreator from "../store/action-creators/signUp"


export const useSignOn = () => {
    const dispatch = useDispatch();
    return bindActionCreators(signUpActionCreator, dispatch)
}