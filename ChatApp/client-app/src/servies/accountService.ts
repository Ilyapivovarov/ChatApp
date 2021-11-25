import Axios from "../common/axios";
import {RequestResult} from "../common/RequestResult";
import {Account} from "../types/dataTypes";

export const fetchAccount = async (id: string | number) => {
    return Axios.get<RequestResult<Account>>("/account/" + id)
        .then(response => {
            return response.data;
        })

}