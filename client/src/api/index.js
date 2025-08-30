import config from "../config";
import axios from "axios";

const api = axios.create({
    baseURL: config.apiUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;