import React from 'react';
import bg from '../../assets/banner/dashboardbanner.png'
import DashLink from './DashLink';
import { useAdmin } from '../../Hooks/useAdmin';
import { useInstructor } from '../../Hooks/useInstructor';

const TopBar = () => {
    const {isAdmin} = useAdmin();
    const {isInstructor}= useInstructor();
    const navlinks = (
        <>
        {isAdmin?
        <><DashLink item={"Manage Courses"} to={"/dashboard/manageclasses"}/>
        <DashLink item={"Manage Users"} to={"/dashboard/manageusers"}/></>
        :isInstructor?
        <><DashLink item={"Add Course"} to={"/dashboard/addclass"}/>
        <DashLink item={"My Courses"} to={"/dashboard/addedclasses"}/></>
        :<><DashLink item={"Selected Courses"} to={"/dashboard/selectedcourses"}/>
        <DashLink item={"Enrolled Courses"} to={"/dashboard/enrolledcourses"}/>
        <DashLink item={"Payment History"} to={"/dashboard/paymenthistory"}/></>
        }
        </>
    )
    return (
        <div style={{backgroundImage:`url(${bg})`}} className={`h-[400px] max-w-screen-2xl mx-auto bg-cover bg-center  flex justify-center items-center`}>
            <div className='bg-rose-100 bg-opacity-40 px-6 py-2 divide-x-2 divide-white rounded-lg'>
                {navlinks}
            </div>
        </div>
    );
};

export default TopBar;