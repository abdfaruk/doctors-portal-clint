import { CircularProgress } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAuth from './../../../hooks/useAuth';

const CheckoutForm = ({appointment}) => {
    const {price, patientName, _id} = appointment;
    const stripe = useStripe();
    const elements = useElements()
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [process, setProcess] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

    const {user} = useAuth();


    useEffect( ()=>{
        fetch('https://aqueous-gorge-58617.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({price})
        })
        .then(res => res.json())
        .then(data => setClientSecret(data.clientSecret))
    } ,[price]);

    const handleSubmit = async (e) =>{
        
        e.preventDefault();

        if (!stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement);
        if(card === null) {
            return;
        }
        setProcess(true);
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
        if(error){
            setError(error.message);
            setSuccess('');
        }
        else{
            setError('');
            console.log(paymentMethod)
        }

        const {paymentIntent, error: intentError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: patientName,
                  email: user.email
                },
              },
            },
          );

          if(intentError){
            setError(intentError.message);
            setSuccess('');
          }
          else{
              setError('');
              setSuccess('Your payment processed successfully.')
              console.log(paymentIntent)
              setProcess(false);
            //   save to database;
            const payment = {
                amount: paymentIntent.amount,
                created: paymentIntent.created,
                last4: paymentMethod.card.last4,
                transaction: paymentIntent.client_secret.slice('_secret')[0]
            }
            const url = `https://aqueous-gorge-58617.herokuapp.com/appointment/${_id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(payment)
            })
            .then(res => res.json())
            .then(data => console.log(data))
          }

    }
    return (
        <div>
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
                {process ? <CircularProgress></CircularProgress> : <button type="submit" disabled={!stripe || success}>
                    Pay ${price}
                </button>}
            </form>
            {
                error && <h4 style={{color: 'red'}}>{error}</h4>
            }
            {
                success && <h4 style={{color: 'green'}}>{success}</h4>
            }
        </div>
    );
};

export default CheckoutForm;