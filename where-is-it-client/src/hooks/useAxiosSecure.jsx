import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

const useAxiosSecure = () => {
    const { signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();


    // axios interceptor

    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response
        }, error => {
            console.log('error caught in interceptor', error);

            if (error.status === 401 || error.status === 403) {
                console.log('Need to logout the user');
                signOutUser()
                    .then(() => {
                        console.log('logged out user');
                        navigate('/login')
                    })
                    .catch(error => console.log(error))
            }
            return Promise.reject(error)
        }
        )
    }, [navigate, signOutUser])

    return axiosInstance;
};

export default useAxiosSecure;