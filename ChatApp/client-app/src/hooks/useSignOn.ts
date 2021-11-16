import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import * as signUpFormActionCreator from "../store/action-creators/signUpForm"


export const useSignOn = () => {
    const dispatch = useDispatch();
    return bindActionCreators(signUpFormActionCreator, dispatch)
}