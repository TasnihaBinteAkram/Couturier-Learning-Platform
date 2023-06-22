import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useCourses = () =>{
    const {data:courses, isLoading:isCoursesLoading, refetch} = useQuery({
        queryKey: ['courses'],
        queryFn: async ()=>{
            const res = await axios.get('https://couturier-server.vercel.app/classes');
            return res.data
        }
    })
    return {courses, isCoursesLoading, refetch}
}