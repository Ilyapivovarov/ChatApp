import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import useActionCreators from "../store/actionCreators"

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(useActionCreators, dispatch)
}

