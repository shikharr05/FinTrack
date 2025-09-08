//axios is basically used to make requests to server
import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL, // every request will start with this URL
    timeout: 10000, // if server does not respond in 10 seconds then axios will cancel the request
    headers: {
        "Content-Type": "application/json", //this means sending data in json format    
        Accept: "application/json" // we expect server to return data in json format
    },
});

//request interceptor   
//request interceptor is like a middleware...it runs everytime before the request actually goes out,
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
//the above thing done is this:
//config is our request that we made to the server but we need to prove to server that we are logged in and how can we do that?
//so for that we use our token that is stored with client in local storage... we basically add our token in header of the config so that when the request is recieved by the server it can verify and check that we are logged in and complete the request.
//and if there is any error it rejects the request stating the error...



//response interceptor
//this runs after the server sends back the response or error...lets us handle the response gloabally and no need to repeat the handling with every axios fetch.
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
      //handle common errors globally
      if (error.response) {
        //means that server responded with an error status code like 400 || 401 || 500
        if (error.response.status === 401) {
          //redirect to login page
          window.location.href = "/login"; //this means token is expired and the user need to login again.
        } else if (error.response.status === 500) {
          console.error("Server Error! Please try again later!"); // Internal Server error
        }
      } else if (error.code === "ECONNABORTED") {
        console.error("Request timeout. Please try again.");
      }
      return Promise.reject(error); // this means I’m not handling this error fully here, I’m just adding some global logic. After that, I’ll still pass the error back to whoever called the API so they can decide what to do.”
    }
);

export default axiosInstance;