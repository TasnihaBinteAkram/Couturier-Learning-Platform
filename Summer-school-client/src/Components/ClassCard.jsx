import React from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();


const ClassCard = ({course}) => {
    const {_id, courseName, image, instructorName, instructorEmail, availableSeats, enrolled, price , deatils} = course;
    return (
        <div data-aos="zoom-in" className='overflow-hidden w-96 mx-auto rounded-lg shadow-md relative'>
            <div>
                <img className='rounded-lg w-full h-full object-cover' src={image} alt="" />
            </div>
            <div className='absolute z-10 top-0 px-4 py-4 space-y-2 inset-0 rounded-lg flex flex-col justify-center items-center bg-ui-pink opacity-0 bg-opacity-50 transition-opacity duration-500 hover:opacity-100 max-h-full'>
                <p className='text-center text-2xl text-white font-semibold'>{courseName}</p>
                <Link to={`/course/${courseName}/${_id}`}><button className='btn-pink mt-auto'>Go to Course</button></Link>
            </div>
        </div>
    );
};

export default ClassCard;