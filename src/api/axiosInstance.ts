import * as axiosLib from "axios";

export const API_URL = "http://localhost:8080";

export const axiosInstance = axiosLib.default.create({
    baseURL: API_URL,
    // Allow CORS
    //withCredentials: true,
    headers: {
        //'Access-Control-Allow-Origin': '*',
    }
});