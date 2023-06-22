import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdmin } from '../Hooks/useAdmin';
import { useAuth } from '../Hooks/useAuth';
import { useInstructor } from '../Hooks/useInstructor';

const StudentRoute = ({children}) => {
    const {user, loading} = useAuth()
    const {isAdmin, isAdminLoading} = useAdmin();
    const {isInstructor, isInstructorLoading} = useInstructor();
    const location = useLocation();

    if(loading || isAdminLoading || isInstructorLoading){
        return <div className='h-screen flex items-center justify-center'><span className="loading loading-spinner loading-lg"></span></div>
    }

    if(user && !isAdmin && !isInstructor){
        return children
    }

    return <Navigate to='/' state={{from: location}} replace></Navigate>
};
export default StudentRoute;