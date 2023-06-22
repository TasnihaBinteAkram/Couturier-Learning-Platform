import { useQuery } from "@tanstack/react-query";
import {useAxiosSecure} from './useAxiosSecure';
import { useAuth } from "./useAuth";

export const useAdmin = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !!user?.email && !!localStorage.getItem('access-token'),
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/users/admin/${user?.email}`);
        // console.log(res.data);
        return res.data.admin;
      }
    },
  });
  return {isAdmin, isAdminLoading};
};