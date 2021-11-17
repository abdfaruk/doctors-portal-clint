import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51JwUgmIWpI2kJt0yA2fjtraf8tjDMX0anyndZYT7Ui5OCv0YNnoYqj2TlYN2QgWUaDG46A5HvGyT93Pqv02t7wUs000dYsW6q3')

const Pay = () => {
    const {appointmentId} = useParams()
    const [appointment, setAppointment] = useState({});

    useEffect( ()=>{
        fetch(`https://aqueous-gorge-58617.herokuapp.com/appointment/${appointmentId}`)
        .then(res => res.json())
        .then(data => setAppointment(data))
    },[appointmentId])
    return (
        <div>
            <h2>{appointment.patientName} Please pay for {appointment.serviceName}</h2>
            <h3>Your Appointment time</h3>
            <h3>Date: {appointment.date}</h3>
            <h3>Time: {appointment.time}</h3>
            <h3>{appointment.patientName} you must pay ${appointment.price} to get this {appointment.serviceName}</h3>
            <br />
            {appointment?.price && <Elements stripe={stripePromise}>
                <CheckoutForm
                    appointment={appointment}
                />
            </Elements>}
        </div>
    );
};

export default Pay;