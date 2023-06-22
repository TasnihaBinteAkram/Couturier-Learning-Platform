import React, { useEffect, useState } from 'react';
import SectionTitle from '../../Shared/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckouForm from './CheckouForm';
import { useParams } from 'react-router-dom';
import { useAxiosSecure } from '../../Hooks/useAxiosSecure';
import { useCart } from '../../Hooks/useCart';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const {id} =  useParams();
    const {cartCourses} = useCart();
    const payCourse = cartCourses?.find(course => course._id == id);
    console.log(payCourse);

    return (
        <div className='mb-12'>
            <SectionTitle
            title={"Please Provide your Card Details"}
            ></SectionTitle>
            <div className='w-1/3 mx-auto mt-16 border-2 border-ui-pink px-4 py-6 rounded-lg shadow-lg'>
                <Elements stripe={stripePromise}>
                    <CheckouForm course={payCourse}></CheckouForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;