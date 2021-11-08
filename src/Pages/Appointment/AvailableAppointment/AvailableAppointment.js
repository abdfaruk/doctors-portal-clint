import { Alert, Container, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Booking from '../Booking/Booking';


const bookings = [
    {
        id: 1,
        name: "Teeth Orthodontics",
        time: "8.00AM-9.00AM",
        space: 6
    },
    {
        id: 2,
        name: "Cosmetic Dentistry",
        time: "10.5am-11.30am",
        space: 9
    },
    {
        id: 3,
        name: "Teeth Cleaning" ,
        time: "5.00pm-6.30pm",
        space: 10
    },
    {
        id: 4,
        name: "Cavity Protection" ,
        time: "7.00am-8.30am",
        space: 12
    },
    {
        id: 5,
        name:  "Teeth Orthodontics",
        time: "8.15am-9.30am",
        space: 10
    },
    {
        id: 1,
        name:  "Teeth Orthodontics",
        time: "9.00pm-10.30pm",
        space: 6
    }
]



const AvailableAppointment = ({date}) => {
    const [bookingSuccess, setBookingSuccess] = useState(false);
    return (
        <Container>
            <Typography variant="h4" sx={{color: 'info.main',mb:3,}}>Appointment Available on {date.toDateString()}</Typography>
            {bookingSuccess && <Alert severity="success">Appointment Booked successfully!</Alert>}
            <Grid container spacing={2}>
                {
                    bookings.map(booking=><Booking
                    key={booking.id}
                    booking={booking}
                    date={date}
                    setBookingSuccess={setBookingSuccess}
                    ></Booking>)
                }
            </Grid>
        </Container>
    );
};

export default AvailableAppointment;