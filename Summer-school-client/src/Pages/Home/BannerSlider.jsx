import React from 'react';
import { Fade } from "react-awesome-reveal";
const BannerSlider = ({img, title, texts}) => {
    return (
        <div 
        style={{backgroundImage: `url(${img})`,backgroundRepeat:'no-repeat'}} 
        className='lg:h-[700px] lg:flex justify-center items-center text-center bg-cover'>
                <div className=' text-white border-x-8 border-y-4 border-double lg:w-2/3 flex flex-col justify-center px-4 lg:px-8 py-12 lg:py-6 space-y-4 bg-ui-pink bg-opacity-30'>
                <Fade cascade damping={0.1}>
                    <h1 className=' text-3xl lg:text-7xl font-bold font-lora italic'>{title}</h1>
                    <p className='lg:w-2/3 mx-auto font-medium text-sm lg:text-lg'>{texts}</p>
                    <button className='btn-pink lg:w-1/5 mx-auto'>Explore More</button>
                </Fade>
                </div>
        </div>
    );
};

export default BannerSlider;