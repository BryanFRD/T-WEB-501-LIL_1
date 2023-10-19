import React from 'react';
import { Link } from 'react-router-dom';

const Subscribe = () => {
    return (
        <div className='text-center
        md:col-start-6 md:m-auto'>
        <Link to='register' className='bg-blue-900 text-white rounded p-1'>
            S'inscrire
        </Link>
        </div>
    );
};

export default Subscribe;