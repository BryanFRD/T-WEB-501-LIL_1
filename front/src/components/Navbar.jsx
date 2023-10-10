import React from 'react';
import Login from './Login';
import Subscribe from './Subscribe';
import LaunchResearch from './LaunchResearch';
import PlaceAd from './PlaceAd';

const Navbar = () => {

    return (
        <>
        <nav className='
        flex flex-col px-10 py-2 gap-3
        lg:flex lg:flex-row
        '>
            <LaunchResearch/>
            <PlaceAd/>
            <Login/>
            <Subscribe/>
        </nav>
        </>
    );
};

export default Navbar;