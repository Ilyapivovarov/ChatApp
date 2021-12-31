import axios from "axios";
import {BaseUrlApi} from "../global";

const token = localStorage.getItem("accessToken");
const Axios = axios.create({
    baseURL: BaseUrlApi,
    headers: {
        "Content-type": "application/json",
        "Authorization" : "Bearer " + token
    },
    responseType: "json",
    validateStatus: (s) : boolean => {
        return true
    }
});

export default Axios;