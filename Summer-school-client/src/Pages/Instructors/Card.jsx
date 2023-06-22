import React from 'react';
import cardbg from '../../assets/banner/cardbg.jpg'
import { FaPaperPlane } from "react-icons/fa";
import { MdPeople, MdOutlineArticle } from "react-icons/md";

const Card = ({teacher}) => {
    const {name, email, photo} = teacher
    return (
        <div style={{backgroundImage:`url(${cardbg})`}}
        className='flex flex-col items-center space-y-2 w-80 lg:w-96 px-4 py-6 rounded-xl'
        >
            <img className='w-24 h-24 rounded-full object-cover' src={photo} alt="" />
            <p className='text-2xl font-semibold text-slate-700'>{name}</p>
            <p className='text-slate-700'><FaPaperPlane className='inline mr-1 text-sm'/> {email}</p>
            <div className='flex gap-4 text-slate-700'>
                <p><MdOutlineArticle className='inline mr-1 mb-1 text-lg'/> 5+ Courses</p>
                <p><MdPeople className='inline mr-1 mb-1 text-lg'/> 150+ Students</p>
            </div>
            <div>
                <button className='text-ui-pink bg-white bg-opacity-50 px-2 py-1 rounded-lg border border-ui-pink hover:bg-ui-pink hover:text-white'>View Courses</button>
            </div>
        </div>
    );
};

export default Card;