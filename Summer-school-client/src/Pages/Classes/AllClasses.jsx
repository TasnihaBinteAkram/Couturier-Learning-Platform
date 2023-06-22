import React, { useEffect, useState } from 'react';
import SectionTitle from '../../Shared/SectionTitle';
import axios from 'axios';
import SideCard from './SideCard';
import HelmetTitle from '../../Components/extras/HelmetTitle';

const AllClasses = () => {
    const [courses, setCourses] = useState();
    useEffect(()=>{
        axios.get('https://couturier-server.vercel.app/approvedclasses')
        .then(res => setCourses(res.data))
    },[])
    return (
        <div className='max-w-screen-xl mx-auto mt-12 mb-36'>
            <HelmetTitle>Couturier | Classes</HelmetTitle>
            <SectionTitle
            title={"Our Courses"}
            sub={"Get your most desired course and learn with hundreds of students online"}
            ></SectionTitle>
            <section className='overflow-hidden mt-12 space-y-6 lg:w-4/5 mx-4 lg:mx-auto'>
                {
                    !!courses || <div className='h-screen flex items-center justify-center'><span className="loading loading-spinner loading-lg"></span></div>
                }

                {
                    courses?.length>0 && (courses?.map((course,i) => <SideCard
                    key={course._id}
                    course={course}
                    i={i}
                    ></SideCard>))
                }
                
            </section>
        </div>
    );
};

export default AllClasses;