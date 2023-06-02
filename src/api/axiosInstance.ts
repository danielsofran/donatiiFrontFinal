import * as axiosLib from "axios";

export const API_URL = `http://192.168.0.105:8080`;

export const axiosInstance = axiosLib.default.create({
    baseURL: API_URL,
    // Allow CORS
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
    }
});