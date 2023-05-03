import * as axiosLib from "axios";

export const API_URL = "http://192.168.1.131:8080";

export const axiosInstance = axiosLib.default.create({
    baseURL: API_URL,
    // Allow CORS
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
});