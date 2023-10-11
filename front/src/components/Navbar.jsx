import React from 'react';
import Login from './Login';
import Subscribe from './Subscribe';
import LaunchResearch from './LaunchResearch';
import PlaceAd from './PlaceAd';
import Logo from './Logo'

const Navbar = () => {

    return (
        <>
        <nav className='flex items-center justify-between flex-wrap p-6'>
                <Logo/>
                <LaunchResearch/>
                <PlaceAd/>
                <Login/>
                <Subscribe/>
        </nav>
        </>
    );
};

export default Navbar;