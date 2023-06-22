import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SectionTitle from '../Shared/SectionTitle';
import axios from 'axios';
import { useAuth } from '../Hooks/useAuth';
import { useAdmin } from '../Hooks/useAdmin';
import { useInstructor } from '../Hooks/useInstructor';
import { Toast } from '../utils/Toast';
import { useAxiosSecure } from '../Hooks/useAxiosSecure';
import HelmetTitle from '../Components/extras/HelmetTitle';

const CourseDetails = () => {
    const {name,id} = useParams();
    const {user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [axiosSecure]= useAxiosSecure();
    const {isAdmin} = useAdmin();
    const {isInstructor} = useInstructor();
    const [course, setCourse] = useState({});
    const [teacher, setTeacher] = useState({});
    

    useEffect(()=>{
        axios.get(`https://couturier-server.vercel.app/instructors/${course?.instructorEmail}`)
        .then(res => setTeacher(res.data))
    },[teacher])
    useEffect(()=>{
        axios.get(`https://couturier-server.vercel.app/classes/${id}`)
        .then(res => setCourse(res.data))
    },[])

    

    const handleEnroll =(id)=>{
        const enrolledCourse = {
            courseId: id,
            courseName: course?.courseName,
            instructorName: course?.instructorName,
            instructorEmail: course?.instructorEmail,
            price: course?.price,
            studentName: user?.displayName,
            studentMail: user?.email,
            availableSeats: course?.availableSeats,
            enrolled: course?.enrolled ? course.enrolled : 0,
            image: course?.image,
          };
        if (user) {
            axiosSecure.post("/enroll", enrolledCourse).then((res) => {
              if (res?.data?.insertedId) {
                Toast("Enrolled! Complete Payment from dashboard.")
              }
            });
          }
          else{
            Toast('Please Login to enroll!')
            navigate('/login', { state: { from: location } })
        }
    }


    return (
        <div className='mb-32'>
            <HelmetTitle>Couturier | {name}</HelmetTitle>
            <SectionTitle
            title={name}
            ></SectionTitle>
            <div className='flex justify-center items-center mt-12 w-full'>
                <div className='bg-rose-50 w-1/2 rounded-lg'>
                    <img  src={course?.image}  className='w-full h-[300px] object-cover rounded-t-lg' alt="image" />
                    <div className='px-8 py-6'>
                        <div className='space-y-3'>
                            <p className='text-3xl font-semibold text-slate-700'>{course?.courseName}</p>
                            <div className='flex items-center gap-2'>
                                <img src={teacher?.photo} className='w-14 h-14 rounded-full object-center object-cover' alt="" />
                                <p className='flex flex-col text-slate-700'>
                                    <span className=''>{teacher?.name}</span>
                                    <span className='text-xs'>{teacher?.email}</span>
                                </p>
                            </div>
                            <p className='text-slate-700'>
                                {course?.deatils?course.deatils:"The fashion designing course offers a comprehensive program covering fashion history, garment construction, fabric selection, and fashion illustration. Students develop their creative skills through practical projects and gain insights into fashion marketing and merchandising. Graduates emerge with a strong foundation in fashion design, ready to pursue careers as designers, stylists, or entrepreneurs. The course combines theory and hands-on learning, equipping students with the necessary skills to thrive in the fashion industry."}
                            </p>
                            <div className='text-right'>
                                <button onClick={()=>handleEnroll(course?._id)} className='btn-pink w-[140px]' disabled={isAdmin || isInstructor }>Enroll</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default CourseDetails;