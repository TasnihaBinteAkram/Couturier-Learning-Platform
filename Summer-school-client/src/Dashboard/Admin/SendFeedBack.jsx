import React from 'react';
import bg from '../../assets/login/loginbg.png'
import { useNavigate, useParams } from 'react-router-dom';
import { useAxiosSecure } from '../../Hooks/useAxiosSecure';
import { useCourses } from '../../Hooks/useCourses';
import { Toast } from '../../utils/Toast';

const SendFeedBack = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [axiosSecure] = useAxiosSecure(); 
    const sendFeedBack = (event) => {
        event.preventDefault()
        console.log(event.target.feed.value);
        const update = {
            feedback: event.target.feed.value,
        }
        axiosSecure.post(`/feedback/${id}`, update)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount >0){
                Toast("Feedback Sent!")
                navigate('/dashboard/manageclasses')
            }
        })
    }
    return (
        <div style={{backgroundImage:`url(${bg})`}} className='h-screen flex justify-center items-center'>
            <form onSubmit={sendFeedBack}>
                <textarea placeholder='Write a feedback...' name="feed" cols="50" rows="4" className='p-4 resize-none rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2'></textarea>
                <div className='text-right'>
                    <input type='submit' value={"Send Feedback"} className='mt-2 px-2 py-1 bg-white text-ui-pink border-2 border-ui-pink rounded-md'/>
                </div>
            </form>
        </div>
    );
};

export default SendFeedBack;