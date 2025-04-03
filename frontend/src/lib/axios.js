import axios from "axios";

export const axiosInstance = axios.create({
    //for dev and render diff links.
    baseURL : import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api", 
    withCredentials : true
    //sending cookies in each request.
})








