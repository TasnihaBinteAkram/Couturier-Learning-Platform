import React from 'react';

const SectionTitle = ({title, sub}) => {
    return (
        <div className='mt-20 lg:mt-28 text-center space-y-2'>
            <h1 className='text-3xl lg:text-5xl font-lora font-bold text-ui-pink dark:text-white'>{title}</h1>
            <p className='text-slate-800 dark:text-rose-50 font-medium'>{sub}</p>
        </div>
    );
};

export default SectionTitle;