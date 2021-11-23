import axios from "axios";

const token = localStorage.getItem("accessToken");
const Axios = axios.create({
    baseURL: "https://localhost:5001/",
    headers: {
        "Content-type": "application/json",
        "Authorization" : "Bearer " + token
    }
});

export default Axios;