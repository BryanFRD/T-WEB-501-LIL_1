import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const AdCards = ({ad}) => {

    const {user} = useContext(UserContext)

    return (
        <div className='flex flex-col gap-3 shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline'>
           <h1><strong>{ad.title}</strong></h1>
           <div>
                <p className='truncate'>{ad.description}</p>
           </div>
           <div className='flex justify-center gap-3'>
                <button className='bg-black text-white rounded p-1'><strong>Plus</strong></button>
                {!user?.name && <button className='border-2 rounded p-1 border-solid border-black'>Candidater</button>}
           </div>
        </div>
    );
};

export default AdCards;