import React from 'react';
import { BarLoader } from "react-spinners";
const Loader = () => {
    return (
        <div className='h-[300px] flex justify-center items-center'>
            <BarLoader color="#36d7b7" />
        </div>
    );
};

export default Loader;