import React from 'react';
import TopBar from '../Dashboard/TopBar.jsx/TopBar';
import NavBar from '../Shared/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer';
import HelmetTitle from '../Components/extras/HelmetTitle';

const DashBoard = () => {
    return (
        <div>
            <HelmetTitle>Couturier | Dashboard</HelmetTitle>
            <NavBar></NavBar>
            <TopBar></TopBar>
            <div className='max-w-screen-xl mx-auto mb-36'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashBoard;