import React from 'react';
import Login from './Login';
import Subscribe from './Subscribe';
import LaunchResearch from './LaunchResearch';
import PlaceAd from './PlaceAd';
import Logo from './Logo'

const Navbar = () => {

    return (
        <>
        <nav className='grid grid-flow-rows auto-rows-max gap-3
        md:grid md:grid-rows-1 md:grid-cols-6'>
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