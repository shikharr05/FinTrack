import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const useUserAuth = () => {
    const { user, updateUser, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect( () => {
      if (user) return; //if user is already present do nothing just return like first time after login nhi aarha!

      let isMounted = true; //Ye ek flag hai jo track karega ki component abhi mounted hai ya nahi. Zarurat isliye hai, kyunki agar API response tab aaye jab component unmount ho chuka hai → React warning aayegi agar tum state update karoge. // basically agr user us page se chala jayega to wo component unMount hojayega to agr api call ke baad result aabhi jaata hai to bhi display krne ka fayeda nhi kyuki component unmount ho chuka hai

      const fetchUserInfo = async () => {
        try {
          const response = await axiosInstance.get(
            API_PATHS.AUTH.GET_USER_INFO
          );

          if (isMounted && response.data) {
            updateUser(response.data); //agr component mounted hai data bhi aagya to update krdo user ko
          }
        } catch (error) {
          console.error("Failed to fetch user info", error);
          if (isMounted) {
            clearUser();
            navigate("/login"); //agr data nhi aa paya mtlb kuch token expire hochuka hai to login page pe navigate krdo and logout krdo
          }
        }
      };
      fetchUserInfo(); //calling above function..
      return () => {
        isMounted = false; // ye ek cleanup function hai jisse jb component unmount hojayega to false hojaye
      };
    }, [updateUser, clearUser, navigate])  //Effect tab run karega jab ye functions/values change hote hain (mostly ek hi baar run karega on mount).
}