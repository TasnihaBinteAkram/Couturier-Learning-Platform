import { useQuery } from "@tanstack/react-query";
import { useAdmin } from "./useAdmin";
import { useAuth } from "./useAuth";
import { useAxiosSecure } from "./useAxiosSecure";

export const useUsers = () =>{
    const {user} = useAuth();
    const {isAdmin} = useAdmin();
    const [axiosSecure] = useAxiosSecure();
    const {data:users, refetch, isLoading: isUserLoading} = useQuery({
        queryKey: ['users', user?.email],
        enabled: !!user?.email && isAdmin,
        queryFn: async ()=> {
            if(isAdmin){
                const res = await axiosSecure.get('/users');
                return res.data   
            }
        }
    });
    return {users, refetch, isUserLoading}
}