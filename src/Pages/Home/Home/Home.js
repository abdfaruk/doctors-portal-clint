import React from 'react';
import Nav from '../../Shared/Nav/Nav';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import './Home.css';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <AppointmentBanner></AppointmentBanner>
        </div>
    );
};

export default Home;