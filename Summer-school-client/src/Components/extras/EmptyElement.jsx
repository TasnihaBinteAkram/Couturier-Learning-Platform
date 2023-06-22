import React from 'react';

const EmptyElement = ({children}) => {
    return (
        <div className='h-[300px] flex justify-center items-center'>
            <p className='text-3xl lg:text-5xl text-slate-400 font-bold'>{children}</p>
            
        </div>
    );
};

export default EmptyElement;