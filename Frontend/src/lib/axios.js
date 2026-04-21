//used to send request of frontend to the backend

import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5173/api",
    withCredentials: true // send the cookies with the request
});