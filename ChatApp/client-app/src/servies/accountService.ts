import Axios from "../common/axios";
import {RequestResult} from "../common/RequestResult";
import {Account} from "../types/dataTypes";

export const fetchAccount = (id: string | number) => {
    return "gasg";
    // return Axios.get<RequestResult<Account>>("")
    //     .then(response => {
    //         return response.data;
    //     })
}