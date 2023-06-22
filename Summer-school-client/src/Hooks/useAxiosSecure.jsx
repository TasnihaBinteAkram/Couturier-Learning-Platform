import { useContext, useEffect } from "react"
import { AuthContext } from "../Providers/AuthProvider"
import { useNavigate } from "react-router-dom";
import axios from "axios";


const axiosSecure = axios.create({
    baseURL: 'https://couturier-server.vercel.app/'
});
export const useAxiosSecure = () => {
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(()=>{
        axiosSecure.interceptors.request.use((config)=>{
            const token = localStorage.getItem('access-token');
            if(token){
                config.headers.Authorization = `bearer ${token}`;
            }
            return config;
        });

        axiosSecure.interceptors.response.use(
           (response) => response,
           async (error) => {
            if(error.response && (error.response.status ===401 || error.response.status ===403)){
                await logout();
                // navigate('/login')
            }
            return Promise.reject(error);
           } 
        );
    }, [logout, navigate, axiosSecure]);
    
    return [axiosSecure];
};
