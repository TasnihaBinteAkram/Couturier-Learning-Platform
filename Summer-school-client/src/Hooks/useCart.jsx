import { useQuery } from "@tanstack/react-query"
import { useAxiosSecure } from "./useAxiosSecure";
import { useAuth } from "./useAuth";

export const useCart = ()=> {
    const {user, loading} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {data: cartCourses, isLoading: isCartLoading, refetch} = useQuery({
    queryKey: ['cart-courses', user?.email],
    enabled: !loading && !!user?.email && !!localStorage.getItem('access-token'),
    queryFn: async ()=> {
        if(user?.email){
            const res = await axiosSecure.get(`/enrolledbyemail/${user?.email}`)
            return res.data
        }
    }
    })
    return {cartCourses, isCartLoading, refetch}
}