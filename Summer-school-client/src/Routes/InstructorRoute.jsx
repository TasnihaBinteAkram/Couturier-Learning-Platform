import React from 'react';
import { useInstructor } from '../Hooks/useInstructor';
import { useAuth } from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const InstructorRoute = ({children}) => {
    const {isInstructor, isInstructorLoading} = useInstructor();
    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading || isInstructorLoading){
        return <div className='h-screen flex items-center justify-center'><span className="loading loading-spinner loading-lg"></span></div>
    }

    if(user && isInstructor){
        return children
    }

    return <Navigate to='/' state={{from: location}} replace></Navigate>
};

export default InstructorRoute;