import React from 'react';
import SearchIcon from './SearchIcon';
import QuestionMarkIcon from './QuestionMarkIcon'; 
import MapIcon from './MapIcon'; 
import PlusIcon from'./PlusIcon'; 


const SearchBar = () => {
    return (
        <div className='flex flex-col items-center gap-3
        md:flex-row'>
            <div className='flex items-center gap-1'>
                <QuestionMarkIcon/>
                <input type='text' placeholder='Quel emploi recherchez vous ?'
                className="shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div className='flex items-center gap-1' >
                <MapIcon/>
                <input type='text' placeholder='Où recherchez-vous ?'
                className="shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div className='flex items-center gap-1 shadow appearance-none border rounded py-2 px-3'>
                <PlusIcon/>
                <p className='md:hidden'>Plus de critères</p>
            </div>
            <div className='flex items-center gap-1 shadow appearance-none border rounded w-auto py-2 px-3'>
                <SearchIcon/>
                <p className='md:hidden'>Lancer la recherche</p>
            </div>
        </div>
    );
};

export default SearchBar;