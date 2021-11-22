import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import useActionCreators from "../store/reducers/actionCreatorActions"

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(useActionCreators, dispatch)
}

