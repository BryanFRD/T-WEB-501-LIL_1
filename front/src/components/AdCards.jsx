import React from 'react';

const AdCards = ({ad}) => {
    return (
        <div className='flex flex-col gap-3 shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline'>
           <h1><strong>{ad.title}</strong></h1>
           <div>
                <p className='truncate'>{ad.description}</p>
           </div>
           <div className='flex justify-center'>
                <button className='bg-black text-white rounded p-1'><strong>Learn more</strong></button>
           </div>
        </div>
    );
};

export default AdCards;