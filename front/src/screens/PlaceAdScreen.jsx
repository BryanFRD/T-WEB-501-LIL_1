import React from 'react';
import { UserContext } from '../contexts/UserContext';
import PlaceAdForm from '../components/placeAd/PlaceAdForm';

const PlaceAdScreen = () => {
    return (
        <div className='flex justify-center pt-6'>
           <PlaceAdForm/> 
        </div>
    );
};

export default PlaceAdScreen;