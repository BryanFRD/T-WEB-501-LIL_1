import React from 'react';
import Login from './Login';
import Subscribe from './Subscribe';
import LaunchResearch from './LaunchResearch';
import PlaceAd from './PlaceAd';

const Navbar = () => {

    return (
        <>
        <nav className='grid grid-cols-2'>
                <LaunchResearch/>
                <PlaceAd/>
                <Login/>
                <Subscribe/>
        </nav>
        </>
    );
};

export default Navbar;