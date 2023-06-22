import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useAxiosSecure } from '../../Hooks/useAxiosSecure';
import { useAuth } from '../../Hooks/useAuth';
import { toast } from 'react-hot-toast';
import { Toast } from '../../utils/Toast';

const CheckouForm = ({course}) => {
    const stripe = useStripe();
    const [axiosSecure] = useAxiosSecure();
    const {user} = useAuth();
    const elements = useElements();
    const [showError, setError] = useState("");
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState("");
    const [transactionId, setTransactionId] = useState("");
    

    const {_id, courseId, courseName, studentName, studentMail, instructorName, instructorEmail, availableSeats, price, image, enrolled} = course;

    useEffect(()=>{
        axiosSecure.post('/create-payment-intent', {price})
        .then(res => {
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret)
        })
    },[price, axiosSecure])
    

    const handleSubmit = async(event) => {
        event.preventDefault()
        if(!stripe || !elements){
            return
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
          if (error) {
            console.log('[error]', error);
            setError(error.message)
          } else {
            setError("")
          }

          setProcessing(true)
          const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details:{
                        name: user?.displayName || "anonymus",
                        email: user?.email || "anonymus"
                    }
                }
            }
          )
          setProcessing(false)
          if(paymentIntent.status == 'succeeded'){
            setSuccess("Payment Succesfull")
            setTransactionId(paymentIntent.id);
            const payment = {
                transactionId:paymentIntent.id, cartId: _id, courseId, courseName, instructorName,
                instructorEmail, studentName, studentMail, date: new Date(),
                price, quantity:1, availableSeats, enrolled, image
            }

            axiosSecure.post('/payments', payment)
            .then(res => {
                console.log(res.data);
                if(res.data.insertResult.insertedId){
                    Toast("Payment Successful!")
                }
            })
          }
          if(confirmError){
            setError(confirmError.message)
          }
          console.log(paymentIntent);
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className='btn-pink mt-4' type="submit" disabled={!stripe || !clientSecret || processing}>
          Pay
        </button>
      </form>
      {showError && <p className='text-xs mt-2 text-red-600'>{showError}</p>}
      {success && <p className='text-xs text-ui-pink'>{success}</p>}
        </>
    );
};

export default CheckouForm;