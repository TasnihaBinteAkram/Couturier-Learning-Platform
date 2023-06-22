import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth"
import { useAxiosSecure } from "./useAxiosSecure";

export const useInstructor = ()=>{
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {data: isInstructor, isLoading: isInstructorLoading} = useQuery({
        queryKey: ['isInstructor', user?.email],
        enabled: !!user?.email && !!localStorage.getItem('access-token'),
        queryFn: async ()=> {
            if(user?.email){
                const res = await axiosSecure.get(`/users/instructor/${user.email}`);
                return res.data.instructor;
            }
        }
    })
    return {isInstructor, isInstructorLoading}
}